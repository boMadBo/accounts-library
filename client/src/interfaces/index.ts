export interface ILoginState {
  user: string;
  isAuth: boolean;
}

export interface ILogin {
  message: string;
  token: string;
}

export interface ILoginValues {
  email: string;
  password: string;
}

export interface IRegisterState {
  user: IRegister;
  isReg: boolean;
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
  avatarUrl: File | null;
  birthDate: string;
  isMale: string;
}

export interface IMe {
  me: IMeValues;
}

export interface IMeValues {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  avatarUrl: string;
  birthDate: string;
  isMale: boolean;
}

export interface IUsers {
  users: IUsersValues[];
}

export interface IUsersValues {
  _id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  birthDate: string;
  isMale: boolean;
}

export interface IMeUpdate {
  user: IMeUpdateValues;
}

export interface IMeUpdateValues {
  _id: string;
  password: string;
  fullName: string;
  avatarUrl: File | null;
}
