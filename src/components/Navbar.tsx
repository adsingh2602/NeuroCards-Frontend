import { Link, useLocation } from "react-router-dom";
import { Brain, LayoutDashboard, BookOpen, BarChart3 } from "lucide-react";
import { removeToken } from "@/lib/token";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/review", label: "Review", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: BarChart3 },
];

const Navbar = () => {
  const location = useLocation();
   const navigate = useNavigate();

    const handleLogout = () => {
      removeToken();
      navigate("/login", { replace: true });
    };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">NeuroCards</span>
        </Link>

        <nav className="flex items-center gap-2">

          {navItems.map(({ to, label, icon: Icon }) => {
            const active =
              location.pathname === to ||
              (to !== "/" && location.pathname.startsWith(to));

            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="ml-3 px-3 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;