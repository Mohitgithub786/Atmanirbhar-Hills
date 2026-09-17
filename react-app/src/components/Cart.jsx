import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      pname: "Himachali Woolen Cap/Topi",
      price: 399,
      quantity: 1,
      icon: "🧢",
    },
    {
      id: 2,
      pname: "Diya (Pack of 10)",
      price: 199,
      quantity: 2,
      icon: "🪔",
    },
    {
      id: 3,
      pname: "Riddhi Siddhi Kalash",
      price: 699,
      quantity: 1,
      icon: "🏺",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemove = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const subtotal = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePaymentSuccess = (method) => {
    alert(`🎉 Payment of ₹${subtotal} via ${method} Successful! Order Placed.`);
    setCart([]);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="cart-page-wrapper">
        <div className="cart-main-container">
          <h2 className="cart-header-title">
            Shopping <span>Cart</span> ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <div className="cart-empty-box">
              <div className="empty-icon">🛍️</div>
              <h3>Your cart is empty!</h3>
              <p style={{ color: "#64748b", margin: "10px 0 20px" }}>
                Looks like you haven't added any hill crafts or organic items yet.
              </p>
              <Link to="/" className="checkout-pay-btn" style={{ display: "inline-block", width: "auto", padding: "12px 30px" }}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout-grid">
              {/* Left Column: Cart Items List */}
              <div className="cart-items-section">
                {cart.map((product) => (
                  <div key={product.id} className="cart-item-card">
                    <div className="cart-item-left">
                      <div className="cart-item-image-wrapper">
                        <span className="cart-item-placeholder">{product.icon || "📦"}</span>
                      </div>
                      <div className="cart-item-info">
                        <h3>{product.pname}</h3>
                        <p className="cart-item-price">₹{product.price}</p>
                        
                        {/* Quantity Increment / Decrement */}
                        <div className="cart-qty-controls">
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantity(product.id, -1)}
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="qty-val">{product.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantity(product.id, 1)}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => handleRemove(product.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="cart-summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row free">
                  <span>Delivery Charge</span>
                  <span>FREE 🎉</span>
                </div>
                <div className="summary-row free">
                  <span>Artisan Vocal Subsidy</span>
                  <span>- ₹0</span>
                </div>

                <div className="summary-total">
                  <span>Total Amount</span>
                  <span>₹{subtotal}</span>
                </div>

                <button className="checkout-pay-btn" onClick={toggleModal}>
                  Proceed to Payment (₹{subtotal})
                </button>

                <Link to="/" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Selection Modal */}
      {showModal && (
        <div className="payment-modal-backdrop" onClick={toggleModal}>
          <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Select Payment Method</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "20px" }}>
              Total Payable: <strong>₹{subtotal}</strong>
            </p>

            <button
              className="payment-option-btn upi"
              onClick={() => handlePaymentSuccess("UPI / GPay / PhonePe")}
            >
              ⚡ Pay via UPI (Instant)
            </button>
            <button
              className="payment-option-btn"
              onClick={() => handlePaymentSuccess("Credit / Debit Card")}
            >
              💳 Credit / Debit Card
            </button>
            <button
              className="payment-option-btn"
              onClick={() => handlePaymentSuccess("Cash on Delivery")}
            >
              💵 Cash on Delivery (COD)
            </button>

            <button className="modal-close-btn" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Cart;
