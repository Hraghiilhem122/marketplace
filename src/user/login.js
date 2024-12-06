import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../firebase'; // Assurez-vous d'importer firestore ici
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import '../user/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Récupérer les données de l'utilisateur depuis Firestore
            const userDocRef = doc(firestore, "user", user.uid); // 'users' est la collection Firestore
            const userDoc = await getDoc(userDocRef);

            let userData = {
                uid: user.uid,
                email: user.email,
                name: "Anonymous" // Nom par défaut si le document n'existe pas
            };

            if (userDoc.exists()) {
                userData.name = userDoc.data().name || "Anonymous";
            }

            // Enregistrer dans localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(userData));

            // Naviguer vers la page d'accueil
            navigate("/home");
        } catch (err) {
            console.error("Login error:", err);
            setError("Les informations de connexion sont incorrectes. Veuillez vérifier votre email et mot de passe.");
        }
    };

    return (
        <div style={{ backgroundColor: '#a0c6f1' }}>
            <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="w-50 p-5 shadow-lg rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    <h3 className="text-center mb-4">Connexion</h3>

                    {/* Error Alert */}
                    {error && (
                        <MDBTypography tag="div" className="alert alert-danger" role="alert">
                            {error}
                        </MDBTypography>
                    )}

                    <form onSubmit={handleLogin}>
                        <MDBInput
                            label="Adresse Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mb-4"
                            id="email"
                        />
                        <MDBInput
                            label="Mot de Passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mb-4"
                            id="password"
                        />
                        <MDBBtn type="submit" color="primary" block>
                            Connexion
                        </MDBBtn>
                        <p className="text-center mt-3">
                            <span>Si vous n'avez pas de compte, </span>
                            <a href="/register" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#007bff' }}>
                                Inscrivez-vous maintenant
                            </a>
                        </p>
                    </form>
                </div>
            </MDBContainer>
        </div>
    );
}

export default Login;
