import { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/appContext'
const MakePayment = () => {
    const [amount, setAmount] = useState(0)
    const [reason, setReason] = useState('')
    const [searchTerm, setSearchTem] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [allUsers, setAllusers] = useState([])
    const [receiver, setReceiver] = useState([])
    const { userState, fetchUser } = useContext(AppContext)
    const [user, setUser] = userState
    const [redirect, setRedirect] = useState(false)
    const searchReciever = async () => {
        if (searchTerm) {
            const results = allUsers.filter(object =>
                object.email.toLowerCase().includes(searchTerm) ||
                object.name.toLowerCase().includes(searchTerm)
            )
            setSearchResults(results)
        }
        else {
            setSearchResults([])
        }
    }

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
            setAllusers(response.data.users)
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    const handleRecieverChange = (user) => {
        setReceiver([...receiver, user.email])
    }

    const handleSearchTermChange = (searchTerm) => {
        setSearchTem(searchTerm)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/sendCash`, {
                amount: parseFloat(amount),
                reason: reason,
                receiver: receiver
            }, {
                headers: {
                    Authorization: user.id
                }
            })

            fetchUser()
            setRedirect(true)

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    }

    useEffect(fetchAllUsers, [])

    useEffect(() => {
        searchReciever()
    }, [searchTerm])

    return (
        <div className="payment">
            {redirect ? <Redirect to="/activity" /> : null}
            <h2>Make Payment</h2>
            <div className="amount"><span>$</span><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required /></div>
            <form onSubmit={submitHandler}>
                <div className="formGroup">
                    <div className="receiver"><span>{receiver.length > 0 ? `${receiver.join(' ')} ` : ''}</span><input type="text" name="receiver" placeholder="To: Name, Email" value={searchTerm} onChange={(e) => handleSearchTermChange(e.target.value)} required /></div>
                    <ul className="searchReciever">
                        {searchResults.map(user => {
                            return <li key={user.id} className={receiver.includes(user.email) ? 'added' : ''} onClick={() => !receiver.includes(user.email) ? handleRecieverChange(user) : null}>{user.name}</li>
                        })}
                    </ul>
                </div>
                <div className="formGroup">
                    <input type="name" name="reason" placeholder="For: Dinner, Rent, etc." value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <div className="formGroup">
                    <input className="submitButton" type="submit" value="Pay" />
                </div>
            </form>

        </div>
    )
}

export default MakePayment