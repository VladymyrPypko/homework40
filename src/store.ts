import { configureStore, createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

interface Note {
  id: number
  content: string
}

const initialState = {
  notes: [] as Note[]
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (s, a) => {
      s.notes.push(a.payload);
    },
    resetNotes: (s) => {
      s.notes = [];
    }
  }
})

export const { addNote, resetNotes } = notesSlice.actions;

const store = configureStore({
  reducer: {
    [notesSlice.name]: notesSlice.reducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()