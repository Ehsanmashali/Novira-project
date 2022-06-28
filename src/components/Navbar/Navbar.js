import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { CartContext } from '../../context/CartContextProvider';

// Icons
import shopIcon from "../../assets/icons/shop.svg";
import logout from "../../assets/icons/logout.png"

// Style
import styles from "./Navbar.module.css";

const Navbar = () => {

    const {state,dispatch} = useContext(CartContext);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <Link className={styles.productLink} to="/products">Products</Link>
                    <ul className={styles.listContainer}>
                        <li>
                            <div className={styles.iconContainer}>
                                {state.is_logged_in ?
                                <Link to="/cart"><img src={shopIcon} alt="shopIcon"/></Link>
                                : 
                                <Link to="/login"><img src={shopIcon} alt="shopIcon"/></Link>
                            }
                                <span>{state.itemsCounter}</span>
                            </div>
                        </li>
                        <li>
                            {state?.is_logged_in && 
                            <span onClick={() => dispatch({type: "LOGEDOUT", payload: !state?.is_logged_in })}>
                                <img src={logout} className={styles.loggoutLink} alt="Logout"/>
                            </span>
                            }
                        </li>
                    </ul>
                
            </div>
        </div>
    );
};

export default Navbar;