import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component"
import Authentification from "./routes/authentication/authentification.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
    return (
        <h1>I am the shop page</h1>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />}></Route>
                <Route path="shop" element={<Shop />}></Route>
                <Route path="auth" element={<Authentification />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
