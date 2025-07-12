import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import jamieImage from "./assets/female1.jpg";
import alexImage from "./assets/male1.jpg";
import taylorImage from "./assets/male2.jpeg";

export default function BookingForm({ addBooking }) {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    barber: "",
    dateTime: null,
    notes: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const services = [
    { name: "Haircut", duration: "30 min", price: 25 },
    { name: "Beard Trim", duration: "15 min", price: 15 },
    { name: "Haircut + Beard Trim", duration: "45 min", price: 35 },
  ];
  const barbers = [
    { name: "Alex", bio: "Specialist in modern cuts", image: alexImage },
    { name: "Jamie", bio: "Expert in fades and beards", image: jamieImage },
    { name: "Taylor", bio: "Classic and creative styles", image: taylorImage },
  ];
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateTime: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.service ||
      !formData.barber ||
      !formData.dateTime
    ) {
      setError("All fields are required");
      return;
    }
    const selectedService = services.find((s) => s.name === formData.service);
    addBooking({
      ...formData,
      duration: selectedService.duration,
      price: selectedService.price,
      status: "Confirmed",
      notes: formData.notes,
    });
    setFormData({
      name: "",
      service: "",
      barber: "",
      dateTime: null,
      notes: "",
    });
    setError("");
    navigate(`/confirmation/${Date.now()}`);
  };

  // Determine step completion
  const steps = [
    { name: "Name", completed: !!formData.name.trim() },
    { name: "Service", completed: !!formData.service },
    { name: "Barber", completed: !!formData.barber },
    { name: "Date & Time", completed: !!formData.dateTime },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 animate-fade-in"
      aria-label="Book an appointment"
    >
      <div className="mb-8">
        <div className="relative flex justify-between max-w-md mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center relative z-10 tooltip"
              data-tooltip={`Enter your ${step.name.toLowerCase()}`}
              initial={{ scale: 1 }}
              animate={{ scale: step.completed ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step.completed
                    ? "bg-green-500 text-white dark:bg-green-600 ring-2 ring-green-300 dark:ring-green-800"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                aria-label={`Step ${index + 1}: ${step.name} ${
                  step.completed ? "completed" : "incomplete"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">
                {step.name}
              </span>
            </motion.div>
          ))}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
            <motion.div
              className="h-full bg-green-500 dark:bg-green-600"
              initial={{ width: "0%" }}
              animate={{
                width: `${
                  (steps.filter((s) => s.completed).length / steps.length) * 100
                }%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Book Your Appointment
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 text-sm transition"
            placeholder="Enter your name"
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service
          </label>
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <motion.label
                key={service.name}
                whileHover={{
                  scale: 1.03,
                  background: "linear-gradient(to right, #3b82f6, #4f46e5)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                  formData.service === service.name
                    ? "border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={service.name}
                  checked={formData.service === service.name}
                  onChange={handleChange}
                  className="mr-3 accent-blue-600"
                  aria-label={`Select ${service.name}`}
                />
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.duration} - ${service.price}
                  </p>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Barber
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {barbers.map((barber) => (
              <motion.label
                key={barber.name}
                whileHover={{
                  scale: 1.03,
                  background: "linear-gradient(to right, #3b82f6, #4f46e5)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                  formData.barber === barber.name
                    ? "border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="barber"
                  value={barber.name}
                  checked={formData.barber === barber.name}
                  onChange={handleChange}
                  className="mr-3 accent-blue-600"
                  aria-label={`Select ${barber.name}`}
                />
                <div className="flex items-center">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-medium">{barber.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {barber.bio}
                    </p>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="dateTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date & Time
          </label>
          <DatePicker
            selected={formData.dateTime}
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={60}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            filterTime={(time) => {
              const hours = time.getHours();
              return availableTimes.includes(
                `${hours.toString().padStart(2, "0")}:00`
              );
            }}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 text-sm transition"
            placeholderText="Select date and time"
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Special Requests
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 text-sm transition"
            placeholder="E.g., Short on sides, long on top"
            rows={4}
          />
        </div>
        <div className="flex justify-end">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition"
            disabled={!steps.every((step) => step.completed)}
          >
            Book Appointment
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}
