import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import BookingConfirmation from "./BookingConfirmation";

export default function App() {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const addBooking = (booking) => {
    setBookings([
      ...bookings,
      { ...booking, id: Date.now(), status: "Confirmed" },
    ]);
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router basename="/haircut-booking">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Haircut Booking
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  Book
                </NavLink>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  My Bookings
                </NavLink>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
              <button
                className="sm:hidden p-2 text-gray-700 dark:text-gray-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <FaBars size={24} />
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-white dark:bg-gray-900 px-4 py-2"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium rounded-md transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
                onClick={toggleMenu}
              >
                Book
              </NavLink>
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium rounded-md transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
                onClick={toggleMenu}
              >
                My Bookings
              </NavLink>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative bg-cover bg-center py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Book your haircut
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Choose your service, barber, and time with ease.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8"
      >
        <Routes>
          <Route path="/" element={<BookingForm addBooking={addBooking} />} />
          <Route
            path="/bookings"
            element={
              <BookingList bookings={bookings} cancelBooking={cancelBooking} />
            }
          />
          <Route
            path="/confirmation/:id"
            element={<BookingConfirmation bookings={bookings} />}
          />
        </Routes>
      </motion.div>
    </Router>
  );
}
