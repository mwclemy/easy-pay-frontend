import { useState, useContext } from 'react'
import ButtonGroup from '../components/ButtonGroup'
import { AppContext } from '../context/appContext'
import axios from 'axios'
const Banking = () => {
    const [amount, setAmount] = useState(null)
    const [section, setSection] = useState('')
    const { userState, fetchUser } = useContext(AppContext)
    const [user, setUser] = userState
    const addCashClickHandler = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/addCash`, {
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: user.id
                }
            })
            setUser(response.data.user)
            setAmount(null)
            setSection('')
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className="banking">
            <div className="balance">
                <span className="userCash">${user.balance}</span>
                <span>Cash Balance</span>
            </div>
            <div>
                <button className="button" onClick={() => setSection('addCash')}>Add Cash</button>
                <button className="button" onClick={() => setSection('cashOut')}>Cash Out </button>
            </div>
            {section === 'addCash' && (
                <>
                    <h2>Add Cash</h2>
                    <ButtonGroup buttons={["10", "20", "50", "100"]} buttonClickHandler={(e) => setAmount(e.target.name)} />
                    <button className={amount ? "button submitButton" : "button"} onClick={addCashClickHandler} disabled={amount ? false : true}>Add</button>
                </>
            )}
        </div>
    )
}

export default Banking