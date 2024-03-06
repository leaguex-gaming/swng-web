// /**
//  * The `errorToast` function displays an error message using a toast notification.
//  * @param [error] - The `error` parameter is an object that contains information about the error that
//  * occurred. It may have properties such as `response`, `title`, and `message`.
//  * @param [noToast=false] - The `noToast` parameter is a boolean value that determines whether or not
//  * to display a toast message. If `noToast` is set to `true`, no toast message will be shown. If
//  * `noToast` is set to `false` or not provided, a toast message will be displayed
//  * @returns The errorToast function does not have a return statement.
//  */
// import Toast from "react-native-toast-message";

// export const errorToast = (error = {}, noToast = false) => {
//   try {
//     if (__DEV__) {
//       console.log(
//         "errorStatus",
//         error?.response?.status,
//         error?.response?.data?.message || error?.message,
//       );
//       console.log("error request payload", JSON.parse(error?.config?.data));
//     }
//     if (noToast) {
//       return;
//     }

//     const title = error?.response?.data?.title || error?.title || "Error";
//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong";
//     Toast.show({
//       type: "errorToast",
//       visibilityTime: 5000,
//       props: {
//         title,
//         message,
//       },
//     });
//   } catch (err) {}
// };
