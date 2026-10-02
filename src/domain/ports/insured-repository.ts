import { InsuredIDProps } from "../entities/insured_ID";

export interface InsuredRepository {
    filtrarporid(insuredId: string): Promise<InsuredIDProps | undefined>;
}