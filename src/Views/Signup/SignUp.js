import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Validation
import { Validate } from '../../components/Validate/Validate';

// Notif
import { notify } from "../../components/Toast/Toast"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// API
import axios from "axios";
import { BASE_URL } from "../../utils/";

// Style
import styles from "../Login/SignUp.module.css";

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(Validate(data, "signup"))
    }, [data, touched])

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const focusHanlder = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const submitHandler = event => {
        let payload = {
            "username": data.name,
            "password": data.password,
            "confirmed_password": data.confirmPassword
        }

        console.log("payload" , payload)
        
        event.preventDefault();
        if (!Object.keys(errors).length) {
            axios.post(`${BASE_URL}/account/login`, payload)
            .then(response=>{
                console.log({response})
                notify("Your registration was successful", "success")
            })
            .catch(error=>{
                notify("Wrong username or password!", "error")
                console.log({error})
            })
            
        } else {
            notify("Please enter the correct information!", "error")
            setTouched({
                name: true,
                password: true,
                confirmPassword: true,
                // email: true,
                // isAccepted: true
            })
        }
    }



    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
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
                {/* <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHanlder} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div> */}
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
                <div className={styles.formField}>
                    <label>confirm Password</label>
                    <input
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHanlder} />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                {/* <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accet terms of privacy policy</label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHanlder} />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div> */}
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;

// !/\S+@\S+\.\S+/.test(data.email)