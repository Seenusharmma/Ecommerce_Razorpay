import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://media.istockphoto.com/id/1373017594/photo/headphones-on-the-orange-color-background.jpg?s=1024x1024&w=is&k=20&c=vmiKJbroxN1LHcHGjur7Ir02GXxowvLn0Vd9o8mXt_Y=",
    "https://images.unsplash.com/photo-1491472253230-a044054ca35f?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg mt-5">
      {/* Images */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className="w-full h-56 sm:h-72 md:h-[500px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-indigo-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
