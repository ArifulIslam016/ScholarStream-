import { motion } from "motion/react";

const SuccessStories = () => {
  const stories = [
    {
      name: "Ariful Rahman",
      scholarship: "DAAD Scholarship",
      story:
        "Through ScholarStream, I found the perfect opportunity for my higher education. I am now pursuing my Master's in Germany—one of the biggest achievements of my life.",
      img: "https://i.ibb.co.com/83TMmkX/Whats-App-Image-2025-10-16-at-10-38-53-PM.jpg",
    },
    {
      name: "Nayeem Ahmed",
      scholarship: "Fulbright Scholarship",
      story:
        "I was unsure where to apply or how to start, but ScholarStream guided me to the right scholarships. Now I’m studying in the USA under the Fulbright program.",
      img: "https://i.ibb.co.com/23c0B59B/it-support.jpg",
    },
    {
      name: "Emon Mia",
      scholarship: "MEXT Scholarship",
      story:
        "ScholarStream helped me understand requirements, deadlines, and the entire process. I am now studying in Japan under the MEXT scholarship.",
      img: "https://i.ibb.co.com/21dhrjQ3/151462169.jpg",
    },
  ];

  return (
    <div className="w-11/12 mx-auto py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-[#1d695e]"
      >
        Success Stories
      </motion.h2>

      <p className="text-center text-gray-600 mt-2 mb-10">
        Real students achieving real goals with global scholarships.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, }}
            className="bg-[#eafaf9] shadow-md rounded-2xl p-6  hover:shadow-xl transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#16E2F5]"
            />

            <h3 className="text-xl font-semibold text-center mt-4 text-[#1d695e]">
              {item.name}
            </h3>

            <p className="text-sm text-center text-[#1E3A8A] font-medium mt-1">
              {item.scholarship}
            </p>

            <p className="mt-4 text-gray-600 text-center leading-relaxed">
              {item.story}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
