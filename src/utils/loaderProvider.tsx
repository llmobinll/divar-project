"use client"

import { createContext, useState } from "react";

import { LoaderContextType, LoaderProviderProps, LoaderState } from "./types";


export const LoaderContext = createContext<LoaderContextType>({loaders:{} , setLoader:()=>{}})

export const LoaderProvider:React.FC<LoaderProviderProps> = ({children}) => {

    const [loaders , setLoaders] = useState<LoaderState>({})

    const setLoader = (key:string , value:boolean) => {
        setLoaders((prev)=>({
            ...prev , [key]:value
        }))
    }
    return <LoaderContext.Provider value={{loaders , setLoader}}>{children}</LoaderContext.Provider>;
  };