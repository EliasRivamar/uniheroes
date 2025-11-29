'use client';

import { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  { question: "What is Supverse?", answer: "Supverse is a streaming platform that gathers all your favorite heroes in one place." },
  { question: "How much does cost?", answer: "None! Is totally free. Just sign up and enjoy." },
  { question: "How do I register?", answer: "You can register by clicking the Register button at the top of the page." },
  { question: "What can I watch on Supverse?", answer: "Supverse has an extensive library of superheroes films, TV shows, and more to come. Watch as much as you want, anytime you want." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center gap-4 font-ne antialiased">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white">Frequently Asked Questions</h2>
      <div className="flex flex-col w-full space-y-4 z-50">
        {faqData.map((item, index) => {
          const isOpen = (openIndex === index);
          return (
            <motion.div
              key={index}
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col w-full items-center"
            >
              {/* Botón con bounce */}
              <motion.button
              onClick={() => toggleOpen(index)}
              animate={{
                scaleY: isOpen ? [1, 0.85, 1.10, 1] : [1, 1.10, 0.90, 1],
            }}
              transition={{
                type: "tween",
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],      // easeOut con overshoot suave
                times: [0, 0.35, 0.7, 1],      // timing de cada keyframe
            }}
            className={`origin-top will-change-transform w-[50%] h-16 bg-[rgba(29,29,29,0.7)] text-2xl font-normal text-white hover:bg-[rgba(51,51,51,0.7)] ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}>
                {item.question}
            </motion.button>

              {/* Contenido con height animado */}
              <motion.div
                layout
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col w-[50%] items-center"
              >
                <div className="bg-[rgba(29,29,29,0.7)] px-4 py-2 self-center w-full rounded-b-xl">
                  <p className="text-xl md:text-2xl font-normal text-center text-white">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
