import { Optional } from 'sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
  id: string;
  name: string;
  permissions: Permission[]
}

export interface GroupInput extends Optional<Group, 'id'> {}

export interface GroupOutput extends Required<Group> {}

export interface GroupParams extends Pick<Group, 'id'> {}
