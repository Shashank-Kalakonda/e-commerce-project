import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div style={{ display: "flex", gap: "15px", padding: "10px", background: "#eee" }}>
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}