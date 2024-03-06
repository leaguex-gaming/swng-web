"use client";

import { rootNavigate } from "../../navigation/Navigation";
import queryString from "query-string";

export const handleDeepLinkRouting = (url, postDetails = {}) => {
  try {
    if (url.includes("postId")) {
      let postId;
      let mediaType;
      if (url.includes("http")) {
        const parsedUrl = queryString.parseUrl(url);
        postId = parsedUrl.query.postId;
        mediaType = parsedUrl?.query?.mediaType;
      } else {
        postId = url.split("postId=")[1];
      }

      if (postDetails?.media_type === "video" || mediaType === "video") {
        rootNavigate("Reels", "navigate", {
          postId: postId,
          currentTopicId: 0,
        });
      } else {
        rootNavigate("PostFullScreen", "push", { postId, fromDeepLink: true });
      }
    } else if (url.includes("navUserId")) {
      const navUserId = url.split("navUserId=")[1];
      rootNavigate("UsersProfile", "navigate", {
        navUserId,
        fromDeepLink: true,
      });
    }
  } catch (err) {}
};
