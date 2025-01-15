export default function Home() {

    const images = [];

    for (let i = 1; i < 11; i++) (
        images[i] = "/animeCovers/anime" + i + ".jpg"
    )

    return (
        <main>
            <h1>What should I watch?</h1>
            <p>This is an app designed to help you decide which anime to watch next!</p>
            <div className="marquee-container">
                <div className="marquee-content">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="Anime cover" height="300"/>)
                    )
                    }
                </div>
            </div>
        </main>
    )
}