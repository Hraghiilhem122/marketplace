// src/Home.js
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import '../home/home.css' ;
import Navbar from '../NavBar/navbar';
function Home() {
    return (
        <div>
            <Navbar/>
            {/* Section Hero - Slider */}
            <Container fluid className="p-0">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                           src="https://pharmacie.anselme.be/upload/img/Parapharmacie.jpeg"
                            alt="First slide"
                            style={{ objectFit: 'cover', height: '500px' }}
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Bienvenue sur notre Marketplace</h3>
                            <p>Découvrez des produits de santé de qualité à des prix compétitifs.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.pixabay.com/photo/2015/12/06/18/28/capsules-1079838_960_720.jpg"
                            alt="Second slide"
                            style={{ objectFit: 'cover', height: '500px' }}
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Produits de Santé</h3>
                            <p>Nos produits sont soigneusement sélectionnés pour votre bien-être.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                           src="https://via.placeholder.com/1200x500/FF5722/FFFFFF?text=Produits+de+Santé"
                            alt="Third slide"
                            style={{ objectFit: 'cover', height: '500px' }}
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Achetez en ligne</h3>
                            <p>Profitez de la commodité des achats en ligne avec une livraison rapide.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Section Bienvenue */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Bienvenue sur notre Marketplace de Parapharmacie</h2>
                <p>
                    Découvrez une large gamme de produits de santé, allant des médicaments en vente libre aux produits
                    cosmétiques et bien plus encore. Nous nous engageons à vous fournir des produits de haute qualité,
                    soigneusement sélectionnés pour répondre à vos besoins.
                </p>
            </Container>

            {/* Section À propos */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Pourquoi choisir notre Marketplace ?</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src="https://www.shutterstock.com/shutterstock/photos/2019425741/display_1500/stock-photo-close-up-hand-asia-woman-chemist-help-pack-covid-free-first-aid-self-recover-care-on-desk-give-for-2019425741.jpg"
                                className="card-img-top"
                                alt="Qualité"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Qualité garantie</h5>
                                <p className="card-text">Nous offrons des produits de la plus haute qualité provenant de marques de confiance.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src="https://www.shutterstock.com/shutterstock/photos/2201973815/display_1500/stock-photo-close-up-hand-young-asia-woman-pick-up-covid-free-first-aid-self-recover-health-care-give-to-help-2201973815.jpg"
                                className="card-img-top"
                                alt="Livraison rapide"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Livraison rapide</h5>
                                <p className="card-text">Nous assurons une livraison rapide et fiable directement à votre porte.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src="https://www.shutterstock.com/shutterstock/photos/2348347545/display_1500/stock-photo-woman-pharmacist-and-team-in-inventory-inspection-or-checking-stock-or-medication-at-the-pharmacy-2348347545.jpg"
                                className="card-img-top"
                                alt="Support client"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Support client</h5>
                                <p className="card-text">Notre équipe de support est là pour vous aider à chaque étape de votre commande.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
