export interface ICategoriaInfo {
  nome: string;
  id: number | null;
  beginTime: Date;
  endTime: Date;
  changedBeginTime: boolean;
  changedEndTime: boolean;
  days: [];
}
