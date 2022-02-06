import { IParseMailTemplateDTO } from "../dtos/IParseMailTemplateDTO";
import { IMailTemplateProvider } from "../models/IMailTemplateProvider";

class MailTemplateProviderInMemory implements IMailTemplateProvider{

    public async parse(): Promise<string> {
        return 'Mail content';
    }

}

export {MailTemplateProviderInMemory}