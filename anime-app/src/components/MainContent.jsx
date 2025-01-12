import Home from "./MainContent/Home.jsx";
import Search from "./MainContent/Search.jsx";
import About from "./MainContent/About.jsx";

// eslint-disable-next-line react/prop-types
export default function MainContent({ activeComponent }) {
      return (
        <div>
            {activeComponent === 'home' && <Home />}
            {activeComponent === 'search' && <Search />}
            {activeComponent === 'test' && <Test />}
            {activeComponent === 'about' && <About />}
        </div>
      )

}