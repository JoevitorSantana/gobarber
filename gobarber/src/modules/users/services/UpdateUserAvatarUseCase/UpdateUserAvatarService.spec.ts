import { StorageProviderInMemory } from "../../../../shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UpdateUserAvatarService } from "./UpdateUserAvatarService";

describe('UpdateUserAvatar', () => {
    it('should be able to upload an avatar', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const storageProviderInMemory = new StorageProviderInMemory();
        const updateUserAvatar = new UpdateUserAvatarService(usersRepositoryInMemory, storageProviderInMemory);

        const user = await usersRepositoryInMemory.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        })

        expect(user.avatar).toBe('avatar.png');
    });

    it('should not be able to upload an avatar for non-existing user', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const storageProviderInMemory = new StorageProviderInMemory();
        const updateUserAvatar = new UpdateUserAvatarService(usersRepositoryInMemory, storageProviderInMemory)        

        expect(
            updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.png'
        })
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should delte old avatar when updating new one', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const storageProviderInMemory = new StorageProviderInMemory();

        const deleteFile = jest.spyOn(storageProviderInMemory, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(usersRepositoryInMemory, storageProviderInMemory)

        const user = await usersRepositoryInMemory.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.png'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar2.png');
    });
});