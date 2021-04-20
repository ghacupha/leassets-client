import { LeassetsFileMediumTypes } from 'app/entities/enumerations/leassets-file-medium-types.model';
import { LeassetsFileModelType } from 'app/entities/enumerations/leassets-file-model-type.model';

export interface ILeassetsFileType {
  id?: number;
  leassetsFileTypeName?: string;
  leassetsFileMediumType?: LeassetsFileMediumTypes;
  description?: string | null;
  fileTemplateContentType?: string | null;
  fileTemplate?: string | null;
  leassetsfileType?: LeassetsFileModelType | null;
}

export class LeassetsFileType implements ILeassetsFileType {
  constructor(
    public id?: number,
    public leassetsFileTypeName?: string,
    public leassetsFileMediumType?: LeassetsFileMediumTypes,
    public description?: string | null,
    public fileTemplateContentType?: string | null,
    public fileTemplate?: string | null,
    public leassetsfileType?: LeassetsFileModelType | null
  ) {}
}

export function getLeassetsFileTypeIdentifier(leassetsFileType: ILeassetsFileType): number | undefined {
  return leassetsFileType.id;
}
