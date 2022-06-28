import React, { useState, useEffect ,useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { setToken } from "../../utils/utils";

// Validation
import { Validate } from '../../components/Validate/Validate';

// Notif
import { ToastContainer } from 'react-toastify';
import { notify } from "../../components/Toast/Toast"
import 'react-toastify/dist/ReactToastify.css';

// API
import axios from "axios";
import { BASE_URL } from "../../utils/";

// Style
import styles from "./SignUp.module.css";

// Context
import { CartContext } from '../../context/CartContextProvider';

const Login = () => {
    const [data, setData] = useState({
        name: "",
        password: "",
    });
    const {dispatch} = useContext(CartContext);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        setErrors(Validate(data, "login"))
    }, [data, touched])

    const changeHandler = event => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const focusHanlder = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    async function submitHandler(event) {
        event.preventDefault();

        let payload = {
            "username": data.name,
            "password": data.password,
        }

        if (!Object.keys(errors).length) {
            axios.post(`${BASE_URL}/auth/login`, payload)
                .then(response => {
                    if (response.status === 200) {
                        notify("Welcome to shop", "success")
                        setTimeout(() => {
                            setToken(response.data.token)
                            navigate('/products')
                            dispatch({type: "LOGEDIN", payload: payload.username})
                        }, 2000);
                    }
                })
                .catch(error => {
                    notify("Wrong username or password!", "error")
                    console.log({ error })
                })
        } else {
            notify("Please enter the correct information!", "error")
            setTouched({
                name: true,
                password: true,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>User Name</label>
                    <input
                        className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHanlder}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type="password" name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHanlder} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup">Signup</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
