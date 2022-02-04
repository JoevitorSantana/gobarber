import { isEqual } from "date-fns";
import { ICreateAppointmentDTO } from "../../dtos/ICreateAppointmentDTO";
import { Appointment } from "../../infra/typeorm/entities/Appointment";
import { IAppointmentsRepository } from "../IAppointmentsRepository";

class AppointmentsRepositoryInMemory implements IAppointmentsRepository{

    private appointmentsRepository: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointments = this.appointmentsRepository.find(appointment => isEqual(appointment.date, date));
        return appointments
    }
    public async create({date, provider_id}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            date, provider_id
        });

        this.appointmentsRepository.push(appointment);

        return appointment;
    }

}

export {AppointmentsRepositoryInMemory};