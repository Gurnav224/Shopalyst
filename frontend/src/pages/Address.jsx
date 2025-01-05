import { useCallback, useEffect, useState } from "react";
import { addressAPI } from "../api/address";
import { MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { orderAPI } from "../api/orders";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    city: "",
    state: "",
    label: "",
    country: "",
    zipCode: "",
    type: "",
    isDefault: false,
  });
  const [payment, setPayment] = useState("");

  const [allAddress, setAllAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createNewAddress = async (e) => {
    e.preventDefault();
    // setAddress(address);

    try {
      const response = await addressAPI.createAddress(address);
      setAllAddress(response.address);
      toast("new address created successfully");
      console.log("new address created successfully", response);
    } catch (error) {
      console.error("failed to submit new address");
      throw error;
    }

    setAddress({
      firstName: "",
      lastName: "",
      contactNumber: "",
      addressLine1: "",
      addressLine2: "",
      street: "",
      city: "",
      state: "",
      label: "",
      zipCode: "",
      country: "",
      type: "",
      isDefault: false,
    });
  };

  const fetchAddress = useCallback(async () => {
    try {
      const { address } = await addressAPI.getAllAddress();
      setAllAddress(address);
    } catch (error) {
      console.error("failed to get all address");
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress, allAddress.length]);

  const selectDeliveryAddress = (addressId) => {
    const selectedAddress = allAddress.find(
      (address) => address._id === addressId
    );
    setSelectedAddress(selectedAddress);
  };

  const createOrder = async (data) => {
    try {
      console.log(data);
      const order = await orderAPI.createOrder(data);
      console.log("order created successfully", order);
      navigate("/checkout");
    } catch (error) {
      console.error("failed to create to order");
      throw error;
    }
  };

  return (
    <div className="max-w-5xl mx-auto  p-6 bg-white rounded-lg shadow-md my-11">
      <div className="flex justify-between">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <ToastContainer />

          {allAddress.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Delivery Address
              </h2>
              <ul className="space-y-3">
                {allAddress.map((address) => (
                  <li
                    key={address._id}
                    className="flex items-start gap-4 p-4 rounded-md border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                  >
                    <div className="flex items-center h-5 mt-1">
                      <input
                        onChange={() => selectDeliveryAddress(address._id)}
                        type="radio"
                        name="address"
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <p className="font-medium text-gray-900">
                          {address.firstName} {address.lastName},{" "}
                          {address.street} {address.label} ,{address.city}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-left py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No addresses found. Please add a new address.
              </p>
            </div>
          )}

          {selectedAddress && (
            <div className="mt-6 rounded-md border border-gray-200 hover:border-blue-500 transition-colors duration-200 p-4">
              <p>Choose Payment Method</p>
              <div className="flex justify-start items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  onChange={(e) => setPayment(e.target.value)}
                  name="paymentMethod"
                  id="paymentMethod"
                  value="cod"
                />
                <label
                  className="text-lg font-medium text-gray-700"
                  htmlFor="paymentMethod"
                >
                  Cod
                </label>
              </div>
            </div>
          )}

          {payment && (
            <div className="mt-6 rounded-md border border-gray-200 hover:border-blue-500 transition-colors duration-200 p-4">
              <button
                onClick={() =>
                  createOrder({
                    addressId: selectedAddress._id,
                    paymentMethod: payment,
                  })
                }
                className="w-full block text-center  py-3 bg-blue-500 text-white  rounded-lg hover:bg-blue-600 transition-colors"
              >
                Place Order
              </button>
            </div>
          )}
        </div>

        <form onSubmit={createNewAddress} className="space-y-4" method="POST">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Address
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number:
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 1:
            </label>
            <textarea
              name="addressLine1"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.addressLine1}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 2:
            </label>
            <textarea
              name="addressLine2"
              id="addressLine2"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.addressLine2}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street:
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.street}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State:
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700"
              >
                ZipCode/PinCode:
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Address Label:
            </label>
            <input
              type="text"
              name="label"
              id="label"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.label}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country:
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address.country}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Address Type:
            </label>
            <select
              name="type"
              id="type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleInputChange}
            >
              <option value="">-- Select --</option>
              <option value="billing">Billing</option>
              <option value="shipping">Shipping</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isDefault"
              id="isDefault"
              onChange={handleInputChange}
              checked={address.isDefault}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Set as default address
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add New Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
