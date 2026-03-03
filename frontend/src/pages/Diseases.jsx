const diseases = [
  {
    name: "Dry AMD",
    description:
      "A form of age-related macular degeneration caused by thinning of the macula.",
  },
  {
    name: "Wet AMD",
    description:
      "Advanced AMD caused by abnormal blood vessel growth under the retina.",
  },
  {
    name: "Mild Diabetic Retinopathy",
    description:
      "Early stage of diabetic eye disease with microaneurysms.",
  },
  {
    name: "Moderate Diabetic Retinopathy",
    description:
      "Progressive diabetic damage with blocked blood vessels.",
  },
  {
    name: "Severe Diabetic Retinopathy",
    description:
      "Extensive blockage of retinal blood vessels causing vision risk.",
  },
  {
    name: "Proliferative Diabetic Retinopathy",
    description:
      "Advanced stage with abnormal new blood vessel growth.",
  },
  {
    name: "Cataract",
    description:
      "Clouding of the eye lens causing blurred or dim vision.",
  },
  {
    name: "Hypertensive Retinopathy",
    description:
      "Retinal damage caused by high blood pressure.",
  },
  {
    name: "Pathological Myopia",
    description:
      "Severe nearsightedness causing structural retinal changes.",
  },
  {
    name: "Glaucoma",
    description:
      "Optic nerve damage often due to increased eye pressure.",
  },
  {
    name: "Normal Fundus",
    description:
      "Healthy retina without detectable pathological changes.",
  },
];

const Diseases = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-16 px-6">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-12">
        Retinal Diseases Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              {disease.name}
            </h2>
            <p className="text-slate-600 text-sm">
              {disease.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diseases;