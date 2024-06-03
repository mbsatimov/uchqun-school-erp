export interface IAdmin extends User {}

export interface IAdminPreview extends User {}

export type TAdminRequest = Omit<IAdmin, 'id' | 'attachment'>;

export interface ICreateAdminRequest extends TAdminRequest {
  password: string;
}
