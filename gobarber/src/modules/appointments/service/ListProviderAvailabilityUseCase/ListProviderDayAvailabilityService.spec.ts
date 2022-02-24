import { AppointmentsRepositoryInMemory } from "../../repositories/in-memory/AppointmentsRepositoryInMemory";
import { ListProviderDayAvailabilityService } from "./ListProviderDayAvailabilityService";

let appointmentsRepository: AppointmentsRepositoryInMemory;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListoProviderDayAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryInMemory();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      appointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await appointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await appointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([        
        {"available": false, "day": 20, "hour": 8}, 
        {"available": false, "day": 20, "hour": 9}, 
        {"available": false, "day": 20, "hour": 10}, 
        {"available": false, "day": 20, "hour": 11}, 
        {"available": true, "day": 20, "hour": 12}, 
        {"available": true, "day": 20, "hour": 13}, 
        {"available": false, "day": 20, "hour": 14}, 
        {"available": false, "day": 20, "hour": 15}, 
        {"available": true, "day": 20, "hour": 16}, 
        {"available": true, "day": 20, "hour": 17}     
      ]),
    );
  });
});