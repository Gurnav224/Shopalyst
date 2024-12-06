import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import {Navigation , Pagination} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      const product = await api.getProductById(productId);
      setProduct(product.data.product);
    };
    fetchProductById();
  }, [productId]);

  console.log(product);
  return (
    <>

      <div className="flex  container mx-auto mt-6 p-6 bg-gray-50 shadow-lg rounded-lg">
        {/* Product Images Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="w-80  h-80  mx-auto"
        >
          {product?.images?.map((link, index) => (
            <SwiperSlide key={index}>
              <img
                src={link}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover border border-gray-300 shadow-sm"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Product Details */}
        <div className="mt-8 p-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-medium text-gray-700">Brand:</span>{" "}
            {product.brand}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium text-gray-700">Description:</span>{" "}
            {product.description}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Rating:</span>{" "}
            <span className="text-yellow-500 font-semibold">
              {product.rating}
            </span>
          </p>
        </div>
      </div>

    </>
  );
};

export default ProductDetails;
