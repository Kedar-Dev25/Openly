import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Owner() {
    const[status,setStatus] = useState("open")
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8080/shops/${id}`)
            .then((response) => {
                console.log(response.data);
            });
        },[id])
    return (
        <>
            <h1>TaraTarini Book Store</h1>
            <h4>{status}</h4>
            <button onClick={() =>{setStatus("open")}}>Open</button>
            <button onClick={() =>{setStatus("close")}}>Close</button>
        </>
    );
}

export default Owner;