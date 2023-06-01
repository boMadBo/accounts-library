import { instance } from '@/api/instance';
import { IMe, IMeValues } from '@/interfaces';
import { AppDispatch } from '@/rdx/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IMe = {
  me: {
    _id: '',
    email: '',
    password: '',
    fullName: '',
    avatarUrl: '',
    birthDate: '',
    isMale: true,
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountFetching(state, action: PayloadAction<IMeValues>) {
      state.me = action.payload;
    },
  },
});
export const fetchAccount = () => async (dispatch: AppDispatch) => {
  const response = await instance.get<IMeValues>('/account');
  dispatch(accountFetching(response.data));
  return response;
};

const { accountFetching } = accountSlice.actions;
export default accountSlice.reducer;
