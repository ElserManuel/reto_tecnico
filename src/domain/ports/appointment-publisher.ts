
import { Appointment } from "../entities/appointment";

export interface AppointmentPublisher {
    publicar(appointment: Appointment): Promise<void>;
}