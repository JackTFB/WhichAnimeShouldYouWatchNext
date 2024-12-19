import SearchBar from "./Search/SearchBar.jsx";
import SearchResults from "./Search/SearchResults.jsx";
import {useState} from "react";

export default function Search() {
    const [query, setQuery] = useState('');


    return (
        <div>
            <h1>Search</h1>
            <SearchBar setQuery = {setQuery} />
            <SearchResults query = { query }/>

        </div>
    )
}