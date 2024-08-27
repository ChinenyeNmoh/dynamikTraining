import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("module") ?
  JSON.parse(localStorage.getItem("module")) : {moduleItems : []};

const moduleSlice = createSlice({
    name: "module",
    initialState,
    reducers: {
        getModules(state, action) {
            state.moduleItems = action.payload;
            localStorage.setItem("module", JSON.stringify(state));
        },
        addModule(state, action) {
            state.moduleItems.push(action.payload);
            localStorage.setItem("module", JSON.stringify(state));
        },
        deleteModule(state, action) {
            state.moduleItems = state.moduleItems.filter(module => module.id !== action.payload);
            localStorage.setItem("module", JSON.stringify(state));
        },
        updateModule(state, action) {
            state.moduleItems = state.moduleItems.map(module =>
                module.id === action.payload.id ? action.payload : module
            );
            localStorage.setItem("module", JSON.stringify(state));
        },
    },
}); 

export const { addModule, deleteModule, updateModule } = moduleSlice.actions;
export default moduleSlice.reducer;
