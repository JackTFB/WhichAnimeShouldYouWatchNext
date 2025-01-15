import { pingQuery } from "./ApiSetup.js";

export default async function TagQuery(id) {

    const query = `
        query ($id: Int) {
          Media(id: $id) {
            id
            tags {
              id
              name
            }
          }
        }
    `;

    const variables = {
        id: id
    };


    var tags = await pingQuery(query, variables);

    var tagNames = tags.data.Media.tags.slice(0, 5).map(tag => tag.name);

    return ShowBasedOnTagsQuery(tagNames);








}

async function ShowBasedOnTagsQuery(tags) {
    const query = `
        query ($tag_in: [String]) {
          Page {
            media(tag_in: $tag_in) {
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
              }
            }
          }
        }
    `;

    const variables = {
        tag_in: tags
    };

    return await pingQuery(query, variables);
}