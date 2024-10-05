function StatisticsSectionElement({categories, expenses}) {
    return(
        <div className="statistics-section">
        <p>Total expenses: {categories.reduce((total, category) => total += category.amount, 0)}</p>
        <p>Lowest expense: { expenses.length > 0 ? Math.min(...expenses.map(expense => expense.amount)) : 0}</p>
        <p>Highest expense: {expenses.length > 0 ? Math.max(...expenses.map(expense => expense.amount)) : 0}</p>
    </div>
    );
}

export default StatisticsSectionElement