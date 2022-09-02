export const envConfig = {
    envName: "dev",
    mapBox: {
        baseUrl: "https://api.mapbox.com/geocoding/v5",
        apiKey: process.env.MAP_BOX_API_KEY
    },
    ipApi: {
        baseUrl: "http://ip-api.com/json"
    }
}