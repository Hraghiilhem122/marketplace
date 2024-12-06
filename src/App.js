// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/login';
import Register from './user/register';
import Home from './home/home';
import Panier from './produit/panier';
import AddProduct from './produit/ajoutprod';

import Catalog from './produit/catalogue';
import Footer from './footer/footer';

function App() {
  return ( 
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/catalogue" element={<Catalog />} />
        {/* Ajouter Panier avec un chemin spécifique */}
        <Route path="/panier" element={<Panier />} />
      </Routes>
    </Router>
      <Footer />
      </>
  );
}

export default App;
