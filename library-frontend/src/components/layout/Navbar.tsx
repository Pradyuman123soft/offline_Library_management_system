import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
      
      {/* App Title */}
      <h1 className="text-lg font-semibold text-gray-800">
        Library Management System
      </h1>

      {/* User Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>
        )}
      </div>

    </header>
  );
};

export default Navbar;