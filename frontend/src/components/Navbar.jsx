import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const baseLinkClass =
    "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/predict", label: "Predict" },
  ];

  const isDiseasesActive =
    location.pathname === "/" && location.hash === "#diseases";

  const handleHomeClick = (e) => {
    if (location.pathname !== "/" || location.hash !== "#diseases") return;
    e.preventDefault();
    navigate("/", { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-sky-300/20 bg-slate-950/70 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <h1 className="text-lg font-bold tracking-[0.2em] text-slate-100">
          NETRA <span className="text-sky-400">DEEP</span>
        </h1>

        <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 p-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={item.to === "/" ? handleHomeClick : undefined}
              className={({ isActive }) => {
                const shouldBeActive =
                  item.to === "/"
                    ? isActive && location.hash !== "#diseases"
                    : isActive;

                return `${baseLinkClass} ${
                  shouldBeActive
                    ? "bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/30"
                    : "text-slate-300 hover:bg-slate-800/90 hover:text-sky-300"
                }`;
              }}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/#diseases"
            className={`${baseLinkClass} ${
              isDiseasesActive
                ? "bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/30"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-sky-300"
            }`}
          >
            Diseases
          </Link>
        </div>
      </MotionDiv>
    </nav>
  );
};

export default Navbar;
