const Transaction = ({ transaction, user }) => {
    return (
        <div className="transaction">
            {user.id === transaction.sender.id ?
                <>
                    <div className="transactionDetails">

                        <span>{transaction.receiver.name}</span>
                        <span className="reason">For {transaction.reason}</span>
                    </div>
                    <span>{`$${transaction.amount}`}</span>
                </>
                :

                <>
                    <div className="transactionDetails">
                        <span>{transaction.sender.name}</span>
                        <span className="reason">For {transaction.reason}</span>
                    </div>
                    <span>{`+ $${transaction.amount}`}</span>
                </>
            }

        </div>
    )
}

export default Transaction