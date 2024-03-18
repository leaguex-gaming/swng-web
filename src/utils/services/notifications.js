"use client";

import { setPushNotification } from "@/store/slices/common-slice";
import store from "@/store/store";
import { getNotificationHistory } from "@/store/thunks/community";
import { removeFcm } from "@/store/thunks/authentication";

export const requestNoficationPermission = async () => {
  const authStatus = await Notification.requestPermission();

  if (authStatus === "granted") {
    store.dispatch(setPushNotification(true));
  } else {
    removeFcm();
    store.dispatch(setPushNotification(false));
  }
};

// Create an empty queue to store notification data
let notificationQueue = [];

export const handleBackgroungNotification = async (notification) => {
  // notificationQueue.push(notification?.data);
};

export const handleNotifications = (data) => {
  // const notifyData = notificationQueue?.find(
  //   item => item?.post_id === data?.data?.post_id,
  // );
  // onOpenNotification(notifyData);
};

export const onOpenNotification = (data = {}) => {
  // notificationQueue.pop();
  // notificationQueue = notificationQueue?.filter(
  //   item => item?.post_id !== data?.post_id,
  // );
  // store.dispatch(updateNotificationViewedThunk([data?.id]));
  // if (data?.post_id) {
  //   let BASE_URL =
  //     data?.media_type === "video"
  //       ? DEEPLINK_REELS_URL
  //       : DEEPLINK_NORMAL_POST_URL;
  //   store.dispatch(
  //     updateDeeplinkURL(
  //       `${BASE_URL}?postId=${data?.post_id}&mediaType=${data?.media_type}`,
  //     ),
  //   );
  // } else if (data?.action === "FOLLOW") {
  //   store.dispatch(updateDeeplinkURL(`navUserId=${data?.user_id}`));
  // }
};

//no notification is shown in tab bar
export const handleForegroundNotification = async (notification) => {
  store.dispatch(getNotificationHistory());
  const { title = "", body = "" } = notification?.notification;
  if (notification?.data?.action === "POST_LIKE") {
    // store.dispatch(
    //   updateLikeNotification({
    //     post_id: notification?.data?.post_id,
    //     currentTopicId: 0,
    //   })
    // );
  } else if (notification?.data?.action === "CREATE_COMMENT") {
    // store.dispatch(
    //   addComment({
    //     comment: { post_id: notification?.data?.post_id },
    //     currentTopicId: 0,
    //   })
    // );
  }
  Toast.show({
    type: "notify",
    visibilityTime: 5000,
    props: {
      profile_pic: notification?.data?.profile_photo,
      post_id: notification?.data?.post_id,
      media_type: notification?.data?.media_type,
      name: notification?.data?.team_name,
      content: body,
      deep_link: true,
      navigate: true,
      notificationId: notification?.data?.id,
      ...(notification?.data?.action === "FOLLOW" && {
        user_id: notification?.data?.user_id,
      }),
    },
  });
};
