import { Link, NavLink, useLocation } from "react-router-dom";
import { Flame, LayoutDashboard, PlusCircle, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext.jsx";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add", label: "Add Meal", icon: PlusCircle },
  { to: "/todos", label: "Todos", icon: PlusCircle },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-glow">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </span>
          <span>FitTrack</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
