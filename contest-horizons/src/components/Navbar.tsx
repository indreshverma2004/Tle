import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookmarkIcon, Code2Icon, Home, LogOut, Menu } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/"); // Redirect to home
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code2Icon className="h-8 w-8 text-primary" />
            <span className="font-semibold text-xl tracking-tight">
              Contest Horizons
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              icon={Home}
              label="Home"
              isActive={location.pathname === "/"}
            />
            <NavLink
              to="/bookmarks"
              icon={BookmarkIcon}
              label="Bookmarks"
              isActive={location.pathname === "/bookmarks"}
            />
            <NavLink
              to="/contests"
              label="Contests"
              isActive={location.pathname === "/contests"}
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm font-medium text-red-500 hover:text-red-600 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-black p-4 shadow-md">
          <NavLink
            to="/"
            icon={Home}
            label="Home"
            isActive={location.pathname === "/"}
          />
          <NavLink
            to="/bookmarks"
            icon={BookmarkIcon}
            label="Bookmarks"
            isActive={location.pathname === "/bookmarks"}
          />
          <NavLink
            to="/contests"
            label="Contests"
            isActive={location.pathname === "/contests"}
          />
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 mt-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, icon: Icon, label, isActive }: any) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {Icon && <Icon className="h-4 w-4 mr-1" />}
    <span>{label}</span>
  </Link>
);

export default Navbar;
