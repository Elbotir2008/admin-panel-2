import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  students: [],
  error: false,
};

const fetchStudents = createAsyncThunk("fetchUserInfo", async () => {
  try {
    const res = await fetch("http://localhost:3000/students");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const studentsSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = initialState;
      })
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.students = initialState;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.error = action.payload;
        state.students = initialState;
        state.loading = initialState;
      });
  },
});

export default studentsSlice.reducer;
