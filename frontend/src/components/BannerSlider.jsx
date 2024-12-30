import{ useState, useEffect } from 'react';

const BannerSlider = () => {
  const banners = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1316eb53d6f52c71.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/32e65fd179a19dbe.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/7b4c59850914645a.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/9bf64a81215e5986.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a4cec1601ff88602.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/35f9b0be5497398a.jpeg?q=20"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden ">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`Banner ${index + 1}`}
          className={`absolute inset-0  w-full h-96 rounded-3xl object-cover  transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;