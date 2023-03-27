//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Contact from './components/Contact';
import Footer from './components/footer';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';


function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/service" component={Service}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
    </Switch>
    <Footer/>
    </>
  );
}

export default App;
