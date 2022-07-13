import './App.css';
import * as React from 'react';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        {/* <Home /> */}
        <Signup />
    </div>
  );
}

export default App;
