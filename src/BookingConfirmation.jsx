import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

export default function BookingConfirmation({ bookings }) {
  const { id } = useParams();
  const booking = bookings.find((b) => b.id === parseInt(id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 animate-fade-in"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Booking Confirmed
      </h2>
      {booking ? (
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {booking.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Service:</strong> {booking.service}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Barber:</strong> {booking.barber}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Date & Time:</strong>{" "}
              {new Date(booking.dateTime).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Duration:</strong> {booking.duration}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Price:</strong> ${booking.price}
            </p>
            <p
              className={`text-sm font-medium ${
                booking.status === "Confirmed"
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              <strong>Status:</strong> {booking.status}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Email Confirmation Preview
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Subject:</strong> Your Haircut Booking Confirmation
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Dear {booking.name},
                <br />
                Your appointment for a {booking.service} with {booking.barber}{" "}
                is confirmed for {new Date(booking.dateTime).toLocaleString()}.
                <br />
                Duration: {booking.duration}
                <br />
                Price: ${booking.price}
                <br />
                Status: {booking.status}
                <br />
                Thank you for choosing us!
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Notes: {booking.notes || "None"}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              to="/bookings"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition"
            >
              View All Bookings
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Booking not found.</p>
      )}
    </motion.div>
  );
}
