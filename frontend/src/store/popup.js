import { createSlice } from "@reduxjs/toolkit";

const initState = { popupIsShow: false, detailData: undefined };

const Popup = createSlice({
  name: "popup",
  initialState: initState,
  reducers: {
    show(state, action) {
      state.popupIsShow = true;
      state.detailData = action.payload;
    },
    hide(state) {
      state.popupIsShow = false;
    },
  },
});
export const popupActions = Popup.actions;
export default Popup.reducer;
