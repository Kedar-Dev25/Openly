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
            setStatus(response.data.status)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);
    if (!shop) {
    return <h2>Loading shop...</h2>;
    }
    return (
        <>
            <h1>{shop?.name}</h1>
            <h5>{shop?.address}</h5>
            <h4>{status}</h4>
            <button onClick={() =>{
                if(status === "OPEN"){
                    console.log("already open !!!!!!!")
                    return;
                }
                setStatus("OPEN")
                axios.put(`http://localhost:8080/data/update/${id}`,{status : "OPEN"})
                }
            }>Open</button>
            <button onClick={() =>{
                if(status === "CLOSE"){
                    console.log("already closed !!!!!!!")
                    return;
                }
                setStatus("CLOSE")
                axios.put(`http://localhost:8080/data/update/${id}`,{status : "CLOSE"})
                }
            }>Close</button>
        </>
    );
}

export default Owner;