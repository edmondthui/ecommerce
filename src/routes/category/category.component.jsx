import {useParams} from 'react-router-dom'
import { useState, useEffect, Fragment} from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useSelector } from 'react-redux'
import './category.styles.scss'

const Category = () => {
    let categoriesMap = useSelector(selectCategoriesMap);
    const {category} = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && // only render if products are done fetching from firebase
                    products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
        </Fragment>
    )
}
export default Category