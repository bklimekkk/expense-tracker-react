import {useState, useEffect} from "react";
import ExpenseRowElement from "./ExpenseRowElement.jsx";
import FiltersElement from "./FiltersElement.jsx";
import ExpenseTableHeaderElement from "./ExpenseTableHeaderElement.jsx";
import CategoriesElement from "./CategoriesElement.jsx";
import AddExpenseSection from "./AddExpenseSection.jsx";
import ExpenseSectionElement from "./ExpenseSectionElement.jsx";
import StatisticsSectionElement from "./StatisticsSectionElement.jsx";
import TrashSectionElement from "./TrashSectionElement.jsx";

function ExpenseTracker() {

    const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || []);
    const [searchExpensesText, setSearchExpensesText] = useState("");
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")) || []);
    const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tags")) || []);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isAddExpenseSectionActive, setIsAddExpenseSectionActive] = useState(false);
    const [newExpenseCurrentDate, setNewExpenseCurrentDate] = useState("");
    const [isExpenseSectionActive, setIsExpenseSectionActive] = useState("");
    const [viewedExpense, setViewedExpense] = useState(null);
    const [minimalFilterAmount, setMinimalFilterAmount] = useState(0);
    const [maximalFilterAmount, setMaximalFilterAmount] = useState(expenses.length > 0 
        ? expenses.reduce((current, max) => current.amount > max.amount ? current : max).amount
        : 0);
    const [trashExpenses, setTrashExpenses] = useState(JSON.parse(localStorage.getItem("trashExpenses")) || []);
    const [showTrashSection, setShowTrashSection] = useState(false);
    const [showTagsSection, setShowTagsSection] = useState(false);
    
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
    
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);
    
    useEffect(() => {
        localStorage.setItem("trashExpenses", JSON.stringify(trashExpenses));
    }, [trashExpenses]);
    
    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tags));
    }, [tags]);
    
    useEffect(() => {
        setMaximalFilterAmount(expenses.length > 0 
            ? expenses.reduce((current, max) => current.amount > max.amount ? current : max).amount
            : 0);
    }, [expenses, categories]);
    
    function handleSearchExpensesTextChange(event) {
       setSearchExpensesText(event.target.value); 
    }
    
    function clearFilteredCategories() {
        setFilteredCategories([]);
    }

    function editFilteredCategory(category) {
        if(filteredCategories.some(c => c === category)) {
            setFilteredCategories(categories => categories.filter(c => c !== category)); 
        } else {
            setFilteredCategories(filteredCategories => [...filteredCategories, category]);  
        }
    }

    function handleMinimalAmountFilterChange(event) {
        setMinimalFilterAmount(event.target.value);
    }

    function handleMaximalAmountFilterChange(event) {
        setMaximalFilterAmount(event.target.value);
    }
    
    function showAddExpense() {
        setShowTrashSection(false);
        setNewExpenseCurrentDate(currentDate());
        setIsAddExpenseSectionActive(true);
    }
    
    function hideAddExpense() {
        setIsAddExpenseSectionActive(false); 
    }

    function currentDate() {
       const date = new Date();
       const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
       const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    
       return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
    
    function showExpense(expense) {
        setViewedExpense(expense);
        setShowTrashSection(false);
        setIsExpenseSectionActive(true);
    }
    
    function removeExpenseSection() {
        setIsExpenseSectionActive(false);
        setViewedExpense(null);
    }
    
    function startEditExpenseState() {
        setViewedExpense(expense => ({...expense, edited: true}));
    }

    function cancelEditExpenseState() {
        setExpenses(expenses => expenses.map(e => 
            e.id === viewedExpense.id
            ? {...e, edited: false}
            : e
        ));
        
        const expense = expenses.find(e => e.id === viewedExpense.id);
        setViewedExpense(e => ({...expense, edited: false}));
    }
    
    function handleViewedExpenseNameChange(event) {
        setViewedExpense(expense => ({...expense, name: event.target.value}));
    }

    function hanldeViewedExpenseAmountChange(event) {
        setViewedExpense(expense => ({...expense, amount: event.target.value}));
    }

    function handleViewedExpenseDateChange(event) {
        setViewedExpense(expense => ({...expense, date: event.target.value}));
    }

    function handleViewedExpenseNotesChange(event) {
        setViewedExpense(expense => ({...expense, notes: event.target.value}));
    }
    
    function handleViewedExpensePropertyChange(property, event) {
        setViewedExpense(expense => ({...expense, properties: expense.properties.map(p => 
            p.name === property.name
            ? {...p, value: event.target.value}
            : p
        )}));
    }

    function handleViewedExpenseCommentChange(comment, event) {
        setViewedExpense(expense => ({...expense, comments: expense.comments.map(c => 
            c.id === comment.id
            ? {...c, value: event.target.value}
            : c
        )}));
    }

    function confirmEdit() {
        const editedExpense = expenses.find(e => e.id === viewedExpense.id);
        const oldAmount = editedExpense.amount;
        const newAmount = viewedExpense.amount;
        const expenseCategory = editedExpense.category;
        
        setCategories(categories => categories.map(c => 
           c.name === expenseCategory
           ? {...c, amount: Number(c.amount) - Number(oldAmount) + Number(newAmount)}
           : c
        ));
        
        setViewedExpense(expense => ({...expense, edited: false}));

        setExpenses(expenses => expenses.map(e =>
            e.id === viewedExpense.id
            ? {...viewedExpense, edited: false}
            : e
        ));
    }

    function handleTrashBtnClick() {
        setShowTrashSection(true);
    }
    
    function handleTrashCancelBtnClick() {
        setShowTrashSection(false);
    }
    
    function moveToTrash() {
        const deletedExpense = expenses.find(e => e.id === viewedExpense.id);
        setCategories(categories => categories.map(c =>
            c.name === deletedExpense.category
            ? {...c, amount: Number(c.amount) - Number(deletedExpense.amount)}
            : c
        ));
        setExpenses(expenses => expenses.filter(e => e.id !== viewedExpense.id));
        if(!expenses.some(e => e.category === viewedExpense.category)) {
            setCategories(categories => categories.filter(c => c.name != viewedExpense.category));
        }
        setTrashExpenses(expenses => [...expenses, deletedExpense])
    }

    function restoreExpense() {
       const restoredExpense = trashExpenses.find(e => e.id === viewedExpense.id);
       if(!expenses.some(e => e.category === viewedExpense.category)) {
        setCategories(categories => [...categories, {
            name: restoreExpense.category, 
            amount: Number(restoredExpense.amount),
            areExpensesShown: false
        }]); 
       } else {
        setCategories(categories => categories.map(c =>
            c.name === restoredExpense.category
            ? {...c, amount: Number(c.amount) + Number(restoredExpense.amount)}
            : c
            ));
       }
       setTrashExpenses(expenses => expenses.filter(e => e.id !== viewedExpense.id));
       setExpenses(expenses => [...expenses, restoredExpense])
    }
    
    function removeFromTrash() {
        setTrashExpenses(expenses => expenses.filter(e => e.id !== viewedExpense.id));
        setIsExpenseSectionActive(false);
        alert(`${viewedExpense.name} was removed from trash`);
        setViewedExpense(null);
    }
    
    function showTags() {
        setShowTagsSection(true);
    }
    
    function cancelTagsSection() {
       setShowTagsSection(false); 
    }
    
    function deleteFromMainTags(tagName) {
        setTags(tags => tags.filter(t => t !== tagName));
    }
    
    return(
        <main>
            <h1>Expense Tracker</h1>
            {
                expenses.length !== 0 ?
                <>

                <FiltersElement searchExpensesText={searchExpensesText} handleSearchExpensesTextChange={handleSearchExpensesTextChange} 
                filteredCategories={filteredCategories} clearFilteredCategories={clearFilteredCategories}
                categories={categories} editFilteredCategory={editFilteredCategory}
                 minimalFilterAmount={minimalFilterAmount} maximalFilterAmount={maximalFilterAmount}
                  handleMinimalAmountFilterChange={handleMinimalAmountFilterChange}
                handleMaximalAmountFilterChange={handleMaximalAmountFilterChange} tags={tags} selectedTags={selectedTags}
                 setSelectedTags={setSelectedTags} />
                
                <table className="expenses-table">
                <ExpenseTableHeaderElement />
                <tbody>
                    {
                        expenses.map((expense, index) => 
                            ((expense.name.toLowerCase().includes(searchExpensesText.toLowerCase()) || searchExpensesText === "") &&
                            (filteredCategories.length === 0 || filteredCategories.map(c => c.name).includes(expense.category)) &&
                            (Number(expense.amount) >= minimalFilterAmount && Number(expense.amount) <= maximalFilterAmount)) &&
                            (selectedTags.every(t => expense.tags.includes(t))) &&
                            <ExpenseRowElement index={index} expense={expense} showExpense={showExpense}/>
                        )
                    }
                </tbody>
            </table>
            </>
            :
            <p>No expenses added</p>
            }

            {
                !isAddExpenseSectionActive &&
                <button className="add-expense-btn" onClick={showAddExpense}>Add expense</button>
            }

            <CategoriesElement categories={categories} setCategories={setCategories} setExpenses={setExpenses} expenses={expenses} />

            {
                isAddExpenseSectionActive &&
                <AddExpenseSection hideAddExpense={hideAddExpense} newExpenseCurrentDate={newExpenseCurrentDate}
                setExpenses={setExpenses} categories={categories} setCategories={setCategories}
                setIsAddExpenseSectionActive={setIsAddExpenseSectionActive} tags={tags} setTags={setTags} />
            }
            {
                isExpenseSectionActive &&
                <ExpenseSectionElement removeExpenseSection={removeExpenseSection} viewedExpense={viewedExpense}
                startEditExpenseState={startEditExpenseState} expenses={expenses} moveToTrash={moveToTrash}
                restoreExpense={restoreExpense} confirmEdit={confirmEdit} cancelEditExpenseState={cancelEditExpenseState}
                handleViewedExpenseNameChange={handleViewedExpenseNameChange}
                 hanldeViewedExpenseAmountChange={hanldeViewedExpenseAmountChange}
                 handleViewedExpenseDateChange={handleViewedExpenseDateChange}
                  handleViewedExpenseNotesChange={handleViewedExpenseNotesChange} 
                 handleViewedExpensePropertyChange={handleViewedExpensePropertyChange}
                  handleViewedExpenseCommentChange={handleViewedExpenseCommentChange}
                  removeFromTrash={removeFromTrash}/>
            }
            <StatisticsSectionElement categories={categories} expenses={expenses}/>
            <TrashSectionElement handleTrashBtnClick={handleTrashBtnClick} showTrashSection={showTrashSection}
            handleTrashCancelBtnClick={handleTrashCancelBtnClick} trashExpenses={trashExpenses} showExpense={showExpense}/>

            <div className="tags-section">
            <button onClick={showTags}>Tags</button>
            {
            showTagsSection &&
            <div className="display-tags-section">
                <button onClick={cancelTagsSection} className="tags-cancel-btn">Cancel</button>
                {
                    tags.map((tag, index) => 
                        <div className="tag-container" key={index}>
                            {tag}
                            <button className="tag-delete-btn" onClick={() => deleteFromMainTags(tag)}>X</button>
                        </div>
                    )
                }
            </div>
            }
            </div>

        </main>
    );
}

export default ExpenseTracker