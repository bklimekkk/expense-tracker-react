import {useState} from "react"

function CategoriesElement({categories, setCategories, setExpenses, expenses, maximalFilterAmount, setMaximalFilterAmount}) {

    const [newCategoryName, setNewCategoryName] = useState("");
    
    function toggleCategoryExpense(category) {
        setCategories(categories => categories.map(c => 
            c.name === category.name
            ? {...c, areExpensesShown: c.areExpensesShown ? false : true}
            : c
        ));
    }
    
    function startRenamingCategory(categoryName) {
        setNewCategoryName(categoryName);
        setCategories(categories => categories.map(c => 
            c.name === categoryName
            ? {...c, isRenamed: true}
            : c
        ));
    }

    function cancelRenamingCategory(categoryName) {
        setCategories(categories => categories.map(c => 
            c.name === categoryName
            ? {...c, isRenamed: false}
            : c
        ));
        setNewCategoryName("");
    }

    function handleNewCategoryNameInputChange(event) {
        setNewCategoryName(event.target.value);
    }
    
    function handleCategoryNameChange(oldCategoryName) {
        setCategories(categories => categories.map(c =>
            c.name === oldCategoryName
            ? {...c, name: newCategoryName}
            : c
        ));

        setExpenses(expenses => expenses.map(e => 
            e.category === oldCategoryName
            ? {...e, category: newCategoryName}
            : e
        ));
        cancelRenamingCategory(newCategoryName);
    }
    
    function deleteCategory(categoryName) {
        setCategories(categories => categories.filter(c => c.name !== categoryName));
        setExpenses(expenses => expenses.filter(e => e.category !== categoryName));
        setMaximalFilterAmount(expenses.reduce((current, max) => current.amount > max.amount ? current : max).amount);
    }
    
    return (
        <>
        <p>Categories</p>
            <div className="categories-data-section">
                    {
                       categories.map((category, index) => 
                        <div className="category-container" key={index}>
                            <button onClick={() => deleteCategory(category.name)} className="delete-category-btn">x</button>
                            {
                            !category.isRenamed &&
                            <button 
                            onClick={() => toggleCategoryExpense(category)}
                            className="toggle-category-expenses-btn">{category.areExpensesShown ? "Show summary" : "Show Expenses"}</button>  
                            }

                            {
                                category.areExpensesShown ?
                                <>
                                <br />
                                <table>
                                    <thead>
                                        <th>Expense</th>
                                        <th>Amount</th>
                                    </thead>
                                    <tbody>
                                        {
                                            expenses.filter(e => e.category === category.name).map((expense, index) =>
                                            <tr key={index}>
                                                <td>{expense.name}</td>
                                                <td>{expense.amount}</td>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                 </table>
                                </>
                                :
                                <>
                            {
                                category.isRenamed ?
                                <>
                                <input 
                                value={newCategoryName}
                                onChange={(event) => handleNewCategoryNameInputChange(event)}
                                className="new-category-name-input" 
                                type="text"
                                placeholder="Enter category name"/>
                                {
                                    newCategoryName !== "" 
                                    && !categories.filter(c => c.name !== category.name).some(c => c.name === newCategoryName) 
                                    && <button 
                                            onClick={() => handleCategoryNameChange(category.name)} 
                                            className="new-category-name-confirm-btn">Confirm</button> 
                                }

                                <button 
                                className="new-category-name-cancel-btn" 
                                onClick={() => cancelRenamingCategory(category.name)}>Cancel</button>
                                </>
                                :
                                <p>{category.name}</p>
                            }
                            <p>{category.amount}</p>
                            <p>Average: {(category.amount / expenses.filter(e => e.category === category.name).length).toFixed(2)}</p>
                            {
                               !category.isRenamed && !categories.some(c => c.isRenamed === true) &&
                               <button onClick={() => startRenamingCategory(category.name)}>Rename category</button>
                            }
                            </>
                            }
                        </div>
                    )
                    }
            </div>
        </>
    );
}

export default CategoriesElement