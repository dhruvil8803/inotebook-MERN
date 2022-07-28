import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Home from './components/Home.js';
import Alert from './components/Alert.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Notestate from './contextApi/Notestate.js'
function App() {
  return (
    <Router>
        <Notestate>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    </Notestate>
      </Router>
  );
}

export default App;
