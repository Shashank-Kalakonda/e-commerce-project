import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const error = await response.text();
            alert(error);
            return;
        }

        const token = await response.text();

        localStorage.setItem("token", token);

        alert("Login Successful");

        navigate("/home"); // 🔥 IMPORTANT
    };

    return (
        <div>
            <h1>Login</h1>

            <input name="email" placeholder="Email" onChange={handleChange} />
            <br /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <br /><br />

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}