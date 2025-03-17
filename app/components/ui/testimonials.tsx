
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export const testimonials = [
  {
    name: "John Doe",
    role: "Restaurant Owner",
    text: "Foodiez has transformed the way we manage our restaurant! The online ordering and table booking features are game-changers.",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "Food Enthusiast",
    text: "Ordering food has never been this easy! I love the intuitive menu and quick checkout process.",
    rating: 5,
  },
  {
    name: "Michael T.",
    role: "Restaurant Manager",
    text: "Managing reservations, orders, and menus in one place has saved us so much time. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="text-center">
        <p className="text-sm font-bold text-yellow-500 uppercase">Features</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Why choose Foodiez?</h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Foodiez makes restaurant management seamless with a user-friendly experience.
          Whether you’re a restaurant owner or a customer, we offer a smooth and efficient dining experience.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
            <FaQuoteLeft className="absolute -top-4 left-4 text-yellow-500 text-2xl" />
            <p className="text-gray-300 italic">"{testimonial.text}"</p>
            <div className="mt-4 flex items-center gap-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="font-bold mt-2">{testimonial.name}</p>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
