import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decoded.exp < currentTime; 
    } catch (err) {
        return false;
    }
};

