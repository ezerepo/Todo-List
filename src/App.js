import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
    const [todos, setTodos] = useState([]);
    const [mademade, setMademade] = useState([]);
    
    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        const storedMademade = JSON.parse(localStorage.getItem('mademade'));
        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos)   
            setMademade(storedMademade)
        }
        if (storedTodos && storedTodos.length > 1) {
            setMademade(1)
        }
        if (storedTodos && (storedTodos.length < 1)) {
            setMademade(-1)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        localStorage.setItem('mademade', JSON.stringify(mademade))
    },   [todos , mademade])

   
    function addTodo(text) {
        setTodos([...todos,text]);
    }

    function removeTodo(index) {
        setTodos(todos.filter((todo,i) => i !== index));
    }

    function editTodo(index, text) {
        const newTodos = [...todos];
        newTodos[index] = text;
        setTodos(newTodos)
    }

    function clearTodo() {
        setTodos(([]))
    }



    return (
    <>
            <h1>Todo App</h1>
            <div>
                
                {mademade > 0 && <button
                    onClick={() => {
                        clearTodo()
                        setMademade(-1)
                    }
                    }> Clear All Items </button>
                }
            </div>
            <form name='form'
                onSubmit={(event) => {
                    event.preventDefault();
                    setMademade(mademade+1);
                    addTodo(event.target.elements.todo.value)
                    event.target.elements.todo.value = ''
                } }>
                <label>Enter your errand:
                    <input type="text" name="todo"/>
                </label>
                <button type="submit">Add to To Do List </button>
            </form>
            <ul>{todos.map((todo, index) => (  
                <li key={index}>
                    <input type="text" value={todo} onChange={(event) => editTodo(index, event.target.value)} />
                    <button
                        onClick={() => {
                            removeTodo(index)
                            setMademade(mademade-1);
                        }
                        }> Remove Item </button>
                    
                    
                    
                </li>
                ))}


            </ul>
         
    </>
  );
} 

export default App;
