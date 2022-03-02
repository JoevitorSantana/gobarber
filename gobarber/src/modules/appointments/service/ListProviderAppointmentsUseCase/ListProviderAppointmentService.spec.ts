import { RedisCacheProvider } from "../../../../shared/container/providers/CacheProvider/implementations/RedisCaheProvider";
import { CacheProviderInMemory } from "../../../../shared/container/providers/CacheProvider/in-memory/CacheProviderInMemory";
import { AppointmentsRepositoryInMemory } from "../../repositories/in-memory/AppointmentsRepositoryInMemory";
import { ListProviderAppointmentService } from "./ListProviderAppointmentService";

let appointmentsRepository: AppointmentsRepositoryInMemory;
let listProviderAppointments: ListProviderAppointmentService;
let cacheProvider: CacheProviderInMemory;

describe('ListoProviderAppointment', () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryInMemory();
    cacheProvider = new CacheProviderInMemory();    
    listProviderAppointments = new ListProviderAppointmentService(
      appointmentsRepository, cacheProvider     
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appoinmentOne = await appointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appoinmentTwo = await appointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appoinmentOne, appoinmentTwo]);
  });
});