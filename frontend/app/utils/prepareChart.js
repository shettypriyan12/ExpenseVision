import { startOfMonth, subMonths, format, isSameMonth, startOfWeek, subWeeks, isWithinInterval, parseISO } from "date-fns";

export function prepareBarChartData(income, expense, mode = "monthly") {
    const now = new Date();

    if (mode === "monthly") {
        return Array.from({ length: 7 })
            .map((_, i) => {
                const monthDate = startOfMonth(subMonths(now, i));
                const monthLabel = format(monthDate, "MMM yyyy");

                const monthIncomes = income.filter((inc) =>
                    isSameMonth(new Date(inc.date), monthDate)
                );
                const monthExpenses = expense.filter((exp) =>
                    isSameMonth(new Date(exp.date), monthDate)
                );

                return {
                    name: monthLabel,
                    Income: monthIncomes.reduce((acc, cur) => acc + cur.amount, 0),
                    Expense: monthExpenses.reduce((acc, cur) => acc + cur.amount, 0),
                };
            })
            .reverse();
    }

    if (mode === "weekly") {
        return Array.from({ length: 6 })
            .map((_, i) => {
                const weekStart = startOfWeek(subWeeks(now, i + 1), { weekStartsOn: 1 });
                const weekEnd = subWeeks(weekStart, -1);
                const weekLabel = `${format(weekStart, "dd MMM")} - ${format(weekEnd, "dd MMM")}`;

                const weekIncomes = income.filter((inc) =>
                    isWithinInterval(new Date(inc.date), { start: weekStart, end: weekEnd })
                );
                const weekExpenses = expense.filter((exp) =>
                    isWithinInterval(new Date(exp.date), { start: weekStart, end: weekEnd })
                );

                return {
                    name: weekLabel,
                    Income: weekIncomes.reduce((acc, cur) => acc + cur.amount, 0),
                    Expense: weekExpenses.reduce((acc, cur) => acc + cur.amount, 0),
                };
            })
            .reverse();
    }

    return [];
}


export default function prepareLineChartData(income, expense) {
    const dataMap = {};

    // LineChart income
    income.forEach((i) => {
        const month = format(parseISO(i.date), "yyyy-MM"); // e.g. "2025-09"
        if (!dataMap[month]) dataMap[month] = { Income: 0, Expense: 0 };
        dataMap[month].Income += i.amount;
    });

    // LineChart expense
    expense.forEach((e) => {
        const month = format(parseISO(e.date), "yyyy-MM");
        if (!dataMap[month]) dataMap[month] = { Income: 0, Expense: 0 };
        dataMap[month].Expense += e.amount;
    });

    // Convert object to sorted array
    return Object.keys(dataMap)
        .sort()
        .map((month) => ({
            name: format(parseISO(month + "-01"), "MMM ''yy"), // e.g. "Sep '25"
            ...dataMap[month],
        }));
};


export function preparePieChartData(expenses) {
    const categoryTotals = expenses.reduce((acc, exp) => {
        if (!acc[exp.Category.name]) {
            acc[exp.Category.name] = 0;
        }
        acc[exp.Category.name] += exp.amount;
        return acc;
    }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
    }));
};