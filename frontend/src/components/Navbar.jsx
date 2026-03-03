import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const baseLinkClass =
    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/predict", label: "Predict" },
  ];

  return (
    <nav className="w-full px-4 pt-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white/95 px-4 py-3 shadow-sm sm:flex-row sm:px-6">
        <h1 className="text-base font-bold tracking-wide text-blue-700 sm:text-lg">
          Retinal AI
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  baseLinkClass,
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/#diseases"
            className={`${baseLinkClass} text-gray-700 hover:bg-blue-50 hover:text-blue-700`}
          >
            Diseases
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
