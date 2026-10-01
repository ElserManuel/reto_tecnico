
import { ValidationError } from "../errors/validation-error";

export class InsuredId {
    private constructor(public readonly value: string) { }

    public static create(InsuredIDs: unknown): InsuredId {
        if (typeof InsuredIDs !== "string" || !/^\d{5}$/.test(InsuredIDs)) {
            throw new ValidationError("InsuredId debe ser una cadena de texto de 5 caracteres numéricos");
        }
        return new InsuredId(InsuredIDs);
    }

}