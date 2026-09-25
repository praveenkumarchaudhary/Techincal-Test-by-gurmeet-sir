import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateProfile from "./pages/CreateProfile";
import GetProfile from "./pages/GetProfile";
import EditProfile from "./pages/EditProfile";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="app-container">
                <Routes>
                    <Route path="/" element={<Navigate to="/profiles" replace />} />
                    <Route path="/profiles" element={<GetProfile />} />
                    <Route path="/create-profile" element={<CreateProfile />} />
                    <Route path="/edit-profile/:id" element={<EditProfile />} />
                    <Route path="*" element={<Navigate to="/profiles" replace />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;