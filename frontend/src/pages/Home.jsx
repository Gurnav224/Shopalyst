import { useEffect, useState } from "react";
import CategoriesSlider from "../components/CategoriesSlider";
import BannerSlider from "../components/BannerSlider";
import {categoryAPI } from '../api/category'

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await categoryAPI?.getFeaturedCategory();
        setCategories(categories?.data?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="my-4 mx-5">
        <BannerSlider />
      </div>

      <div className=" my-4">
        <h2 className="text-center my-8 text-5xl font-bold underline">Our Categories</h2>

        <div className="container mx-auto">
          <CategoriesSlider categories={categories} />
        </div>

        <h2 className="text-5xl text-center font-bold my-8 underline">
          New Trends
        </h2>

        <div className="flex flex-col md:flex-row gap-6 my-6 container mx-auto">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src="https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="h-full w-full object-cover"
                    alt="Summer Collection"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <p className="text-sm text-gray-500">New Arrivals</p>
                  <h5 className="text-3xl font-semibold">Summer Collection</h5>
                  <p className="text-sm text-gray-400 mt-2">
                    Check out our best collection to stay warm in style this
                    season.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src="https://images.pexels.com/photos/17824872/pexels-photo-17824872/free-photo-of-young-model-in-white-crop-top-and-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="h-full w-full object-cover"
                    alt="Winter Collection"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <p className="text-sm text-gray-500">New Fashion Daily</p>
                  <h5 className="text-3xl my-2 font-semibold">Winter Collection</h5>
                  <p className="text-sm text-gray-400 mt-2">
                    Check out our best collection with new daily styles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
