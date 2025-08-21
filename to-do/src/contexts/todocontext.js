import { createContext,useContext } from "react";

export const todoContext = createContext({
    todos:[{
    id : 1,
    todo : "use to-do",
    completed : false,
}],
addtodos:(todo)=>{},
deleteTodo:(id)=>{},
editTodo:(id,todo)=>{},
completTodo:(id)=>{}

});

export const useTodo = ()=>{
    return useContext(todoContext)
}

export const todoProvider = todoContext.Provider