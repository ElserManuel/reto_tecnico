import { Appointment } from "../entities/appointment";


export interface AppointmentRepository {
    guardar(appointment: Appointment): Promise<void>;
    buscarPorId(insuredId: string): Promise<Appointment[]>;
    marcaCompleted(insuredId: string, scheduleId: number): Promise<void>;
}