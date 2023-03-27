//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Contact from './components/Contact';
import Footer from './components/footer';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Home></Home>
    <About />
    <Service></Service>
    <Contact></Contact>
    <Footer></Footer>
    </>
  );
}

export default App;
