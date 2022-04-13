import {createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shop-data.js';
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => { // we want to make a new async function when using async functions in use effect
            const categoryMap = await getCollectionAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();

    }, [])
    
    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}