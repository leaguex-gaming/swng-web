"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native-web";
import Header from "@/components/common/Header";
import { BackButton } from "@/components/common/InBuiltNavigation";
import MyButton from "@/components/common/MyButton";
import { windowMaxWidth, windowMaxHeight } from "@/constants/DeviceData";
import MyText from "@/components/common/MyText";
import CameraIcon from "../../../../public/svg/community/CameraIcon";
import ChevronDown from "../../../../public/svg/ChevronDown";
import Plus from "../../../../public/svg/Plus";
import SelectTopicModalize from "@/components/modals/SelectTopicModalize";
import SelectSubTopicModalize from "@/components/modals/SelectSubTopicModalize";
import CloseIcon from "../../../../public/svg/CloseIcon";
import MoneyInputHalf from "../../../../public/svg/MoneyInputHalf";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, getTopics } from "@/store/thunks/community";
import { LinearGradientBackground } from "@/components/common/MyBackground";
// import ReactPlayer from "react-player";
import InputBox from "../../../../public/svg/InputBox";
import LimitationErrorModalize from "@/components/modals/LimitationErrorModalize";
// import PostCropper from "../components/community/PostCropper";
import { updateApiLoading } from "@/store/slices/common-slice";
import MentionModal from "@/components/modals/MentionModal";
import { getFilteredMentionedUsers } from "@/utils/helpers/helper";
import {
  black,
  black4,
  primaryGreen,
  white,
  white3,
  white4,
} from "@/constants/theme/colors";
import { DUMMY_AVATAR } from "@/constants/StaticData";
import { useRouter } from "next/navigation";
import { getProfile } from "@/store/thunks/user";

const MAX_MEDIA_SIZE = 20;

const CreatePost = () => {
  const router = useRouter();

  //---------------------------------------------state management------------------------------------------//
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [croppedMedia, setCroppedMedia] = useState(null);
  const [compressedMedia, setCompressedMedia] = useState(null);
  const [fileType, setFileType] = useState("");
  const [extension, setExtension] = useState("");
  const [message, setMessage] = useState("");
  const [showLimitation, setshowLimitation] = useState(false);
  const [limitationMessage, setLimitationMessage] = useState("");
  const [onSubmit, setonSubmit] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [mediaContainerHeight, setMediaContainerHeight] = useState(0);
  const [messageContainerHeight, setMessageContainerHeight] = useState(0);
  const [topicContainerHeight, settopicContainerHeight] = useState(0);
  const [mentionText, setMentionText] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [mentionedUser, setMentionedUser] = useState({});
  const [selectTopicModalize, setselectTopicModalize] = useState(false);
  const [selectSubTopicModalize, setselectSubTopicModalize] = useState(false);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const createPostLoading = useSelector(
    (state) => state.community.createPostLoading
  );
  const { profile_photo_small, team_name } = useSelector(
    (state) => state.userSlice
  );

  //--------------------------------------------------refs---------------------------------------------------//
  const scrollViewRef = useRef(null);

  //--------------------------------------------------Hook---------------------------------------------------//
  useEffect(() => {
    if (croppedMedia) {
      if (fileType === "image") {
        onPostIt();
      }
    }
  }, [croppedMedia]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const handleTextChange = (text) => {
    setMessage(text);
    const match = text.match(/@(\w+)$/);
    if (match) {
      setMentionText(match[1]);
    } else {
      setMentionText("");
    }
  };

  const selectUser = (user) => {
    // Replace the mentionText with the selected user in the input field
    const newValue = message.replace(`@${mentionText}`, `@${user.team_name} `);
    if (!mentionedUser) {
      setMentionedUser({ [user.team_name]: user.id });
    } else {
      const newMentionedUser = { ...mentionedUser, [user.team_name]: user.id };
      setMentionedUser(newMentionedUser);
    }
    setMessage(newValue);
    setMentionText("");
  };

  const onPostIt = async () => {
    try {
      const filteredMentionedUser = getFilteredMentionedUsers(
        message?.trim(),
        mentionedUser
      );
      const data = {
        content: message?.trim(),
        media_url: null,
        media_exists: false,
        media_type: "text",
        topic_id: topic.topic_id,
        subtopic_id: subTopic.subtopic_id,
        fileType: fileType,
        extension: extension,
        selectedMedia: croppedMedia
          ? { ...selectedMedia, uri: croppedMedia.uri }
          : null,
        compressedMedia: compressedMedia ? compressedMedia : croppedMedia,

        notify_profile_pic: profile_photo_small,
        notify_title: team_name,
        post_mentions: filteredMentionedUser,
      };

      await dispatch(createPostThunk(data));

      router.back();
      setSelectedMedia(null);
      setMessage("");
      setCreateLoading(false);
      setMentionedUser({});
    } catch (err) {}
  };

  const onSelectingImage = (e) => {
    if (e.target.files[0].type.split("/")[0] === "video") {
      function readFileAsBase64(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const video = document.querySelector("#previewVideo");

          video.src = event.target.result;

          video.addEventListener("loadedmetadata", function () {
            const base64String = event.target.result;
            setSelectedMedia({
              uri: base64String,
              width: this.videoWidth,
              height: this.videoHeight,
              file: file,
            });
            setCompressedMedia({
              uri: base64String,
              width: this.videoHeight,
              height: this.videoHeight,
              file: file,
            });
            setCroppedMedia({
              uri: base64String,
              width: this.videoWidth,
              height: this.videoHeight,
              file: file,
            });
          });
        };
        reader.readAsDataURL(file);
      }
      setFileType(e.target.files[0].type.split("/")[0]);
      setExtension(e.target.files[0].type.split("/")[1]);

      const video = document.querySelector("#previewVideo");
      video.src = e.target.files[0];
      // video.addEventListener("loadedmetadata", function () {
      //   const durationInSeconds = video.duration;
      if (
        !(e.target.files[0].size / 1024 ** 2 < 200)
        // ||
        // !(durationInSeconds / 60 < 10)
      ) {
        setshowLimitation(true);
        setLimitationMessage(
          "Make sure the video file you are uploading is less than 200mb and not more 10 minutes in length."
        );
      } else {
        readFileAsBase64(e.target.files[0]);
      }
      // });
    } else {
      function readFileAsBase64(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const image = document.querySelector("#previewImage");
          image.src = event.target.result;
          image.onload = () => {
            const { height, width } = image;

            const base64String = event.target.result;
            setSelectedMedia({
              uri: base64String,
              width: width,
              height: height,
            });
            setCompressedMedia({
              uri: base64String,
              width: width,
              height: height,
            });
          };
        };
        reader.readAsDataURL(file);
      }

      setFileType(e.target.files[0].type.split("/")[0]);
      setExtension(e.target.files[0].type.split("/")[1]);
      if (
        !["jpeg", "jpg", "png"].includes(
          e.target.files[0].type?.split("/")[1]
        ) ||
        !(e.target.files[0].size / 1024 ** 2 < 20)
      ) {
        setshowLimitation(true);
        setLimitationMessage(
          "Make sure the image file you are uploading is less than 20mb and in the formats of JPG & PNG."
        );
        return;
      } else {
        readFileAsBase64(e.target.files[0]);
      }
    }
  };

  const onPostItClick = () => {
    setCreateLoading(true);
    dispatch(
      updateApiLoading({
        loading: true,
        content: "Your post is uploading...",
      })
    );

    if (selectedMedia) {
      if (fileType === "image") {
        setonSubmit(true);
      } else {
        onPostIt();
      }
    } else {
      onPostIt();
    }
  };

  const onBackHandler = () => {
    router.back();
  };

  {
    /* 110 is margin values */
    /* 70 is header height */
  }
  let overallDynamicHeight =
    mediaContainerHeight +
    messageContainerHeight +
    topicContainerHeight +
    110 +
    70;

  //--------------------------------------render ui----------------------------------------//
  return (
    <>
      <View style={styles.container}>
        <Header
          backgroundColor={black}
          containerStyle={styles.headerContainerStyle}
          leftComponent={<BackButton onPress={onBackHandler} />}
          centerComponent={
            <View style={styles.centerComponent}>
              <Image
                style={styles.profilePicLogo}
                source={{
                  uri: profile_photo_small || DUMMY_AVATAR,
                }}
              />
              <MyText pageHeaders>CREATE POST</MyText>
            </View>
          }
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          ref={scrollViewRef}
          style={{
            height: overallDynamicHeight,
          }}>
          {/* <View
            style={styles.createInnerContainer}
            onLayout={(e) =>
              setMediaContainerHeight(e.nativeEvent.layout.height)
            }>
            <View style={styles.selectMediaContainer}>
              <MyText opacity={0.7} ml={windowMaxWidth > 500 ? 0 : 20}>
                Select Media
              </MyText>
              {!croppedMedia && (
                <Pressable
                  disabled={createPostLoading ? true : false}
                  onPress={() => inputRef?.current?.click()}
                  style={styles.seeAllButton}>
                  <CameraIcon />
                  <MyText ml={4}>Upload Media</MyText>

                  <input
                    ref={inputRef}
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      onSelectingImage(e);
                    }}
                    onClick={(event) => {
                      const { target = {} } = event || {};
                      target.value = "";
                    }}
                  />
                  <img id="previewImage" style={{ display: "none" }}></img>
                  <video id="previewVideo" style={{ display: "none" }}></video>
                </Pressable>
              )}
            </View>

            <View>
              {selectedMedia && (
                <View style={styles.cropperContainer}>
                  <Pressable
                    disabled={createLoading ? true : false}
                    onPress={() => {
                      setCroppedMedia(null);
                      setCompressedMedia(null);
                      setSelectedMedia(null);
                    }}
                    style={styles.closeMediaButton}>
                    <CloseIcon />
                  </Pressable>

                  {fileType === "image" ? (
                    <PostCropper
                      selectedMedia={selectedMedia}
                      setCroppedMedia={setCroppedMedia}
                      fileType={fileType}
                      onSubmit={onSubmit}
                    />
                  ) : (
                    <ReactPlayer
                      url={selectedMedia.uri}
                      style={{
                        width: windowMaxWidth,
                        height: "400",
                        alignSelf: "center",
                        resize: "contain",
                      }}
                      loop={true}
                      playing={true}
                    />
                  )}
                </View>
              )}
            </View>
          </View> */}

          <View
            style={styles.messageContiner}
            onLayout={(e) =>
              setMessageContainerHeight(e.nativeEvent.layout.height)
            }>
            <View style={styles.messageHeader}>
              <MyText opacity={0.7}>Write your message</MyText>
              <View>
                <MyText pageHeaders fontSize={12}>
                  {message.length} / 1000
                </MyText>
              </View>
            </View>

            <View style={styles.messageInputContainer}>
              <TextInput
                placeholderTextColor={black4}
                maxLength={1000}
                editable={createPostLoading || createLoading ? false : true}
                multiline={true}
                placeholder="What’s happening in sports?"
                numberOfLines={10}
                value={message}
                onChangeText={(value) => {
                  handleTextChange(value);
                }}
                className={"font-regular"}
                style={[
                  styles.messageInput,
                  { border: "0px", outline: "none", padding: 10 },
                ]}></TextInput>

              <MoneyInputHalf height={"100%"} fill={black4} />
            </View>
          </View>

          <View
            style={[
              styles.selectionContainer,
              windowMaxWidth <= 500 && { marginHorizontal: 16 },
            ]}
            onLayout={(e) =>
              settopicContainerHeight(e.nativeEvent.layout.height)
            }>
            <MyText opacity={0.7} mb={10}>
              Select Topic
            </MyText>

            <View style={styles.dropdowns}>
              <View style={styles.inputContainer}>
                <InputBox style={styles.inputBoxContainer} />
                <Pressable
                  disabled={createPostLoading || createLoading ? true : false}
                  onPress={() => setselectTopicModalize(true)}
                  style={styles.topicContainer}>
                  <View style={styles.title}>
                    <Plus />

                    <MyText textTransform={"capitalize"} ml={8} mr={5}>
                      {topic?.topic_name ? topic.topic_name : "Select Sport"}
                    </MyText>
                  </View>
                  <ChevronDown style={styles.icon} />
                </Pressable>
              </View>

              <View style={[styles.inputContainer]}>
                <InputBox
                  style={styles.inputBoxContainer}
                  color={!topic && white4}
                />
                <Pressable
                  disabled={createPostLoading || createLoading ? true : false}
                  onPress={() => {
                    if (topic) {
                      setselectSubTopicModalize(true);
                    }
                  }}
                  style={[styles.topicContainer]}>
                  <View style={styles.title}>
                    <Plus color={!topic && white3} />
                    <MyText
                      textTransform={"capitalize"}
                      ml={8}
                      mr={5}
                      opacity={!topic ? 0.2 : 1}>
                      {subTopic?.subtopic_name
                        ? subTopic.subtopic_name
                        : "Select Topic"}
                    </MyText>
                  </View>
                  <ChevronDown style={styles.icon} color={!topic && white3} />
                </Pressable>
              </View>
            </View>
          </View>

          {(selectedMedia || overallDynamicHeight > window.innerHeight) && (
            <View style={styles.tempButtonContainer}>
              <MyButton
                label="POST IT!"
                type="secondary"
                disabled={!((message || selectedMedia) && topic && subTopic)}
                loading={createLoading}
                width={windowMaxWidth - 30}
                mv={10}
                onPress={onPostItClick}
                disableOpacity={0.1}
              />
            </View>
          )}
        </ScrollView>

        {!(selectedMedia || overallDynamicHeight > window.innerHeight) && (
          <View style={styles.buttonContainer}>
            <MyButton
              label="POST IT!"
              type="secondary"
              disabled={!((message || selectedMedia) && topic && subTopic)}
              loading={createLoading}
              width={windowMaxWidth - 30}
              mv={10}
              onPress={onPostItClick}
              disableOpacity={0.25}
            />
          </View>
        )}

        {/*---------------------------------Modals-----------------------------------------*/}
        <SelectTopicModalize
          selectTopicModalize={selectTopicModalize}
          setselectTopicModalize={setselectTopicModalize}
          selectedTopic={topic}
          setTopic={setTopic}
          setSubTopic={setSubTopic}
        />
        <SelectSubTopicModalize
          subtopics={topic?.subtopics}
          selectSubTopicModalize={selectSubTopicModalize}
          setselectSubTopicModalize={setselectSubTopicModalize}
          selectedSubTopic={subTopic}
          setSubTopic={setSubTopic}
          selectedTopic={topic}
        />
        {showLimitation && (
          <LimitationErrorModalize
            setshowLimitation={setshowLimitation}
            limitationMessage={limitationMessage}
          />
        )}
      </View>
      {mentionText && (
        <MentionModal
          search={mentionText}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          // bottom={-100}
          onUserPress={selectUser}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: windowMaxWidth,
    alignSelf: "center",
    backgroundColor: black,
  },
  headerContainerStyle: {
    zIndex: 1,
  },
  centerComponent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  createContainer: {
    width: windowMaxWidth,
    alignSelf: "center",
  },
  createInnerContainer: {
    position: "relative",
    zIndex: 1,
  },
  selectMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  seeAllButton: {
    flexDirection: "row",
    backgroundColor: "rgba(115, 145, 255,0.4)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  permissionButton: {
    backgroundColor: primaryGreen,
    padding: 10,
    borderRadius: 4,
    alignSelf: "center",
  },
  cropperContainer: {
    marginVertical: 10,
    width: windowMaxWidth,
    alignSelf: "center",
  },
  closeMediaButton: {
    position: "absolute",
    borderRadius: 4,
    padding: 12,
    right: 0,
    marginRight: 10,
    marginTop: 4,
    zIndex: 1,
    backgroundColor: white,
  },
  previewContainer: {
    backgroundColor: black4,
    width: windowMaxWidth,
    alignSelf: "center",
  },
  previewScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  previewImage: {
    width: 105,
    height: 105,
    resizeMode: "cover",
    borderRadius: 5,
  },
  mentionText: {
    bottom: -50,
  },
  messageContiner: {
    marginLeft: windowMaxWidth > 500 ? 0 : 16,
    marginRight: 8,
    marginVertical: 20,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 6,
  },
  messageInputContainer: {
    flexDirection: "row",
  },
  messageInput: {
    flex: 1,
    backgroundColor: black4,
    textAlignVertical: "top",
    color: "white",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    maxHeight: 150,
    padding: 10,
    paddingTop: 10,
  },
  selectionContainer: {
    marginBottom: 30,
  },
  dropdowns: {
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    height: 40,
    width: windowMaxWidth < 370 ? (windowMaxWidth - 40) / 2 : 170,
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  inputBoxContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  topicContainer: {
    paddingVertical: 6,
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 25,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginBottom: -2.5,
  },
  tempButtonContainer: {
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  timer: {
    textAlign: "center",
    position: "absolute",
    right: 10,
    bottom: 5,
  },
});

export default CreatePost;
