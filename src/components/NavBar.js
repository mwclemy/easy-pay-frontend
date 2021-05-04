import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/appContext';
const NavBar = () => {
    const { userState } = useContext(AppContext)
    const [user, setUser] = userState
    return (
        <div className="navBar">
            <span className="logo">EasyPay</span>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user.id ?
                    <>
                        <li>
                            <Link to="/activity">Activity</Link>
                        </li>
                        <li>
                            <Link to="/addCash">Add Cash</Link>
                        </li>
                        <li>
                            <Link to="/payment">Make Payment</Link>
                        </li>
                        <li onClick={() => {
                            localStorage.removeItem('userId')
                            setUser({})
                        }}>Logout</li>
                    </>
                    :

                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>

                }
            </ul>
        </div>
    )
}

export default NavBar