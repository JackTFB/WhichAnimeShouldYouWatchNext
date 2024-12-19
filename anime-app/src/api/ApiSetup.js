export function pingQuery(query, variables) {
    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    return fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        return data;
    }

    function handleError(error) {
        console.error(error);
    }


}