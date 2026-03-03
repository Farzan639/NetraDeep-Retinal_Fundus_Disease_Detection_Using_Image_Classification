import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseLinkClass =
    "relative px-4 py-2 text-sm font-medium transition-all duration-300";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/predict", label: "Predict" },
    { to: "/diseases", label: "Diseases" },
  ];

  return (
    <nav className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/30 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-md">
        
        {/* Logo */}
        <h1 className="text-lg font-bold tracking-wide text-blue-700">
          Netra<span className="text-gray-800">Deep</span>
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-2 rounded-full bg-white/60 p-1 shadow-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `${baseLinkClass} ${
                  isActive
                    ? "rounded-full bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:text-blue-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;