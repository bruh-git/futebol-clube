import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';

const loginMock: ILogin = {
  email: 'admin@admin.com',
  password: '123456',
};

const userMock: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const errorLoginMock = {
  email: '',
  password: 'senhaerrada',
};

const userNotAuthMock = {
  email: 'teste@teste.com',
  password: 'senhaerrada',
};

export { loginMock, userMock, errorLoginMock, userNotAuthMock };
