import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/appContext'
import Transaction from '../components/Transaction'
const Activity = () => {
    const [transactions, setTransactions] = useState([])
    const { userState, fetchUser } = useContext(AppContext)
    const [user, setUser] = userState
    const getUserTransactions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions/userTransactions`, {
                headers: {
                    Authorization: user.id
                }
            })
            setTransactions(response.data.transactions)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        getUserTransactions()
    }, [])
    return (
        <div className="activity">
            <h2>Completed</h2>
            {transactions.map(transaction => {
                return <Transaction key={transaction.id} transaction={transaction} user={user} />
            })}
        </div>
    )
}

export default Activity