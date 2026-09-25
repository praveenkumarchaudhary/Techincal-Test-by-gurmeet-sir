import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !address) {
            setError("All fields are required.");
            return;
        }

        axios.post("https://techincal-test-by-gurmeet-sir-1.onrender.com/api/profiles", { name, email, phone, address })
            .then(() => {
                navigate("/profiles");
            })
            .catch((err) => {
                console.error("Error creating profile:", err);
                setError(err.response?.data?.message || "Failed to create profile.");
            });
    };

    return (
        <div>
            <h2>Create New Profile</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
};

export default CreateProfile;
