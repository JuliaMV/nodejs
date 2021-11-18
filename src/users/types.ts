import { Optional } from 'sequelize';

export interface AutoSuggestedUsersQuery {
  limit: number;
  loginSubstring: string;
}

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface UserInput extends Optional<User, 'id'> {}

export interface UserOutput extends Required<User> {}

export interface UserParams extends Pick<User, 'id'> {}
