import { createContext, useContext, useReducer } from "react";

// 1. Create context
const TodoContext = createContext(null);

// 2. Reducer for todo actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.text, done: false },
      ];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

// 3. Provider
export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, text: "Learn Context API", done: true },
    { id: 2, text: "Build a small React app", done: false },
  ]);

  const addTodo = (text) => dispatch({ type: "ADD", text });
  const toggleTodo = (id) => dispatch({ type: "TOGGLE", id });
  const deleteTodo = (id) => dispatch({ type: "DELETE", id });
  const clearAll = () => dispatch({ type: "CLEAR" });

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, clearAll }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// 4. Custom hook
export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
};
