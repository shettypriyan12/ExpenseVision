import { startOfMonth, endOfMonth, subMonths, isWithinInterval, parseISO } from "date-fns";

export function getFinanceSummary(allIncomes, allExpenses) {
    const now = new Date();

    allIncomes = Array.isArray(allIncomes) ? allIncomes : [];
    allExpenses = Array.isArray(allExpenses) ? allExpenses : [];

    // this month
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    const currentIncome = allIncomes
        .filter(i => isWithinInterval(parseISO(i.date), { start: currentMonthStart, end: currentMonthEnd }))
        .reduce((sum, i) => sum + Number(i.amount), 0);

    const currentExpense = allExpenses
        .filter(e => isWithinInterval(parseISO(e.date), { start: currentMonthStart, end: currentMonthEnd }))
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const currentSavings = currentIncome - currentExpense;

    const last6Months = [];
    for (let i = 1; i <= 6; i++) {
        const monthDate = subMonths(now, i);
        const start = startOfMonth(monthDate);
        const end = endOfMonth(monthDate);

        const income = allIncomes
            .filter(i => isWithinInterval(parseISO(i.date), { start, end }))
            .reduce((sum, i) => sum + Number(i.amount), 0);

        const expense = allExpenses
            .filter(e => isWithinInterval(parseISO(e.date), { start, end }))
            .reduce((sum, e) => sum + Number(e.amount), 0);

        last6Months.push({
            month: start.toLocaleString("default", { month: "short", year: "numeric" }),
            income,
            expense,
            balance: income - expense,
        });
    }

    const totalBalance = last6Months.reduce((sum, m) => sum + m.balance, 0) + currentSavings;
    const last6Saving = last6Months.reduce((sum, m) => sum + m.balance, 0);
    const last6Income = last6Months.reduce((sum, i) => sum + i.income, 0);
    const last6Expense = last6Months.reduce((sum, e) => sum + e.expense, 0);

    return {
        currentMonth: { income: currentIncome, expense: currentExpense, savings: currentSavings },
        totalBalance,
        last6Months,
        last6Saving,
        last6Income,
        last6Expense,
    };
}

