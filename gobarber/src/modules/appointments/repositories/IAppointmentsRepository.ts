import { ICreateAppointmentDTO } from "../dtos/ICreateAppointmentDTO";
import { IFindAllInDayFromProviderDTO } from "../dtos/IFindAllInDayFromProvider";
import { IFindAllInMonthFromProviderDTO } from "../dtos/IFindAllInMonthFromProvider";
import { Appointment } from "../infra/typeorm/entities/Appointment";

export interface IAppointmentsRepository{
    findByDate(date: Date): Promise<Appointment | undefined>;
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO):Promise<Appointment[]>;
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO):Promise<Appointment[]>;
}