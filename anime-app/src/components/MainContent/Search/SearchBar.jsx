import {useState} from "react";

export default function SearchBar({ setQuery }) {

    const [inputValue, setInputValue] = useState('');

    // Updates the state of the input field on change
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the local state
    };

    // Updates the state of the parent component on click
    const handleButtonClick = () => {
        setQuery(inputValue); // Update the parent state when the button is clicked
    };


    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange} // Update local state on input change
            />
            <button onClick={handleButtonClick}>Search</button> {/* Update parent state */}
        </div>
    )
}