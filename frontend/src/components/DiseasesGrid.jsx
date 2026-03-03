const diseases = [
  { name: "Dry AMD", type: "Macular" },
  { name: "Wet AMD", type: "Macular" },
  { name: "Mild DR", type: "Diabetic" },
  { name: "Moderate DR", type: "Diabetic" },
  { name: "Severe DR", type: "Diabetic" },
  { name: "Proliferative DR", type: "Diabetic" },
  { name: "Cataract", type: "Lens" },
  { name: "Hypertensive Retinopathy", type: "Vascular" },
  { name: "Pathological Myopia", type: "Refractive" },
  { name: "Glaucoma", type: "Optic Nerve" },
  { name: "Normal Fundus", type: "Healthy" },
];

const typeColors = {
  Macular: "bg-purple-100 text-purple-700",
  Diabetic: "bg-red-100 text-red-700",
  Lens: "bg-yellow-100 text-yellow-700",
  Vascular: "bg-blue-100 text-blue-700",
  Refractive: "bg-indigo-100 text-indigo-700",
  "Optic Nerve": "bg-green-100 text-green-700",
  Healthy: "bg-emerald-100 text-emerald-700",
};

const DiseasesGrid = () => {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {diseases.map((disease, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
              {disease.name}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${typeColors[disease.type]}`}
            >
              {disease.type}
            </span>
          </div>

          <div className="mt-6 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default DiseasesGrid;