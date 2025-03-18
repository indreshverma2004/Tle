import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookmarkIcon, Code2Icon, Home, LogOut, Menu } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Optionally, you can still track scrolling if you wish to change other styles
  // but the background will remain black.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code2Icon className="h-8 w-8 text-yellow-400" />
            <span className="font-semibold text-xl tracking-tight text-white">
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
              className="flex items-center space-x-2 text-sm font-medium text-red-400 hover:text-red-500 transition-colors duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black p-4 shadow-md">
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
            className="flex items-center mt-2 text-red-400 hover:text-red-500 transition-colors duration-300"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, icon: Icon, label, isActive }: any) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-yellow-400 bg-yellow-900/50"
        : "text-white hover:bg-gray-700/50"
    }`}
  >
    {Icon && <Icon className="h-4 w-4 mr-1" />}
    <span>{label}</span>
  </Link>
);

export default Navbar;
