
import { CountryISO, validateCountryISO } from "./country_ISO";
import { InsuredID, validateInsuredID } from "./insured_ID";
import { ScheduleID, ScheduleIDProps } from "./schedule_ID";

export enum AppointmentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
}

export interface AppointmentProps {
    insuredId: string;
    schedule: ScheduleIDProps;
    countryISO: CountryISO;
    status: AppointmentStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAppointmentInput {
    insuredId: unknown;
    scheduleId: unknown;
    countryISO: unknown;
}

export class Appointment {

    private constructor(private readonly props: AppointmentProps) { }

    public static create(input: CreateAppointmentInput, now: Date = new Date()): Appointment {
        const insuredId = validateInsuredID(input.insuredId);
        const countryISO = validateCountryISO(input.countryISO);
        const schedule = ScheduleID.create_scheduleID(input.scheduleId).props;

        const timestamp = now.toISOString();
        return new Appointment({
            insuredId,
            schedule,
            countryISO,
            status: AppointmentStatus.PENDING,
            createdAt: timestamp,
            updatedAt: timestamp,
        });
    }

    public static restore(props: AppointmentProps): Appointment {
        return new Appointment({ ...props, schedule: { ...props.schedule } });
    }

    public complete(now: Date = new Date()): Appointment {
        return new Appointment({
            ...this.props,
            status: AppointmentStatus.COMPLETED,
            updatedAt: now.toISOString(),
        });
    }

    get insuredId(): string { return this.props.insuredId; }
    get scheduleId(): number { return this.props.schedule.scheduleId; }
    get schedule(): ScheduleIDProps { return this.props.schedule; }
    get countryISO(): CountryISO { return this.props.countryISO; }
    get status(): AppointmentStatus { return this.props.status; }

    public toPrimitives(): AppointmentProps {
        return { ...this.props, schedule: { ...this.props.schedule } };
    }

}