import { register, login, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true);
            const data = await register(username, email, password);
            setUser(data.user);
            return data;
        } catch (err) {
            console.log("Error registering user:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (username, email, password) => {
        try {
            setLoading(true);
            const data = await login(username, email, password);
            setUser(data.user);
            return data;
        } catch (err) {
            console.log("Error logging in user:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            setUser(data.user);
            return data;
        } catch (err) {
            console.log("Error fetching user:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (err) {
            console.log("Error logging out user:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetMe();
    }, []);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }
}