import {
    Coffee,
    ShoppingCart,
    Car,
    Film,
    ReceiptIndianRupee,
    HeartPulse,
    House,
    PlaneTakeoff,
    ShoppingBasket,
    Circle,
} from "lucide-react";
import { isToday, isYesterday, format } from "date-fns";


export function formatDate(date) {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM d"); // Example: Sep 13
};


export function normalizeCategory(name = "") {
    return name.toLowerCase().replace(/[\s&]+/g, "_");
}


export const categoryMap = {
    food_drinks: { icon: Coffee, color: "text-orange-500" },
    shopping: { icon: ShoppingCart, color: "text-purple-500" },
    transportation: { icon: Car, color: "text-blue-500" },
    entertainment: { icon: Film, color: "text-pink-500" },
    bills_utilities: { icon: ReceiptIndianRupee, color: "text-yellow-500" },
    health: { icon: HeartPulse, color: "text-red-500" },
    housing: { icon: House, color: "text-blue-300" },
    travel: { icon: PlaneTakeoff, color: "text-teal-500" },
    salary: { icon: ReceiptIndianRupee, color: "text-green-500" },
    groceries: { icon: ShoppingBasket, color: "text-green-500" },
    other: { icon: Circle, color: "text-gray-500" },
};
