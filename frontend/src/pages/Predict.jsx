import { useState } from "react";
import { motion } from "framer-motion";
import { predictImage } from "../services/api";
import Loader from "../components/Loader";

const MotionDiv = motion.div;

const Predict = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heatmap, setHeatmap] = useState(null);

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
      setHeatmap(data.heatmap);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const getBarColor = (confidence) => {
    if (confidence >= 70) return "bg-rose-400";
    if (confidence >= 40) return "bg-amber-400";
    return "bg-emerald-400";
  };

  return (
    <div className="mx-auto mt-24 max-w-6xl px-6 pb-16">
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold text-slate-100 md:text-5xl">
          AI Fundus Image Analysis
        </h2>
        <p className="mt-4 text-slate-300">
          Upload a retinal fundus image to detect possible diseases.
        </p>
      </MotionDiv>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-black/25"
        >
          <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-500 bg-slate-950/50 p-10 text-center transition hover:border-sky-400/60 hover:bg-slate-900">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="font-medium text-slate-300">
              Click to upload fundus image
            </p>
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-6 rounded-2xl border border-slate-700 shadow-lg shadow-black/25"
            />
          )}
          {heatmap && (
  <div className="mt-6">
    <p className="mb-2 text-sm text-slate-400">Model Focus (Grad-CAM)</p>
    <img
      src={`data:image/jpeg;base64,${heatmap}`}
      alt="GradCAM"
      className="rounded-2xl border border-slate-700 shadow-lg"
    />
  </div>
)}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-sky-400 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Predict"}
          </button>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-black/25"
        >
          <h3 className="text-xl font-semibold text-slate-100">
            Prediction Results
          </h3>

          {loading && <Loader />}

          {!loading && !results && (
            <p className="mt-6 text-slate-400">
              Upload and analyze an image to see predictions.
            </p>
          )}

          {results && (
            <div className="mt-6 space-y-8">
              <div className="rounded-2xl bg-gradient-to-r from-sky-500/90 to-indigo-500/90 p-6 text-white shadow-lg shadow-sky-500/20">
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

              <div className="space-y-6">
                {results.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium text-slate-300">
                      <span>{item.prediction}</span>
                      <span>{item.confidence}%</span>
                    </div>

                    <div className="mt-2 h-2.5 w-full rounded-full bg-slate-700">
                      <MotionDiv
                        initial={{ width: 0 }}
                        animate={{ width: `${item.confidence}%` }}
                        transition={{ duration: 0.9, delay: 0.12 * index }}
                        className={`h-2.5 rounded-full ${getBarColor(
                          item.confidence
                        )}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-6">
                <h4 className="font-semibold text-sky-300">
                  AI Interpretation
                </h4>
                <p className="mt-2 text-sm text-slate-300">
                  Based on the uploaded fundus image, the AI model predicts{" "}
                  <strong>{results[0].prediction}</strong> with a confidence
                  score of {results[0].confidence}%. This is an automated
                  assessment and should be reviewed by a certified ophthalmologist
                  for professional diagnosis and confirmation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-6">
              <h4 className="font-semibold text-sky-300">Heatmap Guide</h4>
<p className="mt-2 text-sm text-slate-300">The colored heatmap shows which parts of the retina the AI model focused on while making the prediction.<br/>
<br/>
<b>🔴 Red / Orange Areas</b> → These are the most important regions.
The model is strongly focusing on these areas, and they may contain signs of disease or abnormalities.<br/><br/>
<b>🟡 Yellow / Green Areas</b> → These regions have moderate importance.
The model considers them somewhat relevant for the prediction.<br/><br/>
<b>🔵 Blue Areas</b> → These are less important regions.
The model is mostly ignoring these areas as they are likely normal or not useful for diagnosis.</p>
              </div>
            </div>
          )}
        </MotionDiv>
      </div>
    </div>
  );
};

export default Predict;
