
export default async function fetchApi({
    endpoint,
    query = {},
    wrappedByKey = null,
    wrappedByList = false
}) {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    try {
        const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

        // ---- use this for complex queries ----
        // if (query) {
        //     Object.entries(query).forEach(([key, value]) => {
        //         url.searchParams.append(key, value);
        //     });
        // }

        const queryParams = new URLSearchParams(query);
        url.search = queryParams.toString();

        const res = await fetch(url.toString());

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        let data = await res.json();

        if (wrappedByKey) {
            data = data[wrappedByKey];
        }

        if (wrappedByList && Array.isArray(data)) {
            data = data[0];
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch data');
    }
}