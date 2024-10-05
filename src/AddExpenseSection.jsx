import {useState} from "react"
function AddExpenseSection({hideAddExpense, newExpenseCurrentDate, setExpenses, categories, setCategories, setIsAddExpenseSectionActive,
    tags, setTags
}) {

    const [showAddProperty, setShowAddProperty] = useState(false);
    const [newExpenseName, setNewExpenseName] = useState("");
    const [newExpenseCategory, setNewExpenseCategory] = useState("");
    const [newExpenseAmount, setNewExpenseAmount] = useState("");
    const [newExpenseDate, setNewExpenseDate] = useState("");
    const [newExpenseNotes, setNewExpenseNotes] = useState("");
    const [newExpenseProperties, setNewExpenseProperties] = useState([]);
    const [newExpenseComments, setNewExpenseComments] = useState([]);
    const [propertyName, setPropertyName] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [existingProperties, setExistingProperties] = useState(["Category", "Amount", "Date", "Notes", "Created"]);
    const [commentText, setCommentText] = useState("");
    const [chooseFromExistingCategories, setChooseFromExistingCategories] = useState(false);
    const [newExpenseTags, setNewExpenseTags] = useState([]);
    const [tagText, setTagText] = useState("");
    
    function addProperty() {
        setShowAddProperty(true);
    }
    
    function cancelAddProperty() {
        setPropertyName(""); 
        setPropertyValue("");
        setShowAddProperty(false);
    }

    function confirmPropertyAddition() {
        if(!existingProperties.some(p => p.toLowerCase() === propertyName.toLowerCase())) {
            setExistingProperties(properties => [...properties, propertyName]);
            setNewExpenseProperties(properties => [...properties, {name: propertyName, value: propertyValue}]);
            setPropertyName("");
            setPropertyValue("");
            setShowAddProperty(false);
        } else {
            alert("This property already exists");
            setPropertyName("");
            setPropertyValue("");
        }
    }

    function handleNameInput(event) {
        setNewExpenseName(event.target.value);
    }

    function addExpense() {
        setExpenses(expenses => [...expenses, {
            name: newExpenseName,
            category: newExpenseCategory,
            amount: newExpenseAmount,
            date: newExpenseDate,
            notes: newExpenseNotes,
            created: newExpenseCurrentDate,
            properties: newExpenseProperties,
            comments: newExpenseComments,
            tags: newExpenseTags,
            edited: false,
            id: getId()
        }])

        if(categories.some(category => category.name === newExpenseCategory)) {
            setCategories(categories => categories.map(c => 
                c.name === newExpenseCategory
                ? {...c, amount: c.amount + Number(newExpenseAmount)}
                : c
            ))
        } else {
            setCategories(categories => [...categories, {
                name: newExpenseCategory, 
                amount: Number(newExpenseAmount),
                areExpensesShown: false,
                isRenamed: false
            }]);
        }
        
        newExpenseTags.forEach((tag) => {
            if(!tags.some(t => t === tag)) {
                setTags(tags => [...tags, tag]);
            }
        });
        
        setNewExpenseName("");
        setNewExpenseCategory("");
        setNewExpenseAmount(""); 
        setNewExpenseDate("");
        setNewExpenseNotes("");
        setNewExpenseProperties([]); 
        setNewExpenseComments([]);
        setNewExpenseTags([]);
        setIsAddExpenseSectionActive(false);
    }

    function handleCategoryChange(event) {
        setNewExpenseCategory(event.target.value);
    }
    
    function handleAmountChange(event) {
        setNewExpenseAmount(event.target.value);
    }
    
    function handleDateChange(event) {
        setNewExpenseDate(event.target.value);
    }
    
    function handleNotesChange(event) {
        setNewExpenseNotes(event.target.value);
    }
    
    function handlePropertyNameChange(event) {
        setPropertyName(event.target.value);
    }

    function handlePropertyValueChange(event) {
        setPropertyValue(event.target.value);
    }
    
    function handleCommentChange(event) {
        setCommentText(event.target.value);
    }

    function addComment() {
        setNewExpenseComments(comments => [...comments, {
            id: getId(),
            value: commentText
        }]);
        setCommentText("");
    }

    function getId() {
        return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`
    }

    function deleteProperty(property) { 
        setExistingProperties(properties => properties.filter(p => p != property.name));
        setNewExpenseProperties(properties => properties.filter(p => p.name !== property.name));
    }

    function deleteComment(comment) {
        setNewExpenseComments(comments => comments.filter(c => c.id !== comment.id));
    }

    function selectChooseOption() {
        setChooseFromExistingCategories(true);
    }

    function setCategory(categoryName) {
        setNewExpenseCategory(categoryName);
        setChooseFromExistingCategories(false);
    }
    
    function handleTagTextChange(event) {
        setTagText(event.target.value);
    }
    
    function addTag(tagName) {
        setNewExpenseTags(tags => [...tags, tagName]);
        setTagText("");
    }
    
    function deleteTag(tagName) {
        setNewExpenseTags(tags => tags.filter(t => t !== tagName));
    }
    
    return (
        <div className="new-expense-section">
                <div className="new-expense-data-section">
                    <button onClick={hideAddExpense} className="add-expense-cancel-btn">Cancel</button>

                  <input
                   className="expense-name-input" 
                   value={newExpenseName} 
                   onChange={(event) => handleNameInput(event)} 
                   type="text" 
                   placeholder="New Expense"/>  

                    <table className="add-new-expense-table">
                        <tbody>
                        <tr>
                            <td>Category</td>
                            <td>
                            {
                                chooseFromExistingCategories ?

                                categories.map((category, index) => 
                                    <button onClick={() => setCategory(category.name)} key={index}>{category.name}</button>
                                )
                                :
                                <input 
                                type="text" 
                                value={newExpenseCategory} 
                                onChange={(event) => handleCategoryChange(event)} 
                                placeholder="Empty"/>
                            }
                            
                             {
                                newExpenseCategory === "" 
                                && !chooseFromExistingCategories 
                                && categories.length > 0
                                && <button onClick={selectChooseOption}>Choose existing category</button>
                             }
                            </td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td><input 
                            type="number" 
                            value={newExpenseAmount} 
                            onChange={(event) => handleAmountChange(event)} 
                            placeholder="Empty"/></td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td><input 
                            type="datetime-local" 
                            value={newExpenseDate} 
                            onChange={(event) => handleDateChange(event)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><input 
                            type="text" 
                            value={newExpenseNotes} 
                            onChange={(event) => handleNotesChange(event)} 
                            placeholder="Empty"/></td>
                        </tr>
                        <tr>
                            <td>Created</td>
                            <td>{newExpenseCurrentDate}</td>
                        </tr>
                        {
                            newExpenseProperties.map((property, index) => 
                                <tr key={index}>
                                    <td>{property.name}</td>
                                    <td>{property.value}
                                        <button onClick={() => deleteProperty(property)} className="property-delete-btn">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    {
                        showAddProperty &&
                    <table>
                        <tbody>
                            <tr>

                             <td><input 
                                type="text" 
                                value={propertyName} 
                                onChange={(event) => handlePropertyNameChange(event)} 
                                placeholder="name"/></td>

                                <td><input 
                                type="text" 
                                value={propertyValue} 
                                onChange={(event) => handlePropertyValueChange(event)} 
                                placeholder="value"/></td>

                            </tr>
                        </tbody>
                    </table>
                    }
                    {
                        showAddProperty ?
                        <div>
                            <button onClick={cancelAddProperty} className="property-cancel-btn">Cancel</button>
                            
                            {
                                propertyName !== ""
                                && propertyValue !== ""
                                && <button onClick={confirmPropertyAddition}>Confirm</button>
                            }
                        </div>
                        :
                        <button className="add-property-btn" onClick={addProperty}>Add property</button>
                    }
                    <br />
                    <input
                     type="text" 
                     value={commentText} 
                     onChange={(event) => handleCommentChange(event)} 
                     placeholder="Add comment"/>
                     {
                        commentText !== "" &&
                        <>
                          <button onClick={addComment}>Add Comment</button>
                          <br />
                        </>
                     }
                     {
                        newExpenseComments.map((comment, index) => 
                         <div className="comment-container" key={index}>
                            <p className="comment-text">{comment.value}</p>  
                            <button onClick={() => deleteComment(comment)} className="comment-delete-btn">Delete</button> 
                         </div>
                        )
                     }
                     <br />
                     <input 
                     value={tagText}
                     onChange={(event) => handleTagTextChange(event)}
                     type="text" 
                     placeholder="add tag"/>
                     {
                        tagText !== "" && !newExpenseTags.some(t => t.trim() === tagText.trim()) &&
                        <button onClick={() => addTag(tagText.trim())}>Add tag</button>
                     }
                     <br />
                     {
                        tags.length !== 0 &&
                        <>
                        <p>Choose from existing tags:</p>
                        {
                            tags.map((tag, index) =>
                                <button disabled={newExpenseTags.includes(tag)} className="tag-btn" onClick={() => addTag(tag)} key={index}>{tag}</button>
                            )
                        }
                        </>
                     }
                     <br />
                     {
                        newExpenseTags.map((tag, index) =>
                            <div key={index} className="tag-container">
                                {tag}
                                <button onClick={() => deleteTag(tag)} className="tag-delete-btn">X</button>
                            </div>
                        )
                     }
                     <br />
                     {
                        newExpenseName !== ""
                        && newExpenseAmount !== ""
                        && newExpenseDate !== ""
                        && newExpenseNotes !== ""
                        && <button onClick={addExpense}>Add expense</button>
                     }
                </div>  
            </div>
    );
}

export default AddExpenseSection