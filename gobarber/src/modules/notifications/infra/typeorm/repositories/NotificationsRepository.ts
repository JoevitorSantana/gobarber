import { getMongoRepository, MongoRepository } from "typeorm";
import { ICreateNotificationDTO } from "../../../dtos/ICreateNotificationDTO";
import { INotificationsRepository } from "../../../repositories/INotificationsRepository";
import { Notification } from "../schemas/Notification";

export class NotificationsRepository implements INotificationsRepository{
    private repository: MongoRepository<Notification>;

    constructor(){
        this.repository = getMongoRepository(Notification, 'mongo');
    }
    public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.repository.create({
            content,
            recipient_id
        })

        await this.repository.save(notification);

        return notification;
    }
    
}