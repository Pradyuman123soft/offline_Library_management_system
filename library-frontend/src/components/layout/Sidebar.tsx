import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth(); // 🔥 get logged in user
  const [openTransactions, setOpenTransactions] = useState(false);

  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-100 transition";

  const activeClass = "bg-blue-100 font-semibold";

  useEffect(() => {
    if (location.pathname.startsWith("/transactions")) {
      setOpenTransactions(true);
    }
  }, [location.pathname]);

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Library System</h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/members"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Members
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Books
        </NavLink>

        {/* Transactions Dropdown */}
        <div>
          <button
            onClick={() => setOpenTransactions(!openTransactions)}
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-100 transition font-medium"
          >
            Transactions
          </button>

          {openTransactions && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/transactions"
                end
                className={({ isActive }) =>
                  `${linkClass} text-sm ${isActive ? activeClass : ""}`
                }
              >
                All Transactions
              </NavLink>

              <NavLink
                to="/transactions/issue"
                className={({ isActive }) =>
                  `${linkClass} text-sm ${isActive ? activeClass : ""}`
                }
              >
                Issue Book
              </NavLink>

              <NavLink
                to="/transactions/return"
                className={({ isActive }) =>
                  `${linkClass} text-sm ${isActive ? activeClass : ""}`
                }
              >
                Return Book
              </NavLink>

              <NavLink
                to="/transactions/renew"
                className={({ isActive }) =>
                  `${linkClass} text-sm ${isActive ? activeClass : ""}`
                }
              >
                Renew Book
              </NavLink>

              <NavLink
                to="/transactions/reservations"
                className={({ isActive }) =>
                  `${linkClass} text-sm ${isActive ? activeClass : ""}`
                }
              >
                Reservations
              </NavLink>
            </div>
          )}
        </div>

        {/* ✅ REPORTS — Visible to All Users */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Reports & Export
        </NavLink>

        {/* 🔥 ADMIN ONLY SECTION */}
        {user?.role === "admin" && (
          <NavLink
            to="/staff-management"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Staff Management
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;