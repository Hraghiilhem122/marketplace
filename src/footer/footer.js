import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import '../footer/footer.css';

function Footer() {
  return (
    <MDBFooter className="text-center text-white bg-dark py-3">
      <div className="container">
        <p className="mb-0">© 2024 Votre Entreprise. Tous droits réservés.</p>
        <p className="mb-0">
          <a href="/" className="text-reset text-decoration-none">
            Mentions Légales
          </a>{" "}
          |{" "}
          <a href="/" className="text-reset text-decoration-none">
            Politique de Confidentialité
          </a>
        </p>
      </div>
    </MDBFooter>
  );
}

export default Footer;
