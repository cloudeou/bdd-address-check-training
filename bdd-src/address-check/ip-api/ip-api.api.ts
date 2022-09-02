import {axiosInstance} from '../axiosInstance';
import {envConfig} from '../../env-config';

export class IpApiClient {
    constructor() {}

    public async getIpGeocode(ipAddress: string): Promise<{lat:number,lon: number}> {
        try {
            console.log(`Geocoding ip address: ${ipAddress}`);
            const response: {[key: string]: any} = await axiosInstance({
                method: "GET",
                url: `${envConfig.ipApi.baseUrl}/${ipAddress}`
            });
            const coordinates = {lat: response.data?.lat, lon: response.data?.lon};
            console.log(`Got coordinates: ${coordinates.lat}:${coordinates.lon}`);
            return coordinates
        } catch (error) {
            console.log(error);
            const errorText = `Error while geocoding ip address: ${ipAddress} \n ${JSON.stringify(error)}`
            console.log(errorText)
            throw new Error(errorText)
        }
    }
}