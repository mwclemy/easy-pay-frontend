import axios from "axios"
const { useState, createContext } = require("react")
const AppContext = createContext()
const AppProvider = (props) => {
    const [user, setUser] = useState({})
    const userState = [user, setUser]

    const fetchUser = async () => {

        const userId = localStorage.getItem('userId')
        if (userId) {
            try {

                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
                    headers: {
                        Authorization: userId
                    }
                })

                setUser(response.data.user)

            } catch (error) {
                alert('user not found')
            }
        }
    }
    const state = {
        userState: userState,
        fetchUser: fetchUser
    }

    return (
        <AppContext.Provider value={state}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }