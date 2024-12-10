/* eslint-disable react/prop-types */


const Wishlist = ({wishlist}) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Wishlist  Page</h1>
      <ul>
        {
        wishlist.map((product) => (
            <li
            key={product._id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md"
          >
            {/* Item Thumbnail */}
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />

            {/* Item Details */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">{product.name}</p>
              <p className="text-gray-600">
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-800 font-medium text-lg">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default Wishlist
