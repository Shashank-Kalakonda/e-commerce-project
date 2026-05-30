import { useEffect, useState } from "react";

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Products page loaded ✔");

        fetch("http://localhost:8080/api/products")
            .then(res => res.json())
            .then(data => {
                console.log("DATA FROM BACKEND:", data);
                setProducts(data);
            })
            .catch(err => console.log("ERROR:", err));

    }, []);

    return (
        <div>
            <h1>PRODUCTS PAGE</h1>

            <p>Check console for logs</p>

            {products.map(p => (
                <div key={p.id}>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                </div>
            ))}
        </div>
    );
}