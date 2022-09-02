import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import { IpApiClient } from '../../../bdd-src/address-check/ip-api/ip-api.api';
import { MapBoxClient } from '../../../bdd-src/address-check/mapbox-api/mapbox-api.api';
import ErrorContext from '../../contexts/address-check/ErrorContext';
import AddressContext from '../../contexts/address-check/AddressContext';
import { wirteCoordinatedToDbQuery } from '../../../bdd-src/address-check/db/db-queries';

type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
  ) => void;
  

export const addressSteps = ({given, when, and, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext => 
        featureContext().getContextById(Identificators.ErrorContext);
    const addressContext = (): AddressContext => 
        featureContext().getContextById(Identificators.AddressContext);

    const ipApiClient = new IpApiClient();
    const mapBoxClient = new MapBoxClient();

    given(/^address (.*) is (.*)$/, (paramName: string, paramValue: any) => {
        console.log(`Setting ${paramName} to ${paramValue}`);
        switch (paramName) {
            case 'id': return (addressContext().id = paramValue)
            case 'ip': return (addressContext().ipAddress = paramValue)
            case 'text': return (addressContext().textAddress = paramValue)
            case 'table': return (addressContext().addressTable = paramValue)
        }
    })

    when('geocode ip address', async () => {
        try {
            const ipAddress: string = addressContext().ipAddress;
            const {lat, lon} = await ipApiClient.getIpGeocode(ipAddress);
            addressContext().lat = lat;
            addressContext().lon = lon;
        } catch (error) {
            errorContext().error = <string>error;
        }
    })

    when('geocode address text', async () => {
        try {
            const addressText: string = addressContext().textAddress;
            const {lat, lon} = await mapBoxClient.getAddressGeocode(addressText);
            addressContext().lat = lat;
            addressContext().lon = lon;
        } catch (error) {
            errorContext().error = <string>error;
        }
    })

    then(/^write location to db lat (.*) lon (.*)$/, async (latCol: string, lonCol: string) => {
        try {
            console.log(`Writing coordinates to DB`);
            await postgresQueryExecutor(
                wirteCoordinatedToDbQuery(
                    addressContext().id,
                    latCol,
                    lonCol,
                    addressContext().lat,
                    addressContext().lon
                )
            );
        } catch (error) {
            const errorText: string = `Error while writing coordinates to DB: ${JSON.stringify(error)}`;
            errorContext().error = errorText;
        }
    })

    then('reset coordinates', () => {
        addressContext().lat = NaN;
        addressContext().lon = NaN;
    })
} 
