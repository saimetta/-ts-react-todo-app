import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

//References an existing type
type FormElement = React.FormEvent<HTMLFormElement>;
//Defines a new type
interface ITodo {
    text: string,
    complete: boolean
};

export default function App(): JSX.Element {
    //Using a generic type, this is for functions 
    const [value, setValue] = useState<string>('');
    //Using a generic type for an array of ITodo objects
    const [todos, setTodos] = useState<ITodo[]>([]);
    
    const handleSubmit = (e: FormElement):void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    };

    const addTodo = (text: string): void => {
        const newTodo: ITodo[] = [...todos, { text, complete: false }];
        setTodos(newTodo);
    };

    const completeTodo = (index: number): void => {
        const newTodos: ITodo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
    };

    const moveUp = (index: number): void => {
        if (index === 0) return;
        const newTodos: ITodo[] = [...todos];
        const tmp: ITodo = newTodos[index];
        newTodos[index] = newTodos[index - 1];
        newTodos[index - 1] = tmp;
        setTodos(newTodos);
    };

    const moveDown = (index: number): void => {
        if (index === todos.length - 1) return;
        const newTodos: ITodo[] = [...todos];
        const tmp: ITodo = newTodos[index];
        newTodos[index] = newTodos[index + 1];
        newTodos[index + 1] = tmp;
        setTodos(newTodos);
    };

    const removeTodo = (index: number): void => {    
        const newTodos: ITodo[] = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
         <Fragment>
            <div className="ui container">
                <h1>Todo list</h1>
                <form
                    className="ui form"
                    onSubmit={ handleSubmit}
                >
                    <div className="two fields">
                        <div className="field">
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required
                        />
                        </div>
                        <div className="field">
                            <button
                                className="ui button primary"
                                type="submit"
                                >Add todo
                            </button>
                        </div>
                    </div>
                </form>
                <div className="ui very relaxed list">
                    {todos.map((todo: ITodo, index: number) => {
                        return (
                            <div
                                className="item"
                                key={index}
                            >
                                <div className="content">
                                    <div className="header"
                                        style={{
                                            marginBottom: '5px'
                                        }}>
                                        <span style={{
                                            textDecoration: todo.complete ? 'line-through' : '',
                                            fontSize: '20px'
                                        }}>
                                            {todo.text}
                                        </span>
                                    </div>
                                    <div className="description">
                                        <button
                                            className={`ui icon button ${todo.complete ? 'positive' : ''}`}
                                            onClick={() => { completeTodo(index) }}
                                        >
                                            <i className={`ui icon ${todo.complete ? 'check' : 'square'}`}></i>
                                        </button>
                                        { index !== 0 ? 
                                            <button
                                                className="ui icon button"
                                                onClick={() => { moveUp(index) }}
                                            >
                                                <i className="arrow up icon"></i>
                                            </button> : ''
                                        }
                                        { index !== todos.length - 1 ? 
                                            <button
                                                className="ui icon button"
                                                onClick={() => { moveDown(index) }}
                                            >
                                                <i className="arrow down icon"></i>
                                            </button> : ''
                                        }
                                        <button
                                                className="ui icon button"
                                                onClick={() => { removeTodo(index) }}
                                        >
                                            <i className="trash icon"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
         </Fragment>

    );
}

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);