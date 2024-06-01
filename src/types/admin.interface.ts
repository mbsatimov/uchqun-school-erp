import type { IUser } from './user.interface';

export interface IAdmin extends IUser {}

export interface IAdminPreview extends IUser {}

export type TAdminRequest = Omit<IAdmin, 'id' | 'attachment'>;

export interface ICreateAdminRequest extends TAdminRequest {
  password: string;
}
