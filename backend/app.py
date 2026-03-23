from fastapi import FastAPI, UploadFile, File
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import torch.nn.functional as F
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import base64

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

app = FastAPI()

# ✅ Add CORS AFTER creating app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class_names = [
    'Dry AMD',
    'Glaucoma',
    'Normal Fundus',
    'Wet AMD',
    'Mild DR',
    'Moderate DR',
    'Severe DR',
    'Proliferate DR',
    'Cataract',
    'Hypertensive Retinopathy',
    'Pathological Myopia'
]

# Load Model
model = models.densenet121(weights=None)
in_features = model.classifier.in_features
model.classifier = nn.Linear(in_features, 11)
model.load_state_dict(torch.load("best_model_improved.pth", map_location=device))
model = model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Grad-CAM
target_layers = [model.features.denseblock4]

import torch.nn.functional as F

@app.get("/")
def root():
    return {"Backend is live !!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    # For model
    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = F.softmax(outputs, dim=1)

        top3_prob, top3_indices = torch.topk(probabilities, 3)

    results = []

    # ===== Grad-CAM =====

    # Resize image for heatmap
    image_resized = image.resize((224, 224))
    image_np = np.array(image_resized) / 255.0

    cam = GradCAM(model=model, target_layers=target_layers)

    grayscale_cam = cam(input_tensor=input_tensor)[0]

    visualization = show_cam_on_image(image_np, grayscale_cam, use_rgb=True)

    # Convert heatmap to base64
    _, buffer = cv2.imencode('.jpg', visualization)
    heatmap_base64 = base64.b64encode(buffer).decode('utf-8')




    for i in range(3):
        class_name = class_names[top3_indices[0][i].item()]
        confidence = round(top3_prob[0][i].item() * 100, 2)

        results.append({
            "prediction": class_name,
            "confidence": confidence
        })

    return {
        "top_3_predictions": results,
        "heatmap": heatmap_base64
    }