import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
function Home() {
    const[shop,setShop] = useState([])

        useEffect(() =>{
        axios.get("http://localhost:8080/all-data")
            .then((response)=>{
                setShop(response.data);
            })
        },[])
    return(
        <>
                {shop.map((shop) => (
                <div key={shop.id} className="card">
                <h2>{shop.name}</h2>
                <p>{shop.address}</p>
                <p>{shop.status === "OPEN" ? "🟢 OPEN" : "🔴 CLOSED"}</p>
                </div>
    ))}
    </>
    );
    
}

export default Home;