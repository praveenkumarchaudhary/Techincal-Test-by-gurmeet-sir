import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://techincal-test-by-gurmeet-sir-1.onrender.com/api/profiles/${id}`)
            .then((response) => {
                const data = response.data;
                setName(data.name || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
            })
            .catch((err) => {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch profile details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`https://techincal-test-by-gurmeet-sir-1.onrender.com/api/profiles/${id}`, { name, email, phone, address })
            .then(() => {
                alert("Profile updated successfully!");
                navigate("/profiles");
            })
            .catch((err) => {
                console.error("Error updating profile:", err);
                setError(err.response?.data?.message || "Failed to update profile.");
            });
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Edit Profile (ID: {id})</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleUpdate}>
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

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
