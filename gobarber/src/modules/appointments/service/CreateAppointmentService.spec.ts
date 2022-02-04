import { AppError } from "../../../shared/errors/AppError";
import { AppointmentsRepositoryInMemory } from "../repositories/in-memory/AppointmentsRepositoryInMemory"
import { CreateAppointmentService } from "./CreateAppointmentService";

describe('CreateAppointments', () => {
    it('should be able to create a new appointment', async() => {
        const appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();

        const createAppointments = new CreateAppointmentService(appointmentsRepositoryInMemory);

        const appointment = await createAppointments.execute({
            date: new Date(),
            provider_id: '123123',
        })

        expect(appointment).toHaveProperty('id');        
    })

    it('should not be able to create a new appointments in same time', async() => {
        const appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();
        const createAppointments = new CreateAppointmentService(appointmentsRepositoryInMemory);

        const appointmentDate = new Date(2022, 1, 3, 11);

        await createAppointments.execute({
            date: appointmentDate,
            provider_id: '123123'
        })

        expect(
            createAppointments.execute({
                date: appointmentDate,
                provider_id: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})