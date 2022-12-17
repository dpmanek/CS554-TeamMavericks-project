import React from 'react';
import styles from './styles.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import OAuth from '../OAuth/OAuth';
import { db } from "../../App"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
  } from "firebase/auth";

const Signup = () => {
	const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		  }));
	};

	

	const handleSubmit = async (e) => {
		e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      // Add data to this object to initiate blank field on signup
	  formDataCopy.timestamp = serverTimestamp();
	  formDataCopy.bio = ""
	  formDataCopy.posts = []
	  formDataCopy.isPrivate = false
	  formDataCopy.userfollowers = []
	  formDataCopy.userfollowing = []


      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
	  alert("Sign up was successful");
       
    } catch (error) {
      alert("Something went wrong with the registration");
    }
	};
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.right}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create a new Account</h1>
						<br></br> <br></br> <br></br>
						<label htmlFor="name">Name:</label>
						<input
							id="name"
							type="text"
							placeholder="Full Name"
							onChange={onChange}
							value={name}
							className={styles.input}
						/>
						<label htmlFor="email">Email:</label>
						<input
							id="email"
							type="email"
							placeholder="Email"
							onChange={onChange}
							value={email}
							className={styles.input}
						/>
						<label htmlFor="password">Password:</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							onChange={onChange}
							value={password}
							className={styles.input}
						/>
						<br></br>
						<button className="btn btn-success btn-round-lg btn-lg ">
							<span>Sign up</span>
						</button>
						<br></br>
						<div className="divider d-flex align-items-center my-4">
            				<p className="text-center fw-bold mx-3 mb-0">Or</p>
          				</div>
						  <br></br>

						<div className="divider d-flex align-items-center my-4">
            				<p className="text-center fw-bold mx-3 mb-0">Have an account?</p>
          				</div>
						  <br></br>

						{/* <button className="btn btn-success btn-round-lg btn-lg ">
							<span>Login</span>
						</button> */}

						<button className="btn btn-success btn-round-lg btn-lg ">
							<Link to="/login">Login</Link>
						</button>
						
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
