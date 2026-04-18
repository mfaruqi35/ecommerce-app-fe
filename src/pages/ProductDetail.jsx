import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!product) return <p>Produk tidak ditemukan.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', color: '#333' }}
      >
        &larr; Kembali
      </button>

      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }} 
          />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.title}</h2>
          <p style={{ color: '#666', textTransform: 'capitalize', marginBottom: '1rem' }}>{product.category}</p>
          <p style={{ fontWeight: 'bold', color: '#E67E22', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ lineHeight: '1.6', marginBottom: '2rem', color: '#333' }}>
            {product.description}
          </p>
          
          <button 
            onClick={() => {
              addItem(product);
              alert('Produk ditambahkan ke keranjang!');
            }} 
            style={{ 
              padding: '1rem 2rem', background: '#27AE60', 
              color: 'white', border: 'none', borderRadius: '4px', 
              cursor: 'pointer', fontSize: '1.1rem', width: '100%' 
            }}
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
