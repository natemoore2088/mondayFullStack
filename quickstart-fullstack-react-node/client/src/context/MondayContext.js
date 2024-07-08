import React, { createContext, useState, useEffect } from 'react';
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export const MondayContext = createContext();

export const MondayProvider = ({ children }) => {
    const [context, setContext] = useState(null);

    useEffect(() => {
        monday.listen("context", (res) => {
            setContext(res.data);
        });
    }, []);

    return (
        <MondayContext.Provider value={{ boardId: context?.boardId }}>
            {children}
        </MondayContext.Provider>
    );
};