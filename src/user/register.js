import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('client');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [healthInfo, setHealthInfo] = useState('');
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsError(false);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(firestore, "user", user.uid), {
                name: name,
                email: email,
                userType: userType,
                address: address,
                city: city,
                postalCode: postalCode,
                phone: phone,
                healthInfo: healthInfo,
                createdAt: new Date()
            });

            setMessage("Utilisateur enregistré avec succès !");
            setIsError(false);

            // Clear form fields
            setName('');
            setEmail('');
            setPassword('');
            setUserType('client');
            setAddress('');
            setCity('');
            setPostalCode('');
            setPhone('');
            setHealthInfo('');
        } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
            setMessage("Erreur lors de l'enregistrement. Veuillez réessayer.");
            setIsError(true);
        }
    };

    return (
        <section  style={{ backgroundColor: '#508bfc' }}>
            <MDBContainer className="py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem', padding: '2rem' }}>
                            <div className="card-body">
                                <h3 className="text-center mb-4">Register</h3>

                                {/* Display alert message for success or error */}
                                {message && (
                                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                                        {message}
                                    </div>
                                )}

                                {/* Registration Form */}
                                <form onSubmit={handleRegister}>
                                    <MDBInput
                                        label="Name"
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="Email address"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="Password"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <div className="form-outline mb-4">
                                        <label htmlFor="userType" className="form-label">User Type</label>
                                        <select
                                            id="userType"
                                            className="form-select"
                                            value={userType}
                                            onChange={(e) => setUserType(e.target.value)}
                                        >
                                            <option value="client">Client</option>
                                            <option value="vendeur">Vendeur</option>
                                        </select>
                                    </div>

                                    <MDBInput
                                        label="Address"
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="City"
                                        id="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="Postal Code"
                                        id="postalCode"
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="Phone Number"
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mb-4"
                                        required
                                    />

                                    <MDBInput
                                        label="Health Information (optional)"
                                        id="healthInfo"
                                        type="textarea"
                                        rows="3"
                                        value={healthInfo}
                                        onChange={(e) => setHealthInfo(e.target.value)}
                                        className="mb-4"
                                    />

                                    <MDBBtn color="primary" size="lg" type="submit" block>
                                        Register
                                    </MDBBtn>
                                    <hr className="my-4" />
                                </form>

                                {/* Login Link */}
                                <p className="text-center mt-3">
                                    <span>Si vous avez déjà un compte, </span>
                                    <a href="/login" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#007bff' }}>
                                        Se connecter
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBContainer>
        </section>
    );
}

export default Register;
