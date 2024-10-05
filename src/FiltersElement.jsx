function FiltersElement({searchExpensesText, handleSearchExpensesTextChange, filteredCategories, clearFilteredCategories,
    categories, editFilteredCategory, minimalFilterAmount, maximalFilterAmount, handleMinimalAmountFilterChange,
    handleMaximalAmountFilterChange, tags, selectedTags, setSelectedTags
}) {

    function modifySelectedTags(tagName) {
        if(selectedTags.some(t => t === tagName)) {
           setSelectedTags(tags => tags.filter(t => t !== tagName)); 
        } else {
            setSelectedTags(tags => [...tags, tagName]);
        }
    }
    
    return (
        <>
          <input 
                className="name-filter-input" 
                value={searchExpensesText}
                onChange={(event) => handleSearchExpensesTextChange(event)}
                type="text" 
                placeholder="Enter exspense name"/>

                    <button 
                    className={filteredCategories.length === 0 ? "selected-category-filter" : "category-filter"} 
                    onClick={clearFilteredCategories}>All</button>
                {
                    (categories.length > 1) && 
                    categories.map((category, index) => 
                        <button 
                    className={filteredCategories.includes(category) ? "selected-category-filter" : "category-filter"}
                    onClick={() => editFilteredCategory(category)} key={index}>{category.name}</button>
                    )
                }
                 <p className="amount-filter-paragraph">Amount: </p>
                 <input 
                    className="amount-input"
                    value={minimalFilterAmount} 
                    onChange={(event) => handleMinimalAmountFilterChange(event)}
                    type="number" 
                    placeholder="Minimal amount"
                    />
    
                    <input 
                    className="amount-input" 
                    value={maximalFilterAmount}
                    onChange={(event) => handleMaximalAmountFilterChange(event)}
                    type="number" 
                    placeholder="Maximal amount"
                    />
                    {
                        tags.map((tag, index) => 
                            <button 
                                onClick={() => modifySelectedTags(tag)} 
                                key={index} 
                                className={selectedTags.includes(tag) ? "selected-tag-container" : "tag-container"}>{tag}
                            </button>
                        )
                    }
        </>
    );
}

export default FiltersElement