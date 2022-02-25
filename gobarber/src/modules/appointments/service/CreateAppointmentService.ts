import { getHours, isBefore, startOfHour } from 'date-fns'
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

        if(isBefore(appointmentDate, Date.now())){
            throw new AppError("You can't create an appointments in the past time");
        }
        
        if(user_id === provider_id){
            throw new AppError("You can't create an appointments with yourself!");
        }
        
        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError("You can only create an appointment between the 8am and 6pm");
        }

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