import { useState } from "react";

export default function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const msg = await response.text();
        alert(msg);
    };

    return (
        <div>
            <h1>Register</h1>

            <input name="name" placeholder="Name" onChange={handleChange} />
            <br /><br />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <br /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <br /><br />

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}