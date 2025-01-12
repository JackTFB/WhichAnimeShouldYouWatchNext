import {useEffect, useState, useRef} from "react";
import searchQuery from "../../../api/searchQuery";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ setQuery }) {

    const [inputValue, setInputValue] = useState('');
    const [buttonValue, setButtonValue] = useState('');

    const [shows, setShows] = useState([]);
    const searchbarRef = useRef(null);

    // Updates the state of the input field on change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);// Update the local state
    };

    const handleButtonClick = () => {
        setButtonValue(inputValue);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setButtonValue(inputValue);
        }
    }

    function handleSearchItemClick(item) {
        setQuery(item);
        setShows([]);
    }

        useEffect(() => {
            async function fetchData() {
                if (buttonValue) {
                    try {
                        const data = await searchQuery(buttonValue);
                        const fetchedShows = data.data.Page.media.map(media => ({
                            title: media.title.english ? media.title.english : media.title.romaji,
                            id: media.id,
                        }));
                        setShows(fetchedShows);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }

            fetchData();
        }, [buttonValue]);

        useEffect(() => {
            function handleClickOutside(event) {
                if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
                    setShows([]);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);


        return (
            <div className="searchbar" ref={searchbarRef}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleInputChange} // Update local state on input change
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleButtonClick}>Search</button>

                {shows.length > 0 && (
                    <div className="searchbar-dropdown">
                        <ul>
                            {shows.map((item, index) => (
                                <li key={index}>
                                    <button onClick={() => handleSearchItemClick(item)}>{item.title}</button>
                                </li>
                            ))}
                        </ul>
                    </div>)}


            </div>
        )
}