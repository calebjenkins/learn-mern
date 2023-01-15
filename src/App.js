import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <TodoList />
    </div>
  );
}

export default App;
