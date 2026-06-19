"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/constants";

export default function ExperienceTimeline() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#2D2A32" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-xs tracking-[3px] uppercase mb-4 font-medium" style={{ color: "#D4B483" }}>
            Hành trình
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl italic font-medium" style={{ color: "#FAF8F6" }}>
            Câu chuyện của tôi
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(230,225,219,0.15)", transform: "translateX(-50%)" }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Mobile: left column layout */}
                <div className="lg:hidden pl-16">
                  <div
                    className="absolute left-5 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                    style={{ background: "#2D2A32", borderColor: "#B76E79" }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#B76E79" }} />
                  </div>
                  <div className="font-playfair text-2xl italic font-semibold mb-1" style={{ color: "#D4B483" }}>
                    {item.year}
                  </div>
                  <div className="font-medium mb-2" style={{ color: "#FAF8F6" }}>{item.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#8B8B8B" }}>{item.desc}</p>
                </div>

                {/* Desktop: alternating layout */}
                <div className={`hidden lg:block w-[45%] ${i % 2 === 0 ? "text-right pr-12" : "pl-12"}`}>
                  {i % 2 === 0 ? (
                    <>
                      <div className="font-playfair text-3xl italic font-semibold mb-2" style={{ color: "#D4B483" }}>
                        {item.year}
                      </div>
                      <div className="font-medium text-lg mb-2" style={{ color: "#FAF8F6" }}>{item.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "#8B8B8B" }}>{item.desc}</p>
                    </>
                  ) : null}
                </div>

                {/* Dot - desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-2 -translate-x-1/2 w-5 h-5 rounded-full border-2 items-center justify-center z-10"
                  style={{ background: "#2D2A32", borderColor: "#B76E79" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B76E79" }} />
                </div>

                <div className={`hidden lg:block w-[45%] ${i % 2 === 1 ? "text-left pl-12" : "pr-12"}`}>
                  {i % 2 === 1 ? (
                    <>
                      <div className="font-playfair text-3xl italic font-semibold mb-2" style={{ color: "#D4B483" }}>
                        {item.year}
                      </div>
                      <div className="font-medium text-lg mb-2" style={{ color: "#FAF8F6" }}>{item.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "#8B8B8B" }}>{item.desc}</p>
                    </>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
