import { ValidationError } from "../errors/validation-error";

export interface InsuredIDProps {
    insuredId: string;
    name: string;
}


export function validateInsuredID(insuredId: unknown): string {
    if (typeof insuredId !== "string" || !/^\d{5}$/.test(insuredId)) {
        throw new ValidationError("insuredId debe ser un string de exactamente 5 dígitos.");
    }
    return insuredId;
}

export class InsuredID {
    private constructor(public props: InsuredIDProps) { }
    public static create_insuredID(props: InsuredIDProps): InsuredID {
        validateInsuredID(props.insuredId);

        if (typeof props.name !== "string" || props.name.trim() === "") {
            throw new ValidationError("El nombre del asegurado es obligatorio.");
        }

        return new InsuredID(props);
    }
}