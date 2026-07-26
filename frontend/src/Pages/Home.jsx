import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Home() {
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/all-data")
            .then((response) => {
                setShop(response.data);
            })
            .finally(() => {
            setLoading(false);
            });
    }, []);
    if (loading) {
    return (
        <>
            <div className="hero">
                <h1>LocalKart</h1>

                <p>
                    Save time. Check if the shop is open
                    <span> from home.</span>
                </p>
            </div>

            <div className="shop-container">

                {[1,2,3].map((item) => (
                    <div className="card" key={item}>
                        <div className="skeleton title"></div>
                        <div className="skeleton address"></div>
                        <div className="skeleton status"></div>
                    </div>
                ))}

            </div>
        </>
    );
}
    return (
        <>
    <div className="hero">
    <h1>LocalKart</h1>

    <p>
        Save time. Check if the shop is open
        <span> from home.</span>
    </p>
</div>


            <div className="shop-container">

                {shop.map((shop) => (
                    <div key={shop.id} className="card">

                        <h2>{shop.name}</h2>

                        <p>{shop.address}</p>

                        <p>
                            {shop.status === "OPEN" && "🟢 OPEN"}
                            {shop.status === "CLOSE" && "🔴 CLOSED"}
                            {shop.status === "NOT_UPDATED" && "🟡 Status Not Updated Today"}
                        </p>

                    </div>
                ))}

            </div>
        </>
    );
}

export default Home;