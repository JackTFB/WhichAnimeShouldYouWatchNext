import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import TagQuery from "../../../api/TagQuery.js";

export default function SearchResults({ query }) {


    const [shows, setShows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await TagQuery(query.id);
                console.log(data);
                var fetchedShows = data.data.Page.media.map(media => ({
                    siteUrl: media.siteUrl,
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
            <div className="test-grid">
                <ul>
                    {shows.map((item, index) => (
                        <li key={index}>
                            <a href={item.siteUrl} target="_blank">
                                <img src={item.coverImage} alt={item.title}/>
                                <p>{item.id}</p>
                                <p>{item.title}</p>
                            </a>
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