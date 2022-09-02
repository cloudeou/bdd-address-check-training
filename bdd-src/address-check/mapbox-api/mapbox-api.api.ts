import { axiosInstance } from '../axiosInstance';
import { envConfig } from '../../env-config';
import { MapboxPayloadGenerator } from './mapbox-api.payload-generator';

export class MapBoxClient {
    private _payloadGenerator: MapboxPayloadGenerator;
    constructor () {
        this._payloadGenerator = new MapboxPayloadGenerator();
    }

    public async getAddressGeocode(address: string): Promise<{lat: number, lon: number}> {
        try {
            console.log(`Geocoding address: ${address}`)
            const url = this._payloadGenerator.generateAddressTextGeocode(address, envConfig.mapBox.apiKey)
            const response = await axiosInstance({
                method: 'GET',
                url
            })
            const coordinates = {lat: response.data?.features?.[0].center?.[1], lon: response.data?.features?.[0].center?.[0]}
            console.log(`Got coordinates: ${coordinates.lat}:${coordinates.lon}`)
            return coordinates
        } catch (error) {
            console.log(error);
            const errorText = `Error while geocoding address text: ${address} \n ${JSON.stringify(error)}`
            console.log(errorText)
            throw new Error(errorText)
        }
    }
}