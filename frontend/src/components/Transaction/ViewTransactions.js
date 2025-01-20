import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';

function ViewTransactions() {
    const { incomes, expenses, getIncomes, getExpenses, deleteIncome, deleteExpenses } = useGlobalContext();

    // Fetch incomes and expenses when the component mounts
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className='transactions-content'>
                    
                    {/* Incomes Section */}
                    <div className='transactions-section'>
                        <h2>Incomes</h2>
                        <div className='transactions'>
                            {incomes.map((income) => {
                                const { _id, title, amount, date, category, description } = income;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        category={category}
                                        date={date}
                                        indicatorColor="var(--color-green)" // Color for incomes
                                        deleteItem={() => deleteIncome(_id).then(() => getIncomes())} // Re-fetch incomes after deletion
                                        type="income" // Set type to "income" for icon and color
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Expenses Section */}
                    <div className='transactions-section'>
                        <h2>Expenses</h2>
                        <div className='transactions'>
                            {expenses.map((expense) => {
                                const { _id, title, amount, date, category, description } = expense;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        category={category}
                                        date={date}
                                        indicatorColor="var(--color-red)" // Color for expenses
                                        deleteItem={() => deleteExpenses(_id).then(() => getExpenses())} // Re-fetch expenses after deletion
                                        type="expense" // Set type to "expense" for icon and color
                                    />
                                );
                            })}
                        </div>
                    </div>

                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    display: flex;
    overflow: auto;
    padding: 2rem;

    .transactions-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .transactions-section {
            background: #f5f5f5;
            padding: 1.5rem;
            border-radius: 15px;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            
            h2 {
                font-size: 1.5rem;
                color: #333;
                margin-bottom: 1rem;
                border-bottom: 2px solid var(--color-green);
                padding-bottom: 0.5rem;
            }

            .transactions {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    }
`;

export default ViewTransactions