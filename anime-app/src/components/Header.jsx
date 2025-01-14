// eslint-disable-next-line react/prop-types
export default function Header({ setActiveComponent }) {

    return (
    <header>
        <div className="navbar">
            <div className="navbar-logo">
                <img src="../../public/watson.png" alt="Watson"/>
            </div>
            <div className="navbar-items">
                <button onClick={() => setActiveComponent('home')}>Home</button>
                <button onClick={() => setActiveComponent('search')}>Search</button>
                <button onClick={() => setActiveComponent('about')}>About</button>

            </div>
        </div>

    </header>
    )
}