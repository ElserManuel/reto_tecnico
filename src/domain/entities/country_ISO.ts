
import { ValidationError } from "../errors/validation-error";

export const COUNTRY_ISO_CODES = ["PE" , "CL"] as const;

export type CountryISO = typeof COUNTRY_ISO_CODES[number];


export function validateCountryISO(countryISO: unknown): CountryISO {
    if (typeof countryISO !== "string" || !COUNTRY_ISO_CODES.includes(countryISO as CountryISO)) {
        throw new ValidationError("Código ISO de país no válido.");
    }
    return countryISO as CountryISO;
}