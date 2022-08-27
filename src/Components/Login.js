import React, {useState} from "react";

let initialUserData = {
    email: "",
    password: ""
};

const Login = () => {
    const [loginData, setLoginData] = useState(initialUserData);

    const handleSubmit = (e) => {
        e.preventDefault();
        let array = JSON.parse(localStorage.getItem('login')) || [];
        array.push(loginData);
        setLoginData(array);
        localStorage.setItem('login', JSON.stringify(array));
        setLoginData((preState) => ({...preState, ...initialUserData}));

        setLoginData({
            email: "",
            password: ""
        });
        console.log("loginData---------", loginData);
    };

    const dataChange = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={dataChange}
                                value={loginData.email}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={dataChange}
                                value={loginData.password}
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Already <a href="Registration">Register?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};
export default Login;