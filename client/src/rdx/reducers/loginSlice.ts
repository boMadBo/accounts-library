import { instance } from '@/api/instance';
import { ILogin, ILoginState, ILoginValues } from '@/interfaces';
import { AppDispatch } from '@/rdx/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState: ILoginState = {
  user: '',
  isAuth: Cookies.get('rememberMe') ? Boolean(Cookies.get('token')) : false,
};

export const loginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    loginFetching(state) {
      state.isAuth = false;
    },
    loginFetchingSuccess(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    loginFetchingError(state) {
      state.isAuth = false;
    },
    logoutSuccess(state) {
      state.user = '';
      state.isAuth = false;
    },
  },
});

export const fetchLogin = (event: ILoginValues) => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.post<ILogin>('/auth/login', event);
    dispatch(loginFetchingSuccess(response.data.message));
    const token = response.data.token;
    Cookies.set('token', token, { expires: 7 });
  } catch (e: unknown) {
    console.error(e);
  }
};

export const fetchLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logoutSuccess());
    Cookies.remove('token');
    Cookies.remove('rememberMe');
  } catch (error) {
    console.error(error);
  }
};

const { loginFetchingSuccess, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
