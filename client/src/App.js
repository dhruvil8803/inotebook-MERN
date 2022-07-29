import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Notestate from './contextApi/Notestate.js'
function App() {
  return (
    <Router>
        <Notestate>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
    </Notestate>
      </Router>
  );
}

export default App;
