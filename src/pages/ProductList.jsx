// ProductList.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring, animated } from '@react-spring/web';
import productsData from '../assets/tools.json'; // Import your JSON file

gsap.registerPlugin(ScrollTrigger);

function ProductList() {
  const { category: urlCategory } = useParams(); // Get category from URL
  const [selectedCategory, setSelectedCategory] = useState(decodeURIComponent(urlCategory) || productsData.categories[0].category);
  const [visibleProducts, setVisibleProducts] = useState(6); // Initial number of products to show
  const productsPerPage = 6;

  useEffect(() => {
    gsap.from('.product-item', {
      y: 50,
      opacity: 1, // Fixed from 1 to 0 for fade-in effect
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.products-container',
        start: 'top 80%',
      },
    });
  }, [selectedCategory, visibleProducts]); // Re-run animation when category or visible products change

  const currentCategory = productsData.categories.find((cat) => cat.category === selectedCategory);
  const totalProducts = currentCategory ? currentCategory.products.length : 0;
  const displayedProducts = currentCategory ? currentCategory.products.slice(0, visibleProducts) : [];

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + productsPerPage, totalProducts));
  };

  return (
    <>
      <Helmet>
        <title>{`${selectedCategory} - MK Enterprise`}</title>
        <meta name="description" content={`Browse our ${selectedCategory} products at MK Enterprise.`} />
      </Helmet>

      {/* Category Selector */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Products</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {productsData.categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  setVisibleProducts(productsPerPage); // Reset pagination
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat.category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="products-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          {visibleProducts < totalProducts && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="btn-primary px-6 py-2 rounded-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ProductCard Component
function ProductCard({ product }) {
  const [springProps, api] = useSpring(() => ({
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 10 },
  }));

  return (
    <animated.div
      className="product-item bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => api.start({ scale: 1.05, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' })}
      onMouseLeave={() => api.start({ scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' })}
      style={springProps}
    >
      <div className="relative w-full aspect-video"> {/* 16:9 aspect ratio */}
        <img
          src={product.img || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-contain" // Changed to object-contain
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=No+Image')} // Fallback
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <Link
          to="/contact"
          className="btn-primary inline-block px-4 py-2 text-sm rounded-md"
        >
          Request Quote
        </Link>
      </div>
    </animated.div>
  );
}

export default ProductList;