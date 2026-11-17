
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
    const [shop, setShop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageIndexes, setImageIndexes] = useState({});
    const [imageViewer, setImageViewer] = useState(null);
    const navigate = useNavigate();

const [selectedShop, setSelectedShop] = useState(null);
const [ownerPassword, setOwnerPassword] = useState("");
const [loginError, setLoginError] = useState("");
const [verifying, setVerifying] = useState(false);

function openOwnerLogin(selected) {
    setSelectedShop(selected);
    setOwnerPassword("");
    setLoginError("");
}

function closeOwnerLogin() {
    setSelectedShop(null);
    setOwnerPassword("");
    setLoginError("");
}

async function handleOwnerLogin(e) {
    e.preventDefault();

    if (!ownerPassword.trim()) {
        setLoginError("Please enter your shop PIN.");
        return;
    }

    try {
        setVerifying(true);
        setLoginError("");

        const response = await fetch(`${API_URL}/owner/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shopId: selectedShop.id,
                password: ownerPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.valid) {
            setLoginError("Incorrect PIN. Please try again.");
            return;
        }

navigate(`/owner/${selectedShop.id}`, {
    state: { authorized: true }
});
    } catch (error) {
        console.error("Owner login error:", error);
        setLoginError("Unable to verify PIN. Please try again.");
    } finally {
        setVerifying(false);
    }
}
    function getLastUpdated(date) {
        if (!date) return "Unknown";

        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
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
        fetch(`${API_URL}/all-data`, {
            cache: "no-store",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch shops");
                }

                return response.json();
            })
            .then((data) => {
                setShop(data);
            })
            .catch((error) => {
                console.error("Error fetching shops:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <>
                <div className="hero">
                    <div className="brand">
                        <img
                            src="/openlylogo.png"
                            alt="Openly logo"
                            className="openly-logo"
                        />
                        <h1>Openly</h1>
                    </div>

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
                <div className="brand">
                    <img
                        src="/openlylogo.png"
                        alt="Openly logo"
                        className="openly-logo"
                    />
                    <h1>Openly</h1>
                </div>

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
                                        shop.status === "OPEN"
                                            ? "shop-status open"
                                            : shop.status === "CLOSE"
                                            ? "shop-status closed"
                                            : "shop-status not-updated"
                                    }
                                >
                                    {shop.status === "OPEN" && "🟢 OPEN NOW"}
                                    {shop.status === "CLOSE" && "🔴 CLOSED"}
                                    {shop.status === "NOT_UPDATED" &&
                                        "🟡 Status Not Updated Today"}
                                </p>

                                <p>
                                    Last updated: {getLastUpdated(shop.lastUpdated)}
                                </p>
                                <button
    className="owner-access-link"
    onClick={() => openOwnerLogin(shop)}
>
    Shop owner?
</button>
                            </div>

                            {shop.images?.length > 0 && (
                                <div className="shop-image-section">
                                    <div className="shop-image-wrapper">
                                        <button
                                            className="shop-image-button"
                                            onClick={() =>
                                                openImageViewer(shop.id)
                                            }
                                            aria-label={`View photos of ${shop.name}`}
                                        >
                                            <img
                                                src={
                                                    shop.images[
                                                        imageIndexes[shop.id] || 0
                                                    ]
                                                }
                                                alt={shop.name}
                                                className="shop-image"
                                            />
                                        </button>
                                    </div>

                                    <button
                                        className="see-shop-button"
                                        onClick={() =>
                                            openImageViewer(shop.id)
                                        }
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
                {selectedShop && (
    <div
        className="owner-modal-overlay"
        onClick={closeOwnerLogin}
    >
        <div
            className="owner-modal"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="owner-modal-close"
                onClick={closeOwnerLogin}
            >
                ×
            </button>

            <div className="owner-lock-icon">
                🔐
            </div>

            <h2>Owner Access</h2>

            <p className="owner-modal-description">
                Enter your shop PIN to manage your availability.
            </p>

            <div className="owner-selected-shop">
                <strong>{selectedShop.name}</strong>
                <span>{selectedShop.address}</span>
            </div>

            <form onSubmit={handleOwnerLogin}>
                <label htmlFor="owner-pin">
                    Shop PIN
                </label>

                <input
                    id="owner-pin"
                    type="password"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="Enter 5-digit PIN"
                    value={ownerPassword}
                    onChange={(e) => {
                        setOwnerPassword(
                            e.target.value.replace(/\D/g, "")
                        );
                        setLoginError("");
                    }}
                    autoFocus
                />

                {loginError && (
                    <p className="owner-login-error">
                        {loginError}
                    </p>
                )}

                <button
                    type="submit"
                    className="owner-login-button"
                    disabled={verifying || ownerPassword.length !== 5}
                >
                    {verifying ? "Verifying..." : "Continue →"}
                </button>
            </form>

            <p className="owner-modal-footer">
                Authorized shop owners only
            </p>
        </div>
    </div>
)}
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
                            shop.find(
                                (item) => item.id === imageViewer.shopId
                            )?.images?.[imageViewer.index]
                        }
                        alt={
                            shop.find(
                                (item) => item.id === imageViewer.shopId
                            )?.name
                        }
                        className="viewer-image"
                    />

                    {shop.find(
                        (item) => item.id === imageViewer.shopId
                    )?.images?.length > 1 && (
                        <>
                            <button
                                className="viewer-arrow viewer-left"
                                onClick={() => {
                                    const selectedShop = shop.find(
                                        (item) =>
                                            item.id === imageViewer.shopId
                                    );

                                    const totalImages =
                                        selectedShop.images.length;

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
                                        (item) =>
                                            item.id === imageViewer.shopId
                                    );

                                    const totalImages =
                                        selectedShop.images.length;

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
                                {
                                    shop.find(
                                        (item) =>
                                            item.id === imageViewer.shopId
                                    )?.images.length
                                }
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Home;
