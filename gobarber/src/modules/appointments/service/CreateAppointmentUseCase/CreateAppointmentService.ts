import { format, getHours, isBefore, startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe';
import { ICacheProvider } from '../../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { INotificationsRepository } from '../../../notifications/repositories/INotificationsRepository';
import { Appointment } from '../../infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';



interface Request{
    date: Date;
    user_id: string;
    provider_id: string;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
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
        
        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para o dia ${dateFormatted}`,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`
        )

        return appointment;
    }
}

export {CreateAppointmentService}