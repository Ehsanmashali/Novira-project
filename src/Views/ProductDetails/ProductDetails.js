import React, {useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';

// Style
import styles from "./ProductDetails.module.css";
import { getProductById } from '../../services/api';


const ProductDetails = () => {
    const params = useParams()
    const id = params.id;
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setProduct(await getProductById(id));
        }

        fetchAPI();
    }, [id]);

    
    return (
        <div className={styles.container}>
            <img className={styles.image} src={product?.image} alt="product" />
            <div className={styles.textContainer}>
                <h3>{product?.title}</h3>
                <p className={styles.description}>{product?.description}</p>
                <p className={styles.category}><span>Category:</span> {product?.category}</p>
                <div className={styles.buttonContainer}>
                    <span className={styles.price}>{product?.price} $</span>
                    <Link to="/products">Back to Shop</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;