import { instance } from '@/api/instance';
import { IMeUpdate, IMeUpdateValues } from '@/interfaces';
import { AppDispatch } from '@/rdx/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IMeUpdate = {
  user: {
    _id: '',
    password: '',
    fullName: '',
    avatarUrl: null,
  },
};

export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateFetching(state, action: PayloadAction<IMeUpdateValues>) {
      state.user = action.payload;
    },
  },
});
export const fetchUpdate = (_id: string, formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.patch<IMeUpdateValues>(`/account/${_id}`, formData);
    dispatch(updateFetching(response.data));
  } catch (e: unknown) {
    console.error(e);
  }
};

const { updateFetching } = updateSlice.actions;
export default updateSlice.reducer;
