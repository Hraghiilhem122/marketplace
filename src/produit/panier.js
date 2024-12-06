import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Ensure the path to firebase.js is correct
import '../produit/panier.css';
import Navbar from '../NavBar/navbar';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  // Fetch cart items and filter out those without an ID
  const getCartItems = async () => {
    try {
      const panierCollection = collection(db, 'panier');
      const snapshot = await getDocs(panierCollection);
      const items = snapshot.docs
        .map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }))
        .filter((item) => item.id); // Ensure only items with an ID are included

      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

 // Remove an item from the cart
const onRemoveItem = async (documentId) => {
  try {
    // First, delete the item by ID
    await deleteDoc(doc(db, 'panier', documentId));
    console.log('Item deleted immediately.');

    // Set a delay of 2 seconds before deleting the same item again
    setTimeout(async () => {
      try {
        // Delete the item again after 2 seconds (same documentId)
        await deleteDoc(doc(db, 'panier', documentId));
        console.log('Item deleted again after 2 seconds.');

        // Optionally, update the cart items state to remove it from the UI
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== documentId)
        );
      } catch (error) {
        console.error('Error deleting item after 2 seconds:', error);
      }
    }, 2000); // Wait for 2 seconds before deleting again

  } catch (error) {
    console.error('Error removing item:', error);
  }
};


  // Handle card input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Validate form input
  const validateForm = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    const newErrors = {};

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format.';
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const total = calculateTotal();

    // Send email using EmailJS
    emailjs
      .send(
        'service_j92dogh', // Replace with your EmailJS service ID
        'template_0sqjbhv', // Replace with your EmailJS template ID
        {
          email: email,
          total_amount: `${total} TND`
        },
        'nZMk6of0vIjQSQvW4' // Replace with your EmailJS user ID
      )
      .then(
        () => {
          alert('Payment confirmation email sent successfully!');
        },
        (error) => {
          console.error('EmailJS error:', error);
          alert('Failed to send email. Please try again later.');
        }
      );
  };

  return (
    <div>
      <Navbar />
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link to="/catalogue" className="text-body">
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />
                      <p className="fw-normal mb-0 text-black">Shopping cart</p>

                      <ul>
                        {cartItems.map((item) => (
                          <li key={item.id} className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <img
                                    src={item.image || 'https://via.placeholder.com/150'}
                                    alt={item.name || 'Product'}
                                    className="cart-item-image"
                                  />
                                  <div className="ms-3">
                                    <h5 className="small mb-0">{item.name || 'Unnamed product'}</h5>
                                    <p>Quantity: {item.quantity || 1}</p>
                                  </div>
                                </div>
                                <div>
                                  <h5>{item.price || 0} TND</h5>
                                  <p>
                                    Total: {(item.price || 0) * (item.quantity || 1)} TND
                                  </p>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => onRemoveItem(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <h5 className="mb-0">Card details</h5>
                          <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="email">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              {errors.email && (
                                <small className="text-danger">{errors.email}</small>
                              )}
                            </div>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="cardNumber">
                                Card Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleInputChange}
                                required
                              />
                              {errors.cardNumber && (
                                <small className="text-danger">{errors.cardNumber}</small>
                              )}
                            </div>
                            <div className="d-flex gap-3">
                              <div className="form-outline form-white mb-4">
                                <label className="form-label" htmlFor="expiryDate">
                                  Expiry Date (MM/YY)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={cardDetails.expiryDate}
                                  onChange={handleInputChange}
                                  required
                                />
                                {errors.expiryDate && (
                                  <small className="text-danger">{errors.expiryDate}</small>
                                )}
                              </div>
                              <div className="form-outline form-white mb-4">
                                <label className="form-label" htmlFor="cvv">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cvv"
                                  name="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleInputChange}
                                  required
                                />
                                {errors.cvv && (
                                  <small className="text-danger">{errors.cvv}</small>
                                )}
                              </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-4">
                              <p>Total: </p>
                              <p>{calculateTotal()} TND</p>
                            </div>

                            <button type="submit" className="btn btn-dark text-uppercase">
                              Checkout
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Panier;
