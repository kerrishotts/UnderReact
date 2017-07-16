export async function getWeather(forLocation) {
    try {
        const yql = encodeURIComponent(
            `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${forLocation}")`
        );
        const r = await fetch(
            `https://query.yahooapis.com/v1/public/yql?q=${yql}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
        );
        if (r.ok) {
            const json = await r.json();
            return json.query.results;
        } else {
            throw new Error(`Response from service was ${r.status}`);
        }
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

export default getWeather;
