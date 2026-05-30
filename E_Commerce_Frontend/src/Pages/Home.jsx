import { useEffect, useState } from "react";

export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No token found");
                return;
            }

            const response = await fetch("http://localhost:8080/api/me", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            // 🔥 IMPORTANT FIX
            if (!response.ok) {
                console.log("API failed or token invalid");
                return;
            }

            const data = await response.json();
            setUser(data);
        };

        fetchUser();

    }, []);

    return (
        <div>
            <h1>Home Page</h1>

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