from fastapi import FastAPI, UploadFile, File
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import torch.nn.functional as F
from fastapi.middleware.cors import CORSMiddleware

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
model.load_state_dict(torch.load("best_model_80_83.pth", map_location=device))
model = model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

import torch.nn.functional as F

@app.get("/")
def root():
    return {"Fuck you!!! DJ 🖕🏻🖕🏻 Chal ab jaakr frontend me API integrete krde"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        probabilities = F.softmax(outputs, dim=1)

        top3_prob, top3_indices = torch.topk(probabilities, 3)

    results = []

    for i in range(3):
        class_name = class_names[top3_indices[0][i].item()]
        confidence = round(top3_prob[0][i].item() * 100, 2)

        results.append({
            "prediction": class_name,
            "confidence": confidence
        })

    return {
        "top_3_predictions": results
    }