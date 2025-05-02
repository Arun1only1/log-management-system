import { ROLE } from '@constants/enum/role.enum';
import { SOURCE } from '@constants/enum/source.enum';

export interface IRole {
  role: ROLE;
}

export interface IRoleAndSource {
  role: ROLE;
  source: SOURCE;
}
