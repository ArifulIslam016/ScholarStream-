import React from "react";
import { motion } from "framer-motion";

const Contactus = () => {
  return (
    <section className="w-11/12 mx-auto py-16 bg-secondary">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#1d695e]"
        >
          Contact Us
        </motion.h2>
        <p className="text-gray-600 mt-2">
          Have questions? We’re here to help.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="input w-full p-3 border rounded-lg outline-none"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="input w-full p-3 border rounded-lg outline-none"
        />

        <textarea
          placeholder="Message"
          rows="4"
          className="textarea w-full p-3 border rounded-lg outline-none"
        />

        <button className="btn w-full py-3 font-bold   bg-gradient-to-l from-[#16E2F5] to-[#1E90FF] rounded-lg">
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contactus;
