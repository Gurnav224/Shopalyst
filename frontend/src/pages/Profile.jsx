import { useEffect, useState } from 'react';
import { User, ShoppingCart, Heart, Package } from 'lucide-react';
import api from '../services/clientAPI';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users');
       setUserData(response?.data?.user);
        setLoading(false);
      } catch (error) {
        console.error('Failed to get user', error);
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No user data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Profile Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <User className="h-8 w-8" />
          Profile Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg">{userData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Cart Summary</h2>
          </div>
          <p className="text-xl font-semibold">
            Total: {formatCurrency(userData.cart[0]?.totalAmount || 0)}
          </p>
        </div>

        {/* Latest Order */}
        {userData.order && userData.order.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Latest Order</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {userData.order[0].items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(userData.order[0].totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatCurrency(userData.order[0].shippingFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(userData.order[0].tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span>
                        {formatCurrency(
                          userData.order[0].totalAmount +
                          userData.order[0].shippingFee +
                          userData.order[0].tax -
                          userData.order[0].discount
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Status: {userData.order[0].orderStatus}
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Payment: {userData.order[0].paymentInfo.method.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist */}
        {userData.wishlist && userData.wishlist.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Wishlist</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userData.wishlist[0].items.map((item, index) => (
                <div key={index} className="text-center">
                  <img
                    src={item.thumbnail}
                    alt="Wishlist item"
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <p className="font-medium">{formatCurrency(item.price)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;