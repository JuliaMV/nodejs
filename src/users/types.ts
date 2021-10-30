export interface UserDto {
  login: string;
  password: string;
  age: number;
}

export interface User extends UserDto {
  id: string;
  isDeleted: boolean;
}

//
// export type UpdateUser = {
//   login?: string;
//   password?: string;
//   age?: number;
// };
