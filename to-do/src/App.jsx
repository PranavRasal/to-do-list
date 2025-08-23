import { useState , useEffect } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './assets/component/todoForm'
import TodoItems from './assets/component/TodoItems'


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

  const completeTodo = (id) =>{
    setTodos((prev)=>prev.map((todo)=>todo.id === id ?
     {...todo,completed:!todo.completed}:todo))
  }
 
  useEffect (()=>{
  const todos = JSON.parse(localStorage.getItem("todos"))
  if(todos && todos.length>0){
  setTodos(todos)
  }
  },[])

  useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))

  },[todos])

  return (
    <TodoProvider value={{todos,addtodos,editTodo,deleteTodo,completeTodo}}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-800">TaskFlow Pro</h1>
              </div>
              <div className="text-sm text-slate-500">
                {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Form Section */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Task</h2>
              <TodoForm />
            </div>
            
            {/* Tasks Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Your Tasks</h2>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span>{todos.filter(todo => !todo.completed).length} pending</span>
                  <span>{todos.filter(todo => todo.completed).length} completed</span>
                </div>
              </div>
              
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No tasks yet</h3>
                  <p className="text-slate-500">Add your first task to get started with productivity!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div key={todo.id} className="w-full">
                      <TodoItems todo={todo} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>© 2025 TaskFlow Pro - Professional Task Management</p>
          </div>
        </main>
      </div>
    </TodoProvider>
  )
}

export default App
