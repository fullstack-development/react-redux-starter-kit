import { IUser } from './user';

export interface IRepository {
  openIssuesNumber: number;
  starsNumber: number;
  forksNumber: number;
  description: string;
  name: string;
  htmlURL: string;
  language: string;
  updatedAt: string;
  owner: IUser;
}
