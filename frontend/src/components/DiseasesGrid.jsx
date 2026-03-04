import { motion } from "framer-motion";
import images from "../services/images";

const diseases = [
  {
    name: "Dry AMD",
    type: "Macular",
    summary: "Dry AMD occurs when the macula slowly thins with age and small yellow deposits called drusen form. It causes gradual loss of central vision. It progresses slowly compared to wet AMD.",
    image: images.DryAMD,
  },
  {
    name: "Wet AMD",
    type: "Macular",
    summary: "Wet AMD happens when abnormal blood vessels grow under the retina and leak fluid or blood. This damages the macula and causes rapid loss of central vision. It is more severe but can be treated if detected early.",
    image:images.WetAMD,
  },
  {
    name: "Mild DR",
    type: "Diabetic",
    summary: "This is an early stage of diabetic retinopathy where small blood vessels in the retina start to weaken. Tiny bulges or microaneurysms may appear. Vision may still be normal at this stage.",
    image: images.MildDR,
  },
  {
    name: "Moderate DR",
    type: "Diabetic",
    summary: "In this stage, retinal blood vessels become more damaged and may leak fluid or blood. This can cause swelling in the retina and mild vision problems. It requires monitoring and proper diabetes control.",
    image: images.ModerateDR,
  },
  {
    name: "Severe DR",
    type: "Diabetic",
    summary: "This stage shows extensive damage to retinal blood vessels with large areas of blocked circulation. The retina becomes deprived of oxygen. It often progresses to proliferative diabetic retinopathy if untreated.",
    image: images.severeDR,
  },
  {
    name: "Proliferative DR",
    type: "Diabetic",
    summary: "Late-stage diabetic retinopathy marked by fragile abnormal neovascular growth.",
    image: images.ProliferativeDR,

  },
  {
    name: "Cataract",
    type: "Lens",
    summary: "Cataract occurs when the eye’s natural lens becomes cloudy. This leads to blurry vision, glare, and difficulty seeing at night. It is common with aging and can be treated with surgery.",
    image: images.Cataract,
  },
  {
    name: "Hypertensive Retinopathy",
    type: "Vascular",
    summary: "This condition is caused by long-term high blood pressure damaging the retinal blood vessels. The vessels may become narrow, leak, or swell. It can lead to vision problems if not managed.",
    image: images.HypertensiveRetinopathy,
  },
  {
    name: "Pathological Myopia",
    type: "Refractive",
    summary: "This is an advanced stage of diabetic retinopathy. Abnormal new blood vessels grow on the retina, which are fragile and may bleed. This can cause severe vision loss or blindness.",
    image: images.PathologicalMyopia,
  },
  {
    name: "Glaucoma",
    type: "Optic Nerve",
    summary: "Glaucoma is an eye condition that damages the optic nerve, often due to high pressure inside the eye. It can lead to gradual vision loss, especially peripheral vision. If untreated, it may cause permanent blindness.",
    image: images.Glaucomma,
  },
  {
    name: "Normal Fundus",
    type: "Healthy",
    summary: "The retina appears healthy with no visible signs of disease or damage. Blood vessels, optic disc, and macula look normal. Vision is usually unaffected.",
    image: images.normal,
  },
];

const typeColors = {
  Macular: "bg-fuchsia-500/20 text-fuchsia-200",
  Diabetic: "bg-rose-500/20 text-rose-200",
  Lens: "bg-amber-500/20 text-amber-200",
  Vascular: "bg-sky-500/20 text-sky-200",
  Refractive: "bg-indigo-500/20 text-indigo-200",
  "Optic Nerve": "bg-emerald-500/20 text-emerald-200",
  Healthy: "bg-teal-500/20 text-teal-200",
};

const MotionDiv = motion.div;

const DiseasesGrid = () => {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {diseases.map((disease, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: index * 0.04 }}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-sky-400/40 hover:shadow-sky-500/10"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950/70">
            <img
              src={disease.image}
              alt={disease.name}
              className="h-full w-full object-contain transition bg-black duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" /> */}
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6">
            <h3 className="text-2xl font-semibold text-slate-100 transition group-hover:text-sky-300">
              {disease.name}
            </h3>

            <p className="line-clamp-3 text-sm leading-6 text-slate-300">
              {disease.summary}
            </p>

            <div className="mt-auto pt-2">
              <span
                className={`inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium ${typeColors[disease.type]}`}
              >
                {disease.type}
              </span>
            </div>
          </div>

          <div className="mx-6 mb-6 h-px bg-gradient-to-r from-sky-400/0 via-sky-400/80 to-sky-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />
        </MotionDiv>
      ))}
    </div>
  );
};

export default DiseasesGrid;
