import { useState, useRef, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Header from './components/Header';

const products = [
  {
    id: 1,
    name: 'Cool T-Shirt',
    price: 25.99,
    description: 'A stylish cool t-shirt for daily wear.',
    image: './assets/Cooltshirt.png',
  },
  {
    id: 2,
    name: 'Trendy Sneakers',
    price: 89.99,
    description: 'Comfortable and trendy sneakers for all occasions.',
    image: './assets/Trendyshoes.png',
  },
];

const ProductCard = ({ product, onSelect }) => (
  <div className="border border-gray-300 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow ease-in-out duration-300">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-56 object-cover rounded-xl mb-4 transition-transform duration-300 transform hover:scale-105"
    />
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
    <p className="text-gray-600 mb-2">{product.description}</p>
    <p className="text-lg font-semibold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
    <button
      onClick={() => onSelect(product)}
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
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
    <div className="col-span-1 md:col-span-2 mt-6 bg-white p-8 rounded-xl shadow-lg" ref={ref}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Checkout: {product.name}</h2>
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'pill' }}
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
    <div>
      <Header/>
      <PayPalScriptProvider>
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
            ))}
          </div>
          {selectedProduct && (
            <CheckoutSection product={selectedProduct} onFinish={() => setSelectedProduct(null)} />
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default App;
