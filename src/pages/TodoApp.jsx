import { useState } from "react";
import { useTodos } from "@/context/TodoContext.jsx";
import { Check, Trash2, Plus, ListTodo } from "lucide-react";

const AddForm = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    addTodo(v);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
      />
      <button
        type="submit"
        className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        <Plus className="h-4 w-4" /> Add
      </button>
    </form>
  );
};

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  return (
    <li className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex h-6 w-6 items-center justify-center rounded-md border ${
          todo.done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input"
        }`}
        aria-label="Toggle"
      >
        {todo.done && <Check className="h-4 w-4" />}
      </button>
      <span
        className={`flex-1 text-sm ${
          todo.done ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="rounded-md p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
};

const TodoStats = () => {
  const { todos, clearAll } = useTodos();
  const remaining = todos.filter((t) => !t.done).length;
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>
        {remaining} of {todos.length} remaining
      </span>
      {todos.length > 0 && (
        <button
          onClick={clearAll}
          className="rounded-md px-2 py-1 hover:bg-secondary hover:text-foreground"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

const TodoApp = () => {
  const { todos } = useTodos();
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container max-w-xl">
        <header className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-glow">
            <ListTodo className="h-5 w-5 text-primary-foreground" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">Context Todo</h1>
            <p className="text-sm text-muted-foreground">
              A small React app powered by the Context API.
            </p>
          </div>
        </header>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <AddForm />
          <ul className="space-y-2">
            {todos.length === 0 ? (
              <li className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                No todos yet. Add one above ✨
              </li>
            ) : (
              todos.map((t) => <TodoItem key={t.id} todo={t} />)
            )}
          </ul>
          <TodoStats />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
