import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTodo: false,
  showSelectDay: false,
  todoId: '',
  searchTodo: '',
  searchTodo2: '',
  selectedDay: null,
  todotext: '',
  searchTodoItem: [],
  showHandbars: false
};

const localStateSlice = createSlice({
  name: 'localState',
  initialState,
  reducers: {
    setShowAddTodo: (state, action) => {
      state.showAddTodo = action.payload;
    },
    setShowSelectDay: (state, action) => {
      state.showSelectDay = action.payload;
    },
    setTodoId: (state, action) => {
      state.todoId = action.payload;
    },
    setSearchTodo: (state, action) => {
      state.searchTodo = action.payload;
    },
    setSearchTodo2: (state, action) => {
      state.searchTodo2 = action.payload;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setTodoText: (state, action) => {
      state.todotext = action.payload;
    },
   setSearchTodoItem: (state, action)=>{
    state.searchTodoItem = action.payload
   },

   setHandBars: (state, action)=>{
    state.showHandbars = action.payload
   }
  },
});

export const {
  setShowAddTodo,
  setShowSelectDay,
  setTodoId,
  setSearchTodo,
  setSearchTodo2,
  setSelectedDay,
  setTodoText,
  setSearchTodoItem,
  setHandBars
} = localStateSlice.actions;

export default localStateSlice.reducer;
