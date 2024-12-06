import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import '../produit/catalogue.css';
import 'animate.css/animate.min.css';
import Navbar from '../NavBar/navbar';
const Catalog = () => {
  const [products, setProducts] = useState([]); // State pour stocker les produits récupérés depuis Firestore
  const [sortOption, setSortOption] = useState(''); 
  // Fonction pour récupérer les produits depuis Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'product'); // Référence à la collection "products"
        const productSnapshot = await getDocs(productsCollection); // Récupérer les documents de la collection
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList); // Mettre à jour l'état avec les produits récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts(); // Appeler la fonction pour récupérer les produits à l'initialisation du composant
  }, []);

  // Fonction pour gérer le tri des produits
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = () => {
    switch (sortOption) {
      case 'lowToHigh':
        return [...products].sort((a, b) => a.price - b.price);
      case 'highToLow':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }; 

    // Ajouter un produit au panier
   const addToCart = async (product) => {
  try {
    const panierCollection = collection(db, "panier");

    // Check if the product already exists in Firestore
    const q = query(panierCollection, where("id", "==", product.id)); // Assuming 'id' uniquely identifies the product
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Product already exists in the panier collection
      alert("Produit déjà dans le panier !");
    } else {
      // Add the product if it doesn't exist
      await addDoc(panierCollection, product);
      console.log("Product added to Firestore!");
    }
  } catch (error) {
    console.error("Error adding product to Firestore:", error);
  }
};

  return (
    <div>
       <Navbar />
    <div className="wrapper rounded bg-white">
     

      {/* Section des produits */}
      <div className="row px-sm-2 px-0 pt-3">
        {sortedProducts().map((product) => (
          <div key={product.id} className="col-md-4 my-md-0 my-3">
            <div className="cardprod">
              <div className="card">
                <div className="d-flex justify-content-center">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    className="product"
                    alt={product.name || "Produit sans nom"}
                  />
                </div>
                <b className="px-2">
                  <p className="h4">{product.name || "Nom non disponible"}</p>
                </b>
                <div className="d-flex align-items-center justify-content-between py-2 px-3">
                  <div className="h4">
                    Price: {product.price} TND
                  </div>
                  <div>
                    <button
                      className="btn btn-dark text-uppercase"
                      onClick={() => {
                        console.log("Ajout du produit au panier:", product); // Log du produit ajouté
                        addToCart(product); // Appel de la fonction pour ajouter au panier
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Catalog;
