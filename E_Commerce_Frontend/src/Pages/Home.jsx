import { useEffect, useState } from "react";

export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err));

    }, []);

    return (
        <div>
            <h1>Home</h1>

            {user ? (
                <div>
                    <h2>Welcome {user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
}