import { useState } from "react";
import { predictImage } from "../services/api";
import Loader from "../components/Loader";

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
    setResults(null);
  };

  const handlePredict = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const data = await predictImage(image);
      setResults(data.top_3_predictions);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const getBarColor = (confidence) => {
    if (confidence >= 70) return "bg-red-500";
    if (confidence >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mx-auto mt-16 max-w-6xl px-6">
      {/* Page Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          AI Fundus Image Analysis
        </h2>
        <p className="mt-4 text-gray-600">
          Upload a retinal fundus image to detect possible diseases.
        </p>
      </div>

      {/* Layout */}
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        
        {/* Upload Section */}
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
          <label className="block cursor-pointer rounded-xl border-2 border-dashed border-blue-300 p-10 text-center transition hover:bg-blue-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-gray-600 font-medium">
              Click to upload fundus image
            </p>
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-6 rounded-xl shadow-md"
            />
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Predict"}
          </button>
        </div>

        {/* Results Section */}
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Prediction Results
          </h3>

          {loading && <Loader />}

          {!loading && !results && (
            <p className="mt-6 text-gray-500">
              Upload and analyze an image to see predictions.
            </p>
          )}

          {results && (
            <div className="mt-6 space-y-8">
              
              {/* Top Prediction Highlight */}
              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg">
                <h4 className="text-sm uppercase tracking-wide opacity-80">
                  Most Likely Condition
                </h4>
                <p className="mt-2 text-2xl font-bold">
                  {results[0].prediction}
                </p>
                <p className="mt-1 text-sm opacity-90">
                  Confidence: {results[0].confidence}%
                </p>
              </div>

              {/* All Predictions */}
              <div className="space-y-6">
                {results.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{item.prediction}</span>
                      <span>{item.confidence}%</span>
                    </div>

                    <div className="mt-2 h-3 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${getBarColor(
                          item.confidence
                        )}`}
                        style={{ width: `${item.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Interpretation Section */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
                <h4 className="font-semibold text-blue-700">
                  AI Interpretation
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Based on the uploaded fundus image, the AI model predicts{" "}
                  <strong>{results[0].prediction}</strong> with a confidence
                  score of {results[0].confidence}%. This is an automated
                  assessment and should be reviewed by a certified ophthalmologist
                  for professional diagnosis and confirmation.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Predict;