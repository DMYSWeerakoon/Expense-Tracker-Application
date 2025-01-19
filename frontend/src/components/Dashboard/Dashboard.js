import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    {/* Chart and Summary Section */}
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    LKR {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    LKR {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    LKR {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent History Section */}
                    <div className="history-con">
                        <History />
                        <div className="recent-history">
                            <h2>Recent History</h2>
                            <ul>
                                {expenses.slice(0, 3).map((expense, index) => (
                                    <li key={index} className={expense.amount < 0 ? 'expense-item' : 'income-item'}>
                                        <span>{expense.title}</span>
                                        <span>{expense.amount < 0 ? '-' : '+'}LKR {Math.abs(expense.amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Salary Min/Max Section */}
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>LKR {Math.min(...incomes.map(item => item.amount))}</p>
                            <p>LKR {Math.max(...incomes.map(item => item.amount))}</p>
                        </div>

                        {/* Expense Min/Max Section */}
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>LKR {Math.min(...expenses.map(item => item.amount))}</p>
                            <p>LKR {Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* Defines the layout for the stats */
        gap: 1.5rem; /* Reduce spacing between sections */
        margin-top: 1.5rem; /* Reduced spacing at the top */
        
        .chart-con {
            grid-column: 1 / 4;
            height: 300px; /* Reduce height to eliminate extra space */
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .amount-con {
                display: flex;
                justify-content: space-between;
                gap: 1.5rem; /* Reduce spacing between the cards */
                margin-top: 1rem; /* Reduce top margin */

                .income, .expense, .balance {
                    flex: 1;
                    padding: 0.8rem; /* Reduced padding for tighter design */
                    border-radius: 12px; /* Smaller radius for corners */
                    text-align: center;
                    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08); /* Lighter shadow */
                    background: #FCF6F9;

                    h2 {
                        margin-bottom: 0.4rem;
                        font-size: 1.1rem; /* Smaller font size */
                    }

                    p {
                        font-size: 1.8rem; /* Adjust font size */
                        font-weight: bold;
                    }
                }

                .balance {
                    color: var(--color-green);
                    font-size: 2.2rem; /* Slightly smaller for balance text */
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;
            display: flex;
            flex-direction: column;
            gap: 0.8rem; /* Reduce spacing between history items */

            .salary-title {
                font-size: 1.1rem; /* Smaller font for titles */
                margin: 0.4rem 0;
                span {
                    font-size: 1.4rem; /* Reduce span size */
                    font-weight: bold;
                }
            }

            .salary-item {
                display: flex;
                justify-content: space-between;
                align-items: center; /* Vertically center text */
                padding: 0.6rem 1rem; /* Reduce padding */
                background: #FCF6F9;
                border-radius: 12px; /* Consistent radius */
                box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08); /* Match shadow */
                
                p {
                    font-size: 1.4rem; /* Adjust font size */
                    font-weight: 600;
                }
            }
        }
    }
`;

export default Dashboard;
