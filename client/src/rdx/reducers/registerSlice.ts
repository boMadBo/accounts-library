import { instance } from '@/api/instance';
import { IRegister, IRegisterState } from '@/interfaces';
import { AppDispatch } from '@/rdx/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IRegisterState = {
  user: {
    email: '',
    password: '',
    fullName: '',
    avatarUrl: null,
    birthDate: '',
    isMale: '',
  },
  isReg: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerFetching(state, action: PayloadAction<IRegister>) {
      state.user = action.payload;
      state.isReg = true;
    },
  },
});

export const fetchRegister = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.post<IRegister>('/auth/register', formData);
    dispatch(registerFetching(response.data));
  } catch (e: unknown) {
    console.error(e);
  }
};

const { registerFetching } = registerSlice.actions;

export default registerSlice.reducer;
