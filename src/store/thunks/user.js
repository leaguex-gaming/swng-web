import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "../../utils/services/api/apiService";
import { GET_PROFILE } from "../../constants/endpoints/user-endpoints";
import {
  updatePaymentMethods,
  updateUserSliceData,
  updateWalletData,
} from "../slices/user-slice";
import { errorToast } from "../../utils/helpers/errorToast";
import { GET_USER_PROFILE } from "../../constants/endpoints/community-endpoints";
import { uploadMediaToS3 } from "./community";
import { redirect } from "next/dist/server/api-utils";

export const getProfile = createAsyncThunk(
  "userSlice/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await ApiService.get(GET_PROFILE);
      await updateUserDataInAsyncStorate(response.data?.user);
      thunkAPI.dispatch(updateUserSliceData(response.data?.user));
      thunkAPI.dispatch(updateWalletData(response.data?.wallet));
      thunkAPI.dispatch(updatePaymentMethods(response.data?.payment_methods));
      return true;
    } catch (err) {
      return false;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "userSlice/updateProfile",
  async (data, thunkAPI) => {
    try {
      let s3ProfilePic;
      let s3CoverPic;
      if (data?.profile_photo) {
        const picData = {
          ...data?.profile_photo,
          path: data?.profile_photo?.uri,
          mime: "image/jpeg",
        };
        s3ProfilePic = await uploadMediaToS3(picData, "image", {}, "jpeg");
        const bucket = s3ProfilePic.data?.url?.fields?.bucket;
        s3ProfilePic = `https://${bucket}.s3.amazonaws.com/${s3ProfilePic.data?.url?.fields?.key}`;
      }

      if (data?.cover_photo) {
        const picData = {
          ...data?.cover_photo,
          path: data?.cover_photo?.uri,
          mime: "image/jpeg",
        };
        s3CoverPic = await uploadMediaToS3(picData, "image", {}, "jpeg");
        const bucket = s3CoverPic.data?.url?.fields?.bucket;
        s3CoverPic = `https://${bucket}.s3.amazonaws.com/${s3CoverPic.data?.url?.fields?.key}`;
      }

      const body = {
        profile_photo: s3ProfilePic,
        cover_photo: s3CoverPic,
        role: data?.role || "not_assigned",
        team_name: data?.team_name || undefined,
        bio: data?.bio || undefined,
      };
      const response = await ApiService.patch(GET_USER_PROFILE, body);
      await updateUserDataInAsyncStorate(response?.data?.profile || {});
      thunkAPI.dispatch(updateUserSliceData(response?.data?.profile || {}));
      redirect("../");

      return true;
    } catch (err) {
      errorToast(err);
    }
  }
);
