import { useState, useRef, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const products = [
  {
    id: 1,
    name: 'Cool T-Shirt',
    price: 25.99,
    description: 'A stylish cool t-shirt for daily wear.',
    image: 'https://via.placeholder.com/200x200.png?text=Cool+T-Shirt',
  },
  {
    id: 2,
    name: 'Trendy Sneakers',
    price: 89.99,
    description: 'Comfortable and trendy sneakers for all occasions.',
    image: 'https://via.placeholder.com/200x200.png?text=Trendy+Sneakers',
  },
];

const ProductCard = ({ product, onSelect }) => (
  <div className="border rounded-2xl shadow p-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover rounded-xl mb-4"
    />
    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
    <p className="mb-2">{product.description}</p>
    <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
    <button
      onClick={() => onSelect(product)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Buy Now
    </button>
  </div>
);

const CheckoutSection = ({ product, onFinish }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [product]);

  return (
    <div className="col-span-1 md:col-span-2 mt-6" ref={ref}>
      <h2 className="text-2xl font-bold mb-2">Checkout: {product.name}</h2>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: product.price.toString() },
              },
            ],
          });
        }}
        onApprove={(data, actions) =>
          actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            onFinish();
          })
        }
      />
    </div>
  );
};

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <PayPalScriptProvider>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
        ))}
        {selectedProduct && (
          <CheckoutSection product={selectedProduct} onFinish={() => setSelectedProduct(null)} />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default App;
