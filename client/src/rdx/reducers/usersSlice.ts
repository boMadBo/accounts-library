import { instance } from '@/api/instance';
import { IUsers, IUsersValues } from '@/interfaces';
import { AppDispatch } from '@/rdx/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUsers = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersFetching(state, action: PayloadAction<IUsersValues[]>) {
      state.users = action.payload;
    },
  },
});
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  const response = await instance.get<IUsersValues[]>('/users');
  dispatch(usersFetching(response.data));
  return response;
};

const { usersFetching } = usersSlice.actions;
export default usersSlice.reducer;
