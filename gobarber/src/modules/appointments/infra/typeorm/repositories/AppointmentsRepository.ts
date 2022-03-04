import { getRepository, Raw, Repository } from "typeorm";
import { ICreateAppointmentDTO } from "../../../dtos/ICreateAppointmentDTO";
import { IFindAllInDayFromProviderDTO } from "../../../dtos/IFindAllInDayFromProvider";
import { IFindAllInMonthFromProviderDTO } from "../../../dtos/IFindAllInMonthFromProvider";
import { IAppointmentsRepository } from "../../../repositories/IAppointmentsRepository";
import { Appointment } from "../entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository{

    private repository: Repository<Appointment>;

    constructor(){
        this.repository = getRepository(Appointment);
    }    

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const user = await this.repository.findOne({date, provider_id});        
        return user;
    }
    
    public async create({provider_id, date, user_id}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.repository.create({provider_id, date, user_id});

        await this.repository.save(appointment);

        return appointment;
    }
    
    public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const appointments = await this.repository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user']
        })
    
        return appointments;        
    }

    public async findAllInMonthFromProvider({provider_id, month, year}:IFindAllInMonthFromProviderDTO):Promise<Appointment[]>{

        const parsedMonth = String(month).padStart(2, '0');
    
        const appointments = await this.repository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        })
    
        return appointments;
    }

}

export {AppointmentsRepository};