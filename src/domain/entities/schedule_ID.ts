
import { ValidationError } from "../errors/validation-error";

export interface ScheduleIDProps{
    scheduleId: number;
    centerId?: number;
    specialtyId?: number;
    medicId?: number;
    date?: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

export function positiveInt(value: unknown, field: string): number {
    if (!Number.isInteger(value) || (value as number) <= 0) {
        throw new ValidationError(`${field} debe ser un número entero positivo.`);
    }
    return value as number;
}

export class ScheduleID {
    private constructor(public props: ScheduleIDProps) { }

    public static create_scheduleID(raw: unknown): ScheduleID {
        if (typeof raw === "number") {
            return new ScheduleID({ scheduleId: positiveInt(raw, "scheduleId") });
        }

        if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
            throw new ValidationError(
                "scheduleId debe ser un número o un objeto con scheduleId, centerId, specialtyId, medicId y date."
            );
        }

        const r = raw as Record<string, unknown>;

        if (typeof r.date !== "string" || !ISO_DATE.test(r.date) || Number.isNaN(Date.parse(r.date))) {
            throw new ValidationError("date debe ser ISO 8601 válido (ej: 2024-09-30T12:30:00Z).");
        }

        return new ScheduleID({
            scheduleId: positiveInt(r.scheduleId, "scheduleId"),
            centerId: positiveInt(r.centerId, "centerId"),
            specialtyId: positiveInt(r.specialtyId, "specialtyId"),
            medicId: positiveInt(r.medicId, "medicId"),
            date: r.date,
        });
    }
}