import { useEffect, useState } from "react";
import "../App.css";

function Home() {
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageIndexes, setImageIndexes] = useState({});
    const [imageViewer, setImageViewer] = useState(null);
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
    function changeImage(shopId, direction, totalImages) {
    setImageIndexes((previous) => {
        const currentIndex = previous[shopId] || 0;

        let nextIndex;

        if (direction === "next") {
            nextIndex =
                currentIndex === totalImages - 1
                    ? 0
                    : currentIndex + 1;
        } else {
            nextIndex =
                currentIndex === 0
                    ? totalImages - 1
                    : currentIndex - 1;
        }

        return {
            ...previous,
            [shopId]: nextIndex,
        };
    });
}
function openImageViewer(shopId) {
    setImageViewer({
        shopId,
        index: imageIndexes[shopId] || 0,
    });
}

function closeImageViewer() {
    setImageViewer(null);
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
                    {[1, 2, 3].map((item) => (
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

                        <div className="shop-info">
                            <div>
                                <h2>{shop.name}</h2>

                                <p>{shop.address}</p>

                                <p
                                    className={
                                        isUpdatedToday(shop.updatedAt)
                                            ? shop.status === "O"
                                                ? "shop-status open"
                                                : "shop-status closed"
                                            : "shop-status not-updated"
                                    }
                                >
                                    {isUpdatedToday(shop.updatedAt) ? (
                                        <>
                                            {shop.status === "O" && "🟢 OPEN NOW"}
                                            {shop.status === "X" && "🔴 CLOSED"}
                                        </>
                                    ) : (
                                        "🟡 Status Not Updated Today"
                                    )}
                                </p>

                                <p>
                                    Last checked {getTimeAgo(shop.updatedAt)}
                                </p>
                            </div>

                       {shop.images?.length > 0 && (
    <div className="shop-image-section">

        <div className="shop-image-wrapper">
            <button
                className="shop-image-button"
                onClick={() => openImageViewer(shop.id)}
                aria-label={`View photos of ${shop.name}`}
            >
                <img
                    src={shop.images[imageIndexes[shop.id] || 0]}
                    alt={shop.name}
                    className="shop-image"
                />
            </button>
        </div>

<button
    className="see-shop-button"
    onClick={() => openImageViewer(shop.id)}
>
    View shop photos
    <span>→</span>
</button>

    </div>
)}
                        </div>

                    </div>
                ))}
            </div>
            {imageViewer && (
    <div className="image-viewer">

        <button
            className="viewer-close"
            onClick={closeImageViewer}
            aria-label="Close image viewer"
        >
            ×
        </button>

        <img
            src={
                shop.find((item) => item.id === imageViewer.shopId)
                    ?.images[imageViewer.index]
            }
            alt={
                shop.find((item) => item.id === imageViewer.shopId)?.name
            }
            className="viewer-image"
        />

        {shop.find((item) => item.id === imageViewer.shopId)?.images.length > 1 && (
            <>
                <button
                    className="viewer-arrow viewer-left"
                    onClick={() => {
                        const selectedShop = shop.find(
                            (item) => item.id === imageViewer.shopId
                        );

                        const totalImages = selectedShop.images.length;

                        setImageViewer((previous) => ({
                            ...previous,
                            index:
                                previous.index === 0
                                    ? totalImages - 1
                                    : previous.index - 1,
                        }));
                    }}
                    aria-label="Previous image"
                >
                    ‹
                </button>

                <button
                    className="viewer-arrow viewer-right"
                    onClick={() => {
                        const selectedShop = shop.find(
                            (item) => item.id === imageViewer.shopId
                        );

                        const totalImages = selectedShop.images.length;

                        setImageViewer((previous) => ({
                            ...previous,
                            index:
                                previous.index === totalImages - 1
                                    ? 0
                                    : previous.index + 1,
                        }));
                    }}
                    aria-label="Next image"
                >
                    ›
                </button>

                <div className="viewer-counter">
                    {imageViewer.index + 1} /{" "}
                    {shop.find((item) => item.id === imageViewer.shopId)
                        ?.images.length}
                </div>
            </>
        )}

    </div>
)}
        </>
    );
}

export default Home;
