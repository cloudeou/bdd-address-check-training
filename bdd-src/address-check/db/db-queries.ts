export const wirteCoordinatedToDbQuery = (
    addressId: number,
    latCol: string,
    lonCol: string,
    lat: number, 
    lon: number
): string => 
    `UPDATE addresses SET ${latCol}=${lat}, ${lonCol}=${lon} WHERE id=${addressId}`;

export const finishProcessForTableQuery = (
    primaryKey: any, 
    tableName: string, 
    error: string
): string =>
    `UPDATE ${tableName} SET processing=false, processed=true, error='${error}', updated_date=now() WHERE id=${primaryKey}`