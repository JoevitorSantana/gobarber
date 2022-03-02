import { getDate, getMonth, getYear, isEqual } from "date-fns";
import { ICreateAppointmentDTO } from "../../dtos/ICreateAppointmentDTO";
import { IFindAllInDayFromProviderDTO } from "../../dtos/IFindAllInDayFromProvider";
import { IFindAllInMonthFromProviderDTO } from "../../dtos/IFindAllInMonthFromProvider";
import { Appointment } from "../../infra/typeorm/entities/Appointment";
import { IAppointmentsRepository } from "../IAppointmentsRepository";

class AppointmentsRepositoryInMemory implements IAppointmentsRepository{
    
    private appointmentsRepository: Appointment[] = [];

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const appointments = this.appointmentsRepository.find(appointment => 
            isEqual(appointment.date, date) &&
            appointment.provider_id === provider_id
        );
        return appointments
    }
    public async create({date, provider_id, user_id}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            date, provider_id, user_id
        });

        this.appointmentsRepository.push(appointment);

        return appointment;
    }

    public async findAllInDayFromProvider({provider_id, month, year, day}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointmentsRepository.filter(appointment => {
            return(
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return appointments;
    }

    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointmentsRepository.filter(appointment => {
            return(
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        });

        return appointments;
    }
}

export {AppointmentsRepositoryInMemory};