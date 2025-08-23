import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos:[{
    id : 1,
    todo : "",
    completed : false,
}],
addtodos:(todo)=>{},
deleteTodo:(id)=>{},
editTodo:(id,todo)=>{},
completTodo:(id)=>{}

});

export const useTodo = ()=>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider