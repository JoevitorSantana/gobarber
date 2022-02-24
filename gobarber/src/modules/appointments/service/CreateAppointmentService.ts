import { startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { Appointment } from "../infra/typeorm/entities/Appointment";
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';


interface Request{
    date: Date;
    user_id: string;
    provider_id: string;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    )
    {}

    public async execute({date, provider_id, user_id}: Request): Promise<Appointment> {        

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('this appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
            user_id,            
        });        

        return appointment;
    }
}

export {CreateAppointmentService}