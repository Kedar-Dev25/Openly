
import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
    useLocation,
    Navigate
} from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

function getTodayDate() {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const date = {};

    parts.forEach((part) => {
        date[part.type] = part.value;
    });

    return `${date.year}-${date.month}-${date.day}`;
}

function Owner() {
    const [shop, setShop] = useState(null);
    const { id } = useParams();
    const location = useLocation();

const isAuthorized = location.state?.authorized === true;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API_URL}/shops/${id}`)
            .then((response) => {
                setShop(response.data);
            })
            .catch((error) => {
                console.error("Failed to load shop:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const updateStatus = async (newStatus) => {
        if (!shop || displayedStatus === newStatus) {
            return;
        }

        try {
            const response = await axios.put(
                `${API_URL}/data/update/${id}`,
                { status: newStatus }
            );

            setShop(response.data);

        } catch (error) {
            console.error("Failed to update shop status:", error);
            alert("Unable to update shop status. Please try again.");
        }
    };
    if (!isAuthorized) {
    return <Navigate to="/" replace />;
}
    if (loading) {
        return (
            
            <div className="owner-container">
<button
    className="owner-back-btn"
    onClick={() => navigate("/", { replace: true, state: null })}
>
    ←
</button>
                <div className="owner-header">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                </div>

                <div className="owner-card">
                    <div className="skeleton skeleton-shop-name"></div>
                    <div className="skeleton skeleton-address"></div>
                    <div className="skeleton skeleton-status"></div>
                    <div className="skeleton skeleton-button"></div>
                    <div className="skeleton skeleton-button"></div>
                </div>
            </div>
        );
    }

    if (!shop) {
        return (
            <div className="owner-container">
                Unable to load shop information.
            </div>
        );
    }

    // Compare the database date with today's Indian date.
    const isUpdatedToday = shop.lastUpdated === getTodayDate();

    // Show actual status only if the shop was updated today.
    const displayedStatus = isUpdatedToday
        ? shop.status
        : "NOT_UPDATED";

return (
    <div className="owner-container">

        <div className="owner-topbar">
            <button
                className="owner-back-btn"
                onClick={() => navigate("/")}
            >
                <span>←</span>
            </button>
        </div>

        <div className="owner-header">
            <h1>Openly Owner</h1>
            <p>Update your shop status</p>
        </div>

        <div className="owner-card">
            <h2>{shop.name}</h2>

            <p>{shop.address}</p>

            <h3>
                {displayedStatus === "OPEN" && "🟢 OPEN"}
                {displayedStatus === "CLOSE" && "🔴 CLOSED"}
                {displayedStatus === "NOT_UPDATED" &&
                    "🟡 Status Not Updated Today"}
            </h3>

            <button onClick={() => updateStatus("OPEN")}>
                Open Shop
            </button>

            <button onClick={() => updateStatus("CLOSE")}>
                Close Shop
            </button>
        </div>
    </div>
);
}

export default Owner;
