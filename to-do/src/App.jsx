import { useState } from 'react'
import { todoProvider } from './contexts'

function App() {
  const [todos, setTodos] = useState([])
  const addtodos = (todo)=>{
  setTodos ((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const editTodo = (id,todo) =>{
    setTodos ((prev)=>prev.map((prevtodo)=>(prevtodo.id === id? todo : prevtodo)))
  }

  const deleteTodo = (id)=>{
   setTodos ((prev)=> prev.filter((todo)=>todo.id !== id))
  }

  const completTodo = (id) =>{
    setTodos((prev)=>prev.map((todo)=>todo.id === id ?
     {...todo,completTodo:!completTodo}:todo))
  }

  return (
    <todoProvider value={{todos,addtodos,editTodo,deleteTodo,completTodo}}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                    </div>
                </div>
            </div>
    </todoProvider>
  )
}

export default App
