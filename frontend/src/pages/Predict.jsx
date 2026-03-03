import { useState } from "react";
import { predictImage } from "../services/api";

const Predict = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const data = await predictImage(image);
      setResults(data.top_3_predictions);
    } catch (error) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Upload Retinal Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}

        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Predict"}
        </button>

        {results && (
          <div className="mt-6 space-y-3">
            {results.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg flex justify-between"
              >
                <span className="font-medium">
                  {item.prediction}
                </span>
                <span className="text-blue-600 font-semibold">
                  {item.confidence}%
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Predict;