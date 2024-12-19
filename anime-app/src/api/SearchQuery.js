import {pingQuery} from "./ApiSetup.js";

export default function SearchQuery(search) {
    const query = `
        query ($search: String) {
          Page {
            media(search: $search type: ANIME) {
              id
              title {
                english
                romaji
              }
              coverImage {
                large
                medium
            }
          }
          
          }
        }
    `;

    const variables = {
        search: search
    }

    return pingQuery(query, variables);
}