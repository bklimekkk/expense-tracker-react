function ExpenseRowElement({index, expense, showExpense}) {
    return (
        <tr key={index}>
            <td><button onClick={() => showExpense(expense)} className="expense-name-btn">{expense.name}</button></td>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td>{expense.notes}</td>
             <td>{expense.created}</td>
        </tr>
    );
}

export default ExpenseRowElement