import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingList({ bookings, cancelBooking }) {
  const [filterDate, setFilterDate] = useState(null);

  const filteredBookings = filterDate
    ? bookings.filter(
        (booking) =>
          new Date(booking.dateTime).toDateString() ===
          filterDate.toDateString()
      )
    : bookings;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const rescheduleBooking = (id, newDateTime) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, dateTime: newDateTime } : booking
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto animate-fade-in"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        My Bookings
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Date
        </label>
        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          className="w-full max-w-xs px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 text-sm transition"
          placeholderText="Select a date"
          isClearable
        />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        role="list"
        aria-label="Booked appointments"
      >
        {filteredBookings.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
            No bookings found.
          </p>
        ) : (
          filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={item}
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 border-l-4 ${
                booking.status === "Confirmed"
                  ? "border-green-500"
                  : "border-yellow-500"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {booking.name}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Service: {booking.service}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Barber: {booking.barber}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Date: {new Date(booking.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Duration: {booking.duration}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Price: ${booking.price}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Notes: {booking.notes || "None"}
              </p>
              <p
                className={`text-sm font-medium mb-4 ${
                  booking.status === "Confirmed"
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                Status: {booking.status}
              </p>
              <div className="flex justify-end gap-2">
                <motion.button
                  onClick={() => cancelBooking(booking.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    const newDate = window.prompt(
                      "Select new date and time",
                      booking.dateTime
                    );
                    if (newDate) rescheduleBooking(booking.id, newDate);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md text-sm font-semibold transition"
                >
                  Reschedule
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
