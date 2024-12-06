/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api/api";
import { FaRupeeSign } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductList = ({setCart}) => {
  const [defaultProducts, setDefaultProducts] = useState([]); // original product list
  const [products, setProducts] = useState([]); // displayed products
  const [ratings, setRatings] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [clearCheckbox, setClearCheckbox] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");


  const { category: categoryByParams } = useParams();

  useEffect(() => {
    if (categoryByParams) {
      setSelectedCategory([categoryByParams]);
    }
  }, [categoryByParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await api.getAllProducts();
        setDefaultProducts(products?.data?.products); // save original data
        setProducts(products?.data?.products); // set displayed data
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await api.getFeaturedCategory();
        setCategories(categories?.data?.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCategories();
  }, [products]);

  const handleChangeCategories = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategory((prev) => [...prev, value]);
    } else {
      setSelectedCategory((categories) =>
        categories.filter((category) => category !== value)
      );
    }
  };

  const filteredProducts = products.filter((product) => {
    const rating = ratings > 0 ? product.rating <= ratings : true;

    const categoryFilter =
      selectedCategory.length > 0
        ? selectedCategory.includes(product.category)
        : true;

    return categoryFilter && rating;
  });

  useEffect(() => {
    if (clearCheckbox) {
      setSelectedCategory([]);
    }
  }, [clearCheckbox]);

  const sortPriceLowToHigh = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
    if (value === "high_to_low") {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setProducts(sorted);
    } else if (value === "low_to_high") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorted);
    }
  };


  const addToCart = (product) => {
    setCart((prevProduct) => ([product,...prevProduct]))
  }

  const clearFilter = () => {
    setRatings(0);
    setSelectedCategory([]);
    setClearCheckbox(true);
    setSelectedSort("");
    setProducts(defaultProducts);
  };



  return (
    <>
      <div className="container mx-auto my-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <button
              onClick={clearFilter}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Filters
            </button>

            {/* Category Filter */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Category</h4>
              {categories.map((category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={category.name}
                    id={`category-${category.name}`}
                    onChange={handleChangeCategories}
                    checked={selectedCategory.includes(category.name)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor={`category-${category.name}`}
                    className="text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Ratings Filter */}
            <div className="mt-6">
              <label
                htmlFor="ratings"
                className="block text-lg font-semibold mb-2"
              >
                Ratings:
              </label>
              <div className="flex items-center gap-4">
                <CiStar size={20} />
                <input
                  type="range"
                  id="ratings"
                  min={0}
                  max={5}
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                  className="w-full accent-blue-600"
                />
                <div className="flex items-center gap-1">
                  <FaStar size={20} className="text-yellow-500" />
                  <span>{ratings}</span>
                </div>
              </div>
            </div>

            {/* Sort by Price */}

            <div className="mt-6">
              <label
                htmlFor="sortByPrice"
                className="block text-lg font-semibold mb-2"
              >
                Sort By Price
              </label>
              <div>
                <input
                  onChange={sortPriceLowToHigh}
                  type="radio"
                  name="price"
                  value="low_to_high"
                  id="low_to_high"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedSort === "low_to_high"}
                />
                <label htmlFor="low_to_high" className="mx-2 text-gray-700">
                  Price: Low To High
                </label>
              </div>
              <div>
                <input
                  onChange={sortPriceLowToHigh}
                  type="radio"
                  name="price"
                  id="high_to_low"
                  value="high_to_low"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedSort === "high_to_low"}
                />
                <label htmlFor="high_to_low" className="mx-2 text-gray-700">
                  Price: High To Low
                </label>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-2xl font-semibold">Showing All Products</h5>
              <span className="text-gray-500">
                (Showing {filteredProducts.length} products)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
               <div key={product._id}>
                
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">

                <Link to={`/products/productId/${product._id}`}>
                <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h5>
                      <p className="text-gray-500 mb-2">
                        Rating: {product.rating}
                      </p>
                      <p className="text-lg font-bold flex items-center gap-1 text-blue-600">
                        <FaRupeeSign />
                        {product.price}
                      </p>
                      </div>
                </Link>

                   

                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={ () => addToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          Add to Cart
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
