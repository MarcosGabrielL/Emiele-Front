export class FileDetails {
  name: string;
  progress: number;
}

export interface FileDB {
    
    id: String;
    name: String;
    idpost: String;
    type: String;
    data: File;
    
  }