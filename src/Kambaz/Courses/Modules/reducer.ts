// src/Kambaz/Modules/reducer.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: any[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
       setModules: (state, { payload: modules }) => {
     state.modules = modules;
   },
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules.push(action.payload);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (m) => m._id !== action.payload
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const index = state.modules.findIndex(m => m._id === action.payload._id);
      if (index !== -1) {
        state.modules[index] = action.payload;
      }
    },
    editModule: (state, action: PayloadAction<string>) => {
      const module = state.modules.find(m => m._id === action.payload);
      if (module) {
        module.editing = true;
      }
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;