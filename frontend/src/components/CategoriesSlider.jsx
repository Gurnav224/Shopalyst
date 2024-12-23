/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function CategoriesSlider({ categories }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap py-4">
      <div className="flex space-x-4 justify-center">
        {categories?.slice(4).map((category) => (
          <Link
            to={`/products/${category.name}`}
            key={category._id}
            className="flex-none w-48"
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img
                src={category.categoryImgUrl}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSlider;
