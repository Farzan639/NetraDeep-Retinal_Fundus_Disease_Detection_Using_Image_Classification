import { motion } from "framer-motion";

const MotionDiv = motion.div;

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <MotionDiv
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-full border-4 border-slate-700 border-t-sky-400"
      />
      <p className="mt-4 text-slate-300">
        Analyzing retinal image...
      </p>
    </div>
  );
};

export default Loader;
