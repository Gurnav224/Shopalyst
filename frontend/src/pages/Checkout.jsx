import { Package, MapPin, CreditCard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/clientAPI";

const Checkout = () => {
  const [orders, setOrders] = useState({});
  const formatPrice = (price) => `$${price?.toFixed(2)}`;
  const navigate = useNavigate();

  const { fetchCart } = useCart();

  const fetchOrder = useCallback(async () => {
    try {
      const response = await api.get("/order");
      setOrders(response.data?.order);
    } catch (error) {
      console.error("failed to fetch order", error);
    }
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleOrderConfirmation = () => {
    toast.info(
      `
    Your Order is Confirmed , 
    Order Id: ${orders._id},
    total Amount: ${formatPrice(
      orders?.totalAmount + orders?.shippingFee + orders?.tax - orders?.discount
    )}
    `
    );

    setTimeout(() => {
      navigate("/products");
    }, 5000);
  };

  return (
    <div className="max-w-5xl  mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Checkout Details
      </h1>

      {!orders ? (
        <div className="max-w-5xl">
          <h2 className="text-lg font-semibold text-gray-900">No Orders yet</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h2>
              </div>
              <div className="space-y-4">
                {orders?.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-blue-600 font-medium mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-900">
                  {orders?.shippingAddress?.firstName}{" "}
                  {orders?.shippingAddress?.lastName}
                </p>
                <p>{orders?.shippingAddress?.addressLine1}</p>
                <p>{orders?.shippingAddress?.street}</p>
                <p>
                  {orders?.shippingAddress?.city},{" "}
                  {orders?.shippingAddress?.state}{" "}
                  {orders?.shippingAddress?.zipCode}
                </p>
                <p>{orders?.shippingAddress?.country}</p>
                <p className="mt-2">
                  <span className="text-gray-500">Contact: </span>
                  {orders?.shippingAddress?.contactNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(orders?.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(orders?.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(orders?.tax)}
                  </span>
                </div>
                {orders?.discount > 0 && (
                  <div className="flex justify-between py-2 text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -{formatPrice(orders?.discount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(
                        orders?.totalAmount +
                          orders?.shippingFee +
                          orders?.tax -
                          orders?.discount
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Payment Method
                    </span>
                    <span className="text-sm font-medium text-gray-900 uppercase">
                      {orders?.paymentInfo?.method}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">
                      Payment Status
                    </span>
                    <span className="text-sm font-medium text-yellow-600 uppercase">
                      {orders?.paymentInfo?.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Order Status</span>
                    <span className="text-sm font-medium text-yellow-600 uppercase">
                      {orders?.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
              {/* Confirm Order Button */}
              <button
                onClick={handleOrderConfirmation}
                className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
