import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../../../axiosConfig";

export const UserContext = createContext({});

export const UserAuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [userLoading, setUserLoading] = useState(true);


    async function userFetchStatus() {
        try {
            setUserLoading(true);
            await instance.get("/user/checkUser", {
                withCredentials: true,
            });
            setIsUserAuthenticated(true);
        } catch (error) {
            console.log(error);
            setIsUserAuthenticated(false);
        } finally {
            setUserLoading(false);
        }
    }

    useEffect(() => {
        userFetchStatus();
    }, [])

    useEffect(() => {
        fetchTests()
    }, [])

    async function fetchTests() {
        try {
            const response = await instance.get("/user/issued-tests", { withCredentials: true })
            return response.data.tests
        }
        catch (error) {
            console.log(error);
        }
    }


    async function fetchQuestions(id) {
        const num = id.trim()
        try {
            const response = await instance.get(`/user/get-questions/ ` + num, { withCredentials: true });
            return response.data.questions.questions;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                isUserAuthenticated,
                userLoading,
                userFetchStatus,
                setIsUserAuthenticated,
                fetchTests,
                fetchQuestions
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export function useAuthUser() {
    return useContext(UserContext);
}

export default UserAuthProvider; 