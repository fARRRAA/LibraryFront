import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    role:'user'
}

const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.role=payload.role;
            state.id = payload.id;
        },
    
    removeUser: (state)=>{
        state.id=null;
        state.role = null;
    }
}
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;