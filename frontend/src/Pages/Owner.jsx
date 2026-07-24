import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Owner() {
    const[shop,setShop] = useState(null);
    const[status,setStatus] = useState("open")
    const {id} = useParams();
    console.log(id);

    useEffect(() => {
    axios.get(`http://localhost:8080/shops/${id}`)
        .then((response) => {
            console.log("Response:", response.data);
            setShop(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);
    return (
        <>
            <h1>{shop?.name}</h1>
            <h5>{shop?.address}</h5>
            <h4>{shop?.status}</h4>
            <button onClick={() =>{setStatus("open")}}>Open</button>
            <button onClick={() =>{setStatus("close")}}>Close</button>
        </>
    );
}

export default Owner;