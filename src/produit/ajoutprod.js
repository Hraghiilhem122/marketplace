import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase configuration
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MDBContainer, MDBBtn, MDBInput, MDBTypography } from 'mdb-react-ui-kit';

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const fetchProducts = async () => {
    const productCollection = collection(db, "product");
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !price || !imageUrl) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!isValidUrl(imageUrl)) {
      alert("L'URL de l'image n'est pas valide.");
      return;
    }

    setUploading(true);

    try {
      const productRef = collection(db, "product");
      await addDoc(productRef, {
        name: productName,
        price: parseFloat(price),
        image: imageUrl,
      });

      alert("Produit ajouté avec succès !");
      setProductName("");
      setPrice("");
      setImageUrl("");
      fetchProducts(); // Refresh product list after adding
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      alert("Erreur lors de l'ajout du produit. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "product", id));
      alert("Produit supprimé avec succès !");
      fetchProducts(); // Refresh product list after deleting
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("Erreur lors de la suppression du produit. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    
    <MDBContainer className="my-5">
      <h2 className="text-center mb-4">Ajouter un produit</h2>
      <form onSubmit={handleAddProduct} className="shadow p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mb-3">
          <MDBInput
            label="Nom du produit"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <MDBInput
            label="Prix"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <MDBInput
            label="URL de l'image"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Entrez l'URL de l'image"
            required
          />
        </div>
        <MDBBtn type="submit" color="primary" block disabled={uploading}>
          {uploading ? "Ajout en cours..." : "Ajouter le produit"}
        </MDBBtn>
      </form>

      {/* Display list of products */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Liste des produits ajoutés</h3>
        {products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Prix: ${product.price.toFixed(2)}</p>
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Supprimer
                    </MDBBtn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <MDBTypography tag="p" className="text-center mt-4">
            Aucun produit ajouté pour le moment.
          </MDBTypography>
        )}
      </div>
    </MDBContainer>
  );
}

export default AddProduct;
