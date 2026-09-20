import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Home() {
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);

function isUpdatedToday(timestamp) {
    const updatedDate = new Date(timestamp);
    const today = new Date();

    return (
        updatedDate.getDate() === today.getDate() &&
        updatedDate.getMonth() === today.getMonth() &&
        updatedDate.getFullYear() === today.getFullYear()
    );
}
    function getTimeAgo(timestamp) {
    const updatedTime = new Date(timestamp);
    const now = new Date();

    const difference = Math.floor((now - updatedTime) / 1000);

    if (difference < 60) {
        return "just now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
        return "yesterday";
    }

    return `${days} days ago`;
}
useEffect(() => {
    fetch("/shops.json")
        .then((response) => response.json())
        .then((data) => {
            setShop(data);
        })
        .finally(() => {
            setLoading(false);
        });
}, []);
    if (loading) {
    return (
        <>
            <div className="hero">
                <h1>Openly</h1>

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
    <h1>Openly</h1>

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
    {isUpdatedToday(shop.updatedAt) ? (
        <>
            {shop.status === "OPEN" && "🟢 OPEN"}
            {shop.status === "CLOSE" && "🔴 CLOSED"}
        </>
    ) : (
        "🟡 Status Not Updated Today"
    )}
</p>
                        <p>
    Last checked {getTimeAgo(shop.updatedAt)}
</p>
                    </div>
                ))}

            </div>
        </>
    );
}

export default Home;