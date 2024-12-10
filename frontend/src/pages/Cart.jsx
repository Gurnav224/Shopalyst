import PropTypes from 'prop-types';

const Cart = ({ cart }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cart Page</h1>

      {/* Cart Items */}
      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md"
          >
            {/* Item Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />

            {/* Item Details */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600">
                <span className="font-medium">Brand:</span> {item.brand}
              </p>
              <p className="text-gray-800 font-medium text-lg">
                ${item.price.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cart;
