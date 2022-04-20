import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentification from "./routes/authentication/authentification.component";
import { Routes, Route } from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />}></Route>
                <Route path="shop/*" element={<Shop />}></Route>
                <Route path="auth" element={<Authentification />}></Route>
                <Route path="checkout" element={<Checkout />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
