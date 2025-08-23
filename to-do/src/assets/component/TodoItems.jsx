import React, { useState } from 'react'
import { useTodo } from '../../contexts';

function TodoItems({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {deleteTodo, editTodo, completeTodo} = useTodo()
    
    const editTodos = () => {
        if (todoMsg.trim()) {
            editTodo(todo.id, {...todo, todo: todoMsg.trim()})
            setIsTodoEditable(false)
        }
    }
    
    const toggleCompleted = () => {
        completeTodo(todo.id)
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            editTodos()
        } else if (e.key === 'Escape') {
            setTodoMsg(todo.todo)
            setIsTodoEditable(false)
        }
    }
    
    return (
        <div className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
            todo.completed 
                ? "bg-green-50 border-green-200 opacity-75" 
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
        }`}>
            {/* Checkbox */}
            <div className="flex-shrink-0">
                <button
                    onClick={toggleCompleted}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                            ? "bg-green-500 border-green-500"
                            : "border-slate-300 hover:border-green-400"
                    }`}
                >
                    {todo.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>
            
            {/* Task Content */}
            <div className="flex-1 min-w-0">
                {isTodoEditable ? (
                    <input
                        type="text"
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        onBlur={editTodos}
                        onKeyDown={handleKeyPress}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-800"
                        autoFocus
                    />
                ) : (
                    <p className={`text-sm font-medium transition-all duration-200 ${
                        todo.completed 
                            ? "text-slate-500 line-through" 
                            : "text-slate-800"
                    }`}>
                        {todo.todo}
                    </p>
                )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!todo.completed && (
                    <button
                        onClick={() => {
                            if (isTodoEditable) {
                                editTodos();
                            } else {
                                setIsTodoEditable(true);
                            }
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                        title={isTodoEditable ? "Save" : "Edit"}
                    >
                        {isTodoEditable ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        )}
                    </button>
                )}
                
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    title="Delete"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoItems;
