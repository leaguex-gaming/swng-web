import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  networkConnected: true,
  slowInternet: "",
  maintainance: false,
  theme: "Dark",
  signupFrom: "",
  deeplinkURL: "",
  currentRoute: "SocialTL",
  apiLoading: false,
  toastContent: "",
  navigationChanged: false,
  currentVisibleIndex: 0,
  sound: true,
  pushNotification: true,
  showPostMoreOptions: false,
  moreOptionsPost: {},
  modalPost: {},
  deletePostModalVisible: false,
  reportPostModalVisible: false,
  scrollToTopTL: false,
  closeAppModalVisible: false,
  gifModalVisible: false,
  keyboardVisible: false,
  showCommentMoreOptions: false,
  moreOptionsComment: {},
  userClappedPost: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateDeviceVisibleHeight(state, action) {
      state.deviceVisibleHeight = action.payload;
    },
    updateNetworkStatus(state, action) {
      state.networkConnected = action.payload;
    },
    updateSlowInternet(state, action) {
      state.slowInternet = action.payload;
    },
    updateMaintainanceStatus(state, action) {
      state.maintainance = action.payload;
    },
    updateTheme(state, action) {
      state.theme = action.payload;
    },
    updateSignupFrom(state, action) {
      state.signupFrom = action.payload;
    },
    updateDeeplinkURL(state, action) {
      state.deeplinkURL = action.payload;
    },
    updateCurrentRoute(state, action) {
      state.currentRoute = action.payload;
    },
    updateApiLoading(state, action) {
      state.apiLoading = action.payload?.loading;
      state.toastContent = action.payload?.content;
    },
    updateNavigationChanged(state, action) {
      state.navigationChanged = action.payload;
    },
    setCurrentVisibleIndex(state, action) {
      state.currentVisibleIndex = action.payload;
    },
    setSound(state, action) {
      state.sound = action.payload;
    },
    setPushNotification(state, action) {
      state.pushNotification = action.payload;
    },
    updatePostMoreOptions(state, action) {
      const { show = false, post = {} } = action.payload;
      state.showPostMoreOptions = show;
      state.moreOptionsPost = post;
    },
    updateModalPost(state, action) {
      state.modalPost = action.payload;
    },
    updateDeletePostModalVisible(state, action) {
      state.deletePostModalVisible = action.payload;
    },
    updateReportPostModalVisible(state, action) {
      state.reportPostModalVisible = action.payload;
    },
    updateScrollToTopTL(state, action) {
      state.scrollToTopTL = action.payload;
    },
    updateCloseAppModalVisible(state, action) {
      state.closeAppModalVisible = action.payload;
    },
    updateGifModalVisible(state, action) {
      state.gifModalVisible = action.payload;
    },
    updateKeyboardVisible(state, action) {
      state.keyboardVisible = action.payload;
    },
    updateCommentMoreOptions(state, action) {
      const { show = false, comment = {} } = action.payload;
      state.showCommentMoreOptions = show;
      state.moreOptionsComment = comment;
    },
    updateUserClappedPost(state, action) {
      state.userClappedPost = action.payload;
    },
  },
});

export const {
  updateDeviceVisibleHeight,
  updateNetworkStatus,
  updateSlowInternet,
  updateMaintainanceStatus,
  updateTheme,
  updateSignupFrom,
  updateDeeplinkURL,
  updateCurrentRoute,
  updateApiLoading,
  updateNavigationChanged,
  setCurrentVisibleIndex,
  setSound,
  setPushNotification,
  updatePostMoreOptions,
  updateModalPost,
  updateDeletePostModalVisible,
  updateReportPostModalVisible,
  updateScrollToTopTL,
  updateCloseAppModalVisible,
  updateGifModalVisible,
  updateKeyboardVisible,
  updateCommentMoreOptions,
  updateUserClappedPost,
} = commonSlice.actions;

export default commonSlice.reducer;
