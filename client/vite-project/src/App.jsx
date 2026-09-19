import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); 
      if (!response.ok) throw new Error('Ошибка при загрузке');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Не удалось загрузить данные:', error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) 
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 2 }}>
        <h2>Список товаров</h2>
        <div className="products-list">
          {products.length === 0 ? (
            <p>Загрузка товаров или список пуст...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px', textAlign: 'left' }}>
                <h3>{product.name}</h3>
                <p><strong>Цена:</strong> {product.price} руб.</p>
                <p>{product.description}</p>
                <button 
                  onClick={() => addToCart(product)} 
                >
                  Добавить в корзину
                </button>
              </div>
            ))
          )}
        </div>
      </div>


      <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px', minWidth: '300px' }}>
        <h2>Корзина</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', textAlign: 'left' }}>
                <h4>{item.name}</h4>
                <p>{item.price} руб. х {item.quantity} = {item.price * item.quantity} руб.</p>
                
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <button onClick={() => changeQuantity(item.id, -1)} style={{ padding: '2px 8px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)} style={{ padding: '2px 8px' }}>+</button>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    style={{ marginLeft: 'auto', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            

            <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '2px solid #333', fontSize: '18px' }}>
              <strong>Итого: {totalPrice} руб.</strong>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;


