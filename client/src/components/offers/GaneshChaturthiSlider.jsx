import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GaneshChaturthiSlider = () => {
  const offers = [
    {
      id: 1,
      img: "https://m.media-amazon.com/images/I/519WrH7yDxL._SX300_SY300_QL70_FMwebp_.jpg",
      title: "Eco-friendly Ganesh Idols",
      discount: "Up to 40% OFF",
    },
    {
      id: 2,
      img: "https://m.media-amazon.com/images/I/61ssMfJ8fDL._SX569_.jpg",
      title: "Pooja Decoration Items",
      discount: "Flat 30% OFF",
    },
    {
      id: 3,
      img: "https://m.media-amazon.com/images/I/71Jexr1HNUL._SX679_.jpg",
      title: "Traditional Sweets & Prasad",
      discount: "Buy 1 Get 1",
    },
    {
      id: 4,
      img: "https://m.media-amazon.com/images/I/81H1lBv4BkL._SX679_PIbundle-6,TopRight,0,0_AA679SH20_.jpg",
      title: "Festive Gift Hampers",
      discount: "Starting ₹499",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px", // better spacing
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-3 py-6 sm:px-4">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 sm:mb-6 text-center">
        🪔 Ganesh Chaturthi Special Offers 🪔
      </h2>

      {/* Slider */}
      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.id} className="px-2 sm:px-3">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
              <img
                src={offer.img}
                alt={offer.title}
                className="w-full h-40 sm:h-48 object-contain bg-gray-50"
              />
              <div className="p-3 sm:p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {offer.title}
                </h3>
                <p className="text-green-600 font-bold text-sm sm:text-lg">
                  {offer.discount}
                </p>
                <button className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GaneshChaturthiSlider;
