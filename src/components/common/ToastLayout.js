"use client";

import { windowMaxWidth, windowMaxHeight } from "@/constants/DeviceData";
import { Pressable, View } from "react-native-web";
import MyButton from "@/components/common/MyButton";
import { ProfilePic } from "@/components/community/ProfileCard";
import MyText from "@/components/common/MyText";
// import store from "@/store/store";
import { updateDeeplinkURL } from "@/store/slices/common-slice";
import { black, white } from "@/constants/theme/colors";
import { updateNotificationViewedThunk } from "@/store/thunks/community";
import {
  DEEPLINK_NORMAL_POST_URL,
  DEEPLINK_REELS_URL,
} from "@/constants/StaticData";
import { toast } from "react-toastify";

export const notify = ({ props }) => {
  toast(
    <View
      style={{
        width: windowMaxWidth,
      }}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginLeft: 0,
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
            gap: 10,
          }}>
          <ProfilePic size={50} profilePic={props.profile_pic} />
          <View>
            <MyText pageHeaders fontSize={18}>
              {props.name}
            </MyText>
            <MyText style={props?.navigate && { width: 175 }}>
              {props.content}
            </MyText>
          </View>
        </View>
        {props?.navigate && (
          <MyButton
            label="OPEN"
            type="tertiary"
            width={125}
            height={40}
            mv={10}
            onPress={async () => {
              if (props?.notificationId) {
                // store.dispatch(
                //   updateNotificationViewedThunk([props?.notificationId])
                // );
              }
              if (props.deep_link) {
                if (props?.post_id) {
                  let BASE_URL =
                    props?.media_type === "video"
                      ? DEEPLINK_REELS_URL
                      : DEEPLINK_NORMAL_POST_URL;
                  // store.dispatch(
                  //   updateDeeplinkURL(
                  //     `${BASE_URL}?postId=${props?.post_id}&mediaType=${props?.media_type}`
                  //   )
                  // );
                } else if (props?.user_id) {
                  // store.dispatch(
                  //   updateDeeplinkURL(`navUserId=${props?.user_id}`)
                  // );
                }
              } else {
                if (props.type === "FOLLOW") {
                  // rootNavigate("UsersProfile", "navigate", {
                  //   navUserId: props.user_id,
                  //   fromDeepLink: true,
                  // });
                } else {
                  // rootNavigate("PostFullScreen", "navigate", {
                  //   postId: props?.post_id,
                  //   currentTopicId: props?.topic_id,
                  // });
                }
              }
            }}
            buttonTextSize={14}
          />
        )}
      </View>
    </View>
  );
};

export const successnotifies = ({ props }) => {
  toast(
    <View>
      <MyText pageHeaders fontSize={18} ph={25} mv={10}>
        {props.content}
      </MyText>
    </View>
  );
};

export const errorToast = ({ props }) => {
  const { title = "", message = "" } = props;
  toast(
    <View>
      <MyText pageHeaders fontSize={18} ph={25} mt={10}>
        {title}
      </MyText>
      <MyText ph={25} mt={2}>
        {message}
      </MyText>
    </View>
  );
};

export const warning = ({ props }) => {
  const { message = "" } = props;
  toast(
    <Pressable>
      <MyText pageHeaders fontSize={18} ph={25} mv={10}>
        {message}
      </MyText>
    </Pressable>
  );
};

export const info = ({}) => {
  toast(
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        zIndex: 10,
        position: "absolute",
        top: windowMaxHeight - 250,
        backgroundColor: white,
        borderRadius: 50,
      }}>
      <MyText fontSize={12} color={black}>
        Work On Progress!
      </MyText>
    </View>
  );
};
