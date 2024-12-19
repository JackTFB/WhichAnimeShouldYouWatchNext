import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TagQuery from "../../../api/TagQuery.js";

export default function SearchResults({ query }) {


    const [shows, setShows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await TagQuery(query.id);
                var fetchedShows = data.data.Page.media.map(media => ({
                    title: media.title.english ? media.title.english : media.title.romaji,
                    coverImage: media.coverImage.large ? media.coverImage.large : media.coverImage.medium
                }));
                setShows(fetchedShows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [query]);


    return (
        <div>
            <p>You searched for: {query.title}</p>
            <p>{query.id}</p>
            <div className="test-grid">
                <ul>
                    {shows.map((item, index) => (
                        <li key={index}>
                            <img src={item.coverImage} alt={item.title}/>
                            <p>{item.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

SearchResults.propTypes = {
    query: PropTypes.object.isRequired
}