import { Routes, Route } from "react-router-dom";
import Owner from "./Pages/Owner";
import Home from "./Pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/owner/:id" element={<Owner />} />
            <Route path="/" element = {<Home />} />
        </Routes>
    );
}

export default App;