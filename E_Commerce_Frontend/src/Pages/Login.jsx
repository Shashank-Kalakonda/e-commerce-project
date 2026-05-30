import { useState } from "react";

export default function Login() {

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
            const error = await response.json();
            alert(error.message);
            return;
        }

        const token = await response.text();
        localStorage.setItem("token", token);

        alert("Login Successful");
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">Login</button>

            </form>
        </div>
    );
}