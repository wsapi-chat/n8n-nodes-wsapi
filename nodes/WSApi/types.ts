import { IDataObject } from "n8n-workflow";

export interface WSApiResponse extends IDataObject {
  success: boolean;
}
