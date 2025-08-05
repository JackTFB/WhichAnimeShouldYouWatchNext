import { pingQuery } from "./ApiSetup.js";
import { rankAnimeByTags } from "./TagRanking.js";

export default async function TagQuery(id) {

    const query = `
        query ($id: Int) {
          Media(id: $id) {
            id
            title {
              english
              romaji
            }
            tags {
              id
              name
              rank
            }
            genres
            relations {
              edges {
                relationType
                node { id }
              }
            }
          }
        }
    `;

    const variables = { id: id };
    const response = await pingQuery(query, variables);

  if (!response || !response.data || !response.data.Media) {
    throw new Error('Failed to fetch source anime data');
  }

    const sourceAnime = response.data.Media;


    for (const genre of sourceAnime.genres) {
      const candidates = await getShowsByGenre(genre, sourceAnime);

      if (candidates.length >= 10) {
        return {
          recommendations: candidates.slice(0, 10),
          genre: genre,
          totalCandidates: candidates.length,
          sourceAnime: {
            id: sourceAnime.id,
            title: sourceAnime.title,
            tags: sourceAnime.tags,
            genres: sourceAnime.genres
          }
        };
      }
    }

    const allCandidates = await getCombinedGenreResults(sourceAnime);

    return {
      recommendations: allCandidates.slice(0, 10),
      genre: "Multiple genres",
      totalCandidates: allCandidates.length,
      sourceAnime: {
        id: sourceAnime.id,
        title: sourceAnime.title,
        tags: sourceAnime.tags,
        genres: sourceAnime.genres
      }
    };
}

async function getShowsByGenre(genre, sourceAnime) {
  const query = `
      query ($genre_in: [String], $perPage: Int) {
        Page(perPage: $perPage) {
          media(genre_in: $genre_in, type: ANIME, sort: POPULARITY_DESC) {
            id
            siteUrl
            title {
              english
              romaji
            }
            coverImage {
              medium
              large
            }
            tags {
              name
              id
              rank
            }
            genres
            relations {
              edges {
                relationType
                node { id }
              }
            }
            meanScore
            popularity
          }
        }
      }
    `;

    const variables = {
      genre_in: [genre],
      perPage: 50
    };

    const response = await pingQuery(query, variables);

    if (!response || !response.data || !response.data.Page) {
      console.error(`Failed to fetch shows for genre: ${genre}`);
      return [];
    }

    console.log(`Found ${response.data.Page.media.length} shows for genre: ${genre}`);

    const candidateAnimes = response.data.Page.media.filter(anime =>
      !isSequel(anime, sourceAnime) && anime.id !== sourceAnime.id
    );

    console.log(`After filtering sequels: ${candidateAnimes.length} candidates`);

    const rankedAnimes = rankAnimeByTags(sourceAnime, candidateAnimes);

    console.log(`After ranking: ${rankedAnimes.length} ranked anime`);

    const filteredResults = rankedAnimes.filter(anime => anime.similarityScore > 1);

    console.log(`After similarity filtering (>1): ${filteredResults.length} results`);

    return filteredResults;
}

async function getCombinedGenreResults(sourceAnime) {
  const allCandidates = [];

  for (const genre of sourceAnime.genres) {
    const genreCandidates = await getShowsByGenre(genre, sourceAnime);
    allCandidates.push(...genreCandidates);
  }

  const uniqueCandidates = allCandidates.filter((anime, index, self) => 
    index === self.findIndex(a => a.id === anime.id)
  );

  return uniqueCandidates
    .sort((a, b) => b.similarityScore - a.similarityScore);
}

function isSequel(anime, sourceAnime) {
  if (anime.id === sourceAnime.id) return true;

  return anime.relations.edges.some(edge =>
    edge.node.id === sourceAnime.id &&
    ['SEQUEL', 'PREQUEL', 'SIDE_STORY', 'ALTERNATIVE', 'PARENT', 'SUMMARY'].includes(edge.relationType)
  );
}

