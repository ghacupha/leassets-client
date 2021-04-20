import * as dayjs from 'dayjs';

export interface ILeassetsFileUpload {
  id?: number;
  description?: string;
  fileName?: string;
  periodFrom?: dayjs.Dayjs | null;
  periodTo?: dayjs.Dayjs | null;
  leassetsFileTypeId?: number;
  dataFileContentType?: string;
  dataFile?: string;
  uploadSuccessful?: boolean | null;
  uploadProcessed?: boolean | null;
  uploadToken?: string | null;
}

export class LeassetsFileUpload implements ILeassetsFileUpload {
  constructor(
    public id?: number,
    public description?: string,
    public fileName?: string,
    public periodFrom?: dayjs.Dayjs | null,
    public periodTo?: dayjs.Dayjs | null,
    public leassetsFileTypeId?: number,
    public dataFileContentType?: string,
    public dataFile?: string,
    public uploadSuccessful?: boolean | null,
    public uploadProcessed?: boolean | null,
    public uploadToken?: string | null
  ) {
    this.uploadSuccessful = this.uploadSuccessful ?? false;
    this.uploadProcessed = this.uploadProcessed ?? false;
  }
}

export function getLeassetsFileUploadIdentifier(leassetsFileUpload: ILeassetsFileUpload): number | undefined {
  return leassetsFileUpload.id;
}
