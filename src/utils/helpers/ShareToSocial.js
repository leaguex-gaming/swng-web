import { sharedPostThunk } from "../../redux/thunks/community";
import { PlatformOS } from "../../constants/DeviceData";

// const fs = RNFetchBlob.fs;
export const ShareToSocial = async (
  media_url,
  messageContent,
  deep_link_url,
  post_id,
  currentTopicId,
  dispatch
) => {
  try {
    if (PlatformOS !== "web") {
      if (media_url) {
        let imageUrl = media_url;
        if (media_url.includes("http://") || media_url.includes("https://")) {
          let response = await RNFetchBlob.fetch("GET", media_url);
          // the image is now dowloaded to device's storage
          let imagePath = response.path();
          // the image path you can use it directly with Image component
          let base64Data = response.base64();
          imageUrl = "data:image/png;base64," + base64Data;
        }

        let shareImage = {
          title: "swng",
          message: `${messageContent} ${deep_link_url}`,
          url: imageUrl,
        };
        await Share.open(shareImage);

        // remove the file from storage
        // fs.unlink(imagePath);
      } else {
        let shareImage = {
          title: "swng",
          message: `${messageContent} ${deep_link_url}`,
        };
        await Share.open(shareImage);
      }
      if (post_id) {
        dispatch(sharedPostThunk({ post_id }));
      }
    }
  } catch (err) {
    console.log("social share error", err);
  }
};
