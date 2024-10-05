import ExpenseTableHeaderElement from "./ExpenseTableHeaderElement";
import ExpenseRowElement from "./ExpenseRowElement";

function TrashSectionElement({handleTrashBtnClick, showTrashSection, handleTrashCancelBtnClick, trashExpenses, showExpense}) {
    return(
        <div className="trash-section">
                <button className="trash-btn" onClick={handleTrashBtnClick}>Trash</button>
                {
                    showTrashSection &&
                    <div className="trash-expenses-section">
                        <button className="trash-cancel-btn" onClick={handleTrashCancelBtnClick}>Cancel</button>
                        <h1>Trash</h1>
                        <table className="trash-table">
                        {
                            trashExpenses.length === 0
                            ? 
                            <tbody>
                                <p>No expenses</p>
                            </tbody>
                            : <ExpenseTableHeaderElement />
                        }
                        <tbody>
                            {
                              trashExpenses.map((expense, index) => 
                                <>
                                  <ExpenseRowElement index={index} expense={expense} showExpense={showExpense}/>
                                </>
                            )
                            }
                        </tbody>
                        </table>
                    </div>
                }
            </div>
    );
}

export default TrashSectionElement