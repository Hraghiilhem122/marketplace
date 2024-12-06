import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from React Router
import '../NavBar/navbar.css'; // Import the CSS file
import logo from '../NavBar/Logo-para.png';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Navbar() {
    const [userName, setUserName] = useState("Guest");
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [cartItems, setCartItems] = useState([]); 

    useEffect(() => {
        // Retrieve user data from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser.name) {
            setUserName(loggedInUser.name);
        } else {
            setUserName("Guest");
        }
    }, []);

  const getCartItems = async () => {
    try {
      const panierCollection = collection(db, "panier");
      const snapshot = await getDocs(panierCollection);
  
      // Map the documents to extract data
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Cart items fetched from Firestore:", items);
  
      // Update your local state with fetched items if needed
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
useEffect(()=>{
    getCartItems()
},[])
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login"); // Navigate to the login page without a full reload
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Brand Logo */}
                    <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                        <img
                            src={logo}
                            height="60"
                            alt="Logo"
                            loading="lazy"
                        />
                    </Link>

                    {/* Navbar links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogue">Catalogue</Link>
                        </li>
                    </ul>
                </div>

                {/* User Info and Logout Button */}
                <div className="d-flex align-items-center">
                <Link
          to="/panier"
          style={{
            position: "relative",
            color: "inherit",
            textDecoration: "none",
            marginRight: "1rem",
          }}
        >
          <i
            className="fas fa-shopping-cart"
            style={{
              fontSize: "1.5rem",
              position: "relative",
            }}
          ></i>
          {/* Cart item count badge */}
          {cartItems.length> 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "0.75rem",
                fontWeight: "bold",
                display: "inline-block", 
                paddingInline:5
              }}
            >
              {cartItems.length}
            </span>
          )}
        </Link>

                    <span className="me-3">Bonjour, {userName}</span>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger btn-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
