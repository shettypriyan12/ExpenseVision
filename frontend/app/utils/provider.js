'use client'

import { Provider, useDispatch } from "react-redux";
import { hydrateFromStorage } from "../store/auth/auth-slice";
import store from "../store/store";
import { useEffect } from "react";

export default function Providers({ children }) {

    function HydrateAuth(){

        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(hydrateFromStorage());
        }, [dispatch]);

        return null;
    }
    return (
        <>
            <Provider store={store}>

                <HydrateAuth />
                {children}

            </Provider>
        </>
    );
}