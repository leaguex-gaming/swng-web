import { Alert } from "react-native-web";

export const apiErrorToast = (error = {}) => {
  try {
    const title =
      (error?.response?.data?.title || "Error") +
      ` ${error?.response?.status || ""}`;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    alert(title, message);
  } catch (err) {}
};
