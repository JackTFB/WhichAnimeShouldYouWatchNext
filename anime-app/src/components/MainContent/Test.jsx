import { useState, useEffect } from 'react';
import TagQuery from "../../api/TagQuery.js";

export default function Test() {
    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await TagQuery(15125);
                var fetchedMediaItems = data.data.Page.media.map(media => ({
                    name: media.title.english ? media.title.english : media.title.romaji,
                    coverImage: media.coverImage.large ? media.coverImage.large : media.coverImage.medium
                }));
                setMediaItems(fetchedMediaItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);





    return (
        <div className="test-grid">
            <h1>Test</h1>
            <p>This is a test component for testing API requests</p>

            <h2>Test</h2>
            <ul>
                {mediaItems.map((item, index) => (
                    <li key={index}>
                        <img src={item.coverImage} alt={item.name}/>
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}