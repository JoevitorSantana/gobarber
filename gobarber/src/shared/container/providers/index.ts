import { container } from "tsyringe";
import './CacheProvider';
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/models/IMailProvider";
import { HandleBarsMailTemplateProvider } from "./MailTemplateProvider/implementations/HandleBarsMailProvider";
import { IMailTemplateProvider } from "./MailTemplateProvider/models/IMailTemplateProvider";
import { DiskStorageProvider } from "./StorageProvider/implementations/DiskStorageProvider";
import { IStorageProvider } from "./StorageProvider/models/IStorageProvider";

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
)

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsMailTemplateProvider
)
