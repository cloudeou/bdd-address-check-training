export class MapboxPayloadGenerator {
    constructor () {}

    public generateAddressTextGeocode(address: string, accessToken: string): string {
        return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${accessToken}`
    }
}