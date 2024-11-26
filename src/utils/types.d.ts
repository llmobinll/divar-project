export interface LoaderState {
    [key:string]:boolean
}


export interface LoaderContextType {
    loaders:LoaderState
    setLoader:(key:string , value:boolean)=> void
}

export interface LoaderProviderProps {
    children:ReactNode
}