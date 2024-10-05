import {useState} from "react"

function ExpenseSectionElement({removeExpenseSection, viewedExpense, startEditExpenseState, expenses, moveToTrash, restoreExpense,
    confirmEdit, cancelEditExpenseState, handleViewedExpenseNameChange, hanldeViewedExpenseAmountChange, handleViewedExpenseDateChange,
    handleViewedExpenseNotesChange, handleViewedExpensePropertyChange, handleViewedExpenseCommentChange, removeFromTrash}) {

    return(
        <div className="expense-section">
                    <div className="expense-data-section">
                        <button onClick={removeExpenseSection} className="expense-cancel-btn">Cancel</button>
                        {
                            !viewedExpense.edited ?
                            <>
                              <h1>{viewedExpense.name}</h1>
                        <p>Category: {viewedExpense.category}</p>
                        <p>Amount: {viewedExpense.amount}</p>
                        <p>Date: {viewedExpense.date}</p>
                        <p>Notes: {viewedExpense.notes}</p>
                        <p>Created: {viewedExpense.created}</p>
                        {
                            viewedExpense.properties.map((property, index) => 
                                <div key={index}>
                                    <p>{property.name}: {property.value}</p>
                                </div>
                            )
                        }
                        {
                            viewedExpense.comments.length !== 0 
                            && 
                            <>
                              <p>Comments:</p>
                              {
                                viewedExpense.comments.map((comment, index) => 
                                    <p key={index}>{comment.value}</p>
                                )
                              }
                            </>
                        }
                         <button onClick={startEditExpenseState}>Edit</button>
                         {
                            expenses.some(e => e.id === viewedExpense.id)
                            ? <button className="move-to-trash-btn" onClick={moveToTrash}>Move To Trash</button>
                            : 
                            <>
                                <button className="restore-expense-btn" onClick={restoreExpense}>Restore expense</button>
                                <button className="remove-from-trash-btn" onClick={removeFromTrash}>Remove from trash</button>
                            </>
                         }
                            </>
                            :
                            <> 

                            <input
                            value={viewedExpense.name} 
                            onChange={(event) => handleViewedExpenseNameChange(event)}
                            className="edited-expense-name-input" 
                            type="text" 
                            placeholder="Enter expense"/>

                            <p>Category: {viewedExpense.category}</p>

                            <p>Amount: <input 
                            type="number" 
                            value={viewedExpense.amount}
                            onChange={(event) => hanldeViewedExpenseAmountChange(event)}
                            placeholder="Enter amount"/></p>

                            <p>Date: <input 
                            value={viewedExpense.date}
                            onChange={(event) => handleViewedExpenseDateChange(event)}
                            type="datetime-local" 
                            placeholder="Enter date"/></p>

                            <p>Notes: <input 
                            type="text" 
                            value={viewedExpense.notes}
                            onChange={(event) => handleViewedExpenseNotesChange(event)}
                            placeholder="Enter notes"/></p>

                            <p>Created: {viewedExpense.created}</p>

                            {
                                viewedExpense.properties.map((property, index) => 
                                    <p key={index}>{property.name}: <input 
                                type="text"
                                value={property.value}
                                onChange={(event) => handleViewedExpensePropertyChange(property, event)}
                                placeholder="Enter value"/></p>
                                )
                            }

                            {
                                viewedExpense.comments.length !== 0
                                && <p>Comments</p>
                            }

                            {
                                viewedExpense.comments.map((comment, index) => 
                                    <div key={index}>
                                     <input 
                                     value={comment.value} 
                                     onChange={(event) => handleViewedExpenseCommentChange(comment, event)}
                                     type="text" 
                                     placeholder="enter comment" />
                                     <br />
                                    </div>
                                )
                            }
                            <br />
                            <button className="confirm-edit-btn" onClick={confirmEdit}>Confirm Edit</button>
                            <button className="cancel-edit-btn" onClick={cancelEditExpenseState}>Cancel Edit</button>
                            </>
                        }
                    </div>
                </div>
    );
}

export default ExpenseSectionElement