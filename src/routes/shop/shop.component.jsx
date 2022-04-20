import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { useDispatch } from "react-redux";
import { setCategoriesMap } from "../../store/categories/category.action";

import Category from "../category/category.component";

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            // we want to make a new async function when using async functions in use effect
            const categoryMap = await getCollectionAndDocuments();
            dispatch(setCategoriesMap(categoryMap));
        };

        getCategoriesMap();
    }, []);


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
