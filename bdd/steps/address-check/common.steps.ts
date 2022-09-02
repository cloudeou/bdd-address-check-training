import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import ErrorContext from '../../contexts/address-check/ErrorContext';
import AddressContext from '../../contexts/address-check/AddressContext';
import { finishProcessForTableQuery } from '../../../bdd-src/address-check/db/db-queries';

type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
  ) => void;
  

export const addressSteps = ({given, when, and, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext => 
        featureContext().getContextById(Identificators.ErrorContext);
    const addressContext = (): AddressContext => 
        featureContext().getContextById(Identificators.AddressContext);

    when(/^finish process for (.*)$/, async (tableName: string) => {
        try {
            const primaryKey = addressContext().id;
            const errorText = errorContext().error;
            console.log(`Finishing process for ${tableName}, row id ${primaryKey}. \n Writing error: ${errorText}`);
            console.dir(await postgresQueryExecutor(finishProcessForTableQuery(primaryKey, tableName, errorText)));
        } catch (error) {
            console.log(error)
        }
    })

}