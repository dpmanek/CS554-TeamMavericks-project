import React from 'react';
import styles from './styles.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import OAuth from '../OAuth/OAuth';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Login = () => {
	const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		  }));
	};

	async function onSubmit(e) {
		e.preventDefault();
		try {
		  const auth = getAuth();
		  console.log(auth)
		  const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		  );
		  if (userCredential.user) {
			navigate("/");
		  }
		} catch (error) {
		  alert("Bad user credentials");
		}
	  }
	return (


		
		<div className={styles.login_container}>
          		

			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={onSubmit}>
						<h1>Login to Your Account</h1>
						<br></br> <br></br> <br></br>
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
						<Link to="/forgot-password" className="">Forgot password?</Link>
						<br/>
				
						<button className="btn btn-success btn-round-lg btn-lg ">
							<span>Login</span>
						</button>
						<br></br>
						
						<div className="divider d-flex align-items-center my-4">
            				<p className="text-center fw-bold mx-3 mb-0">Or</p>
          				</div>
						  <br></br>

						<div className="divider d-flex align-items-center my-4">
            				<p className="text-center fw-bold mx-3 mb-0">Don't have an account?</p>
          				</div>
						  <br></br>

						{/* <button className="btn btn-success btn-round-lg btn-lg ">
							<span>Sign up</span>
						</button> */}

						{/* <small className="form-text text-muted">
          					 <Link to="/Signup">Signup</Link>
        				</small> */}

						<button className="btn btn-success btn-round-lg btn-lg ">
							<Link to="/Signup">Signup</Link>
						</button>
						
					</form>
					
				</div>
			</div>
		</div>
	);
};

export default Login;
