import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { State, Dispatch } from '@utils/store';
import { SymptomsType } from 'src/customTypes/types';

interface ISymptomsState {
  list: SymptomsType[];
}

const initialState: ISymptomsState = {
  list: [],
};

const slice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    add: (state: ISymptomsState, { payload }: { payload: SymptomsType }) => {
      state.list.push(payload);
    },
    remove: (state: ISymptomsState, { payload }: { payload: { id: string } }) => {
      state.list = state.list.filter(item => item.id !== payload.id);
    },
  },
});

export function useSymptomsReducer() {
  const dispatch = useDispatch<Dispatch>();
  const list = useSelector(({ app }: State) => app.list);
  return { dispatch, list, ...slice.actions };
}

export default slice.reducer;
