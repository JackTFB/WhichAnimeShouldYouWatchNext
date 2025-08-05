export function calculateTagSimilarity(sourceTags, targetTags) {
    if (!sourceTags.length || !targetTags.length) return 0;

    let totalScore = 0;
    let maxPossibleScore = 0;

    sourceTags.forEach(sourceTag => {
        maxPossibleScore += getTagWeight(sourceTag.rank);
    });

    sourceTags.forEach(sourceTag => {
        const matchingTag = targetTags.find(targetTag =>
            targetTag.name.toLowerCase() === sourceTag.name.toLowerCase()
        );

        if (matchingTag) {
            const sourceWeight = getTagWeight(sourceTag.rank);
            const targetWeight = getTagWeight(matchingTag.rank);

            const combinedWeight = (sourceWeight * 0.7) + (targetWeight * 0.3);
            totalScore += combinedWeight;
        }
    });

    return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
}

export function getTagWeight(rank) {
    if (!rank || rank <= 0) return 1;
    if (rank >= 80) return 10;
    if (rank >= 60) return 7;
    if (rank >= 40) return 5;
    if (rank >= 20) return 3;
    return 1;
}

export function rankAnimeByTags(sourceAnime, candidateAnimes) {
    const sourceTags = sourceAnime.tags || [];

    return candidateAnimes
        .map(anime => ({
            ...anime,
            similarityScore: calculateTagSimilarity(sourceTags, anime.tags || []),
            matchingTags: getMatchingTags(sourceTags, anime.tags || [])
        }))
        .filter(anime => anime.similarityScore > 0)
        .sort((a, b) => b.similarityScore - a.similarityScore);
}

function getMatchingTags(sourceTags, targetTags) {
    const matches = [];

    sourceTags.forEach(sourceTag => {
        const match = targetTags.find(targetTag =>
            targetTag.name.toLowerCase() === sourceTag.name.toLowerCase()
        );

        if (match) {
            matches.push({
                name: sourceTag.name,
                sourceRank: sourceTag.rank,
                targetRank: match.rank,
                weight: getTagWeight(sourceTag.rank)
            });
        }
    });

    return matches.sort((a, b) => b.weight - a.weight);
}