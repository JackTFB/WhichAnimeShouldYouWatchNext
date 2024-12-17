import './App.css'
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import {useState} from "react";

function App() {

    //Handles which page to show on the MainContent component
    const [activeComponent, setActiveComponent] = useState('home');

  return (
    <>
        <Header setActiveComponent={setActiveComponent}/>
        <MainContent activeComponent={activeComponent}/>
        <Footer />
    </>
  )
}

export default App


