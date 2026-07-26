import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Owner() {

    const [shop,setShop] = useState(null);
    const [status,setStatus] = useState("OPEN");
    const {id} = useParams();


    useEffect(() => {
        axios.get(`https://localkart-pmni.onrender.com/shops/${id}`)
            .then((response) => {
                setShop(response.data);
                setStatus(response.data.status);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);


    if (!shop) {
        return <h2>Loading shop...</h2>;
    }


    const updateStatus = (newStatus) => {

        if(status === newStatus){
            return;
        }

        setStatus(newStatus);

        axios.put(
            `https://localkart-pmni.onrender.com/data/update/${id}`,
            {status:newStatus}
        );
    }


    return (
        <div className="owner-container">

            <div className="owner-header">
                <h1>LocalKart Owner</h1>
                <p>Update your shop status</p>
            </div>


            <div className="owner-card">

                <h2>{shop.name}</h2>

                <p>{shop.address}</p>


                <h3>
                    {status === "OPEN" && "🟢 OPEN"}
                    {status === "CLOSE" && "🔴 CLOSED"}
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