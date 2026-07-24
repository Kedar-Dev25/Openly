import { Routes, Route } from "react-router-dom";
import Owner from "./Pages/Owner";

function App() {
    return (
        <Routes>
            <Route path="/owner/:id" element={<Owner />} />
        </Routes>
    );
}

export default App;