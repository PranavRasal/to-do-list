import React, { useState } from 'react'
import { useTodo } from '../../contexts';

function TodoForm() {
    const [todo, settodo] = useState("")
    const {addtodos} = useTodo()
    
    const add = (e) => {
        e.preventDefault()
        if(!todo.trim()) return 
        addtodos({todo: todo.trim(), completed: false})
        settodo("")
    }
    
    return (
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Enter a new task..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white text-slate-800 placeholder-slate-500"
                    value={todo}
                    onChange={e => settodo(e.target.value)}
                />
            </div>
            <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={!todo.trim()}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Task</span>
            </button>
        </form>
    );
}

export default TodoForm;

