import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../context/appContext';
const Login = () => {
    const { userState } = useContext(AppContext)
    const [user, setUser] = userState
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const handeChangeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, userInfo)
            localStorage.setItem('userId', response.data.user.id)
            setUser(response.data.user)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    }
    return (
        <div className="form">
            <h3>Login</h3>
            <form onSubmit={submitHandler}>
                <div className="formGroup ">
                    <input type="email"
                        name="email"
                        placeholder="email"
                        value={userInfo.email}
                        onChange={handeChangeHandler} required />
                </div>
                <div className="formGroup ">
                    <input type="password"
                        name="password"
                        placeholder="password"
                        value={userInfo.password}
                        onChange={handeChangeHandler} required />
                </div>
                <div className="formGroup ">
                    <input className="submitButton" type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default Login