import { createContext, ReactNode, useState } from "react";

export const Context = createContext<any>(undefined)

interface Prop{
    children: ReactNode
}

const Store = ({children}:Prop)=>{

    const [cartData,setCartData]=useState([])

    return(
        <Context.Provider value={{cartData,setCartData}} >
            {children}
        </Context.Provider>
    )

}

export default Store