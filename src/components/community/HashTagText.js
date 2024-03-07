"use client";

import React, { memo, useEffect, useState } from "react";
import { Text, StyleSheet, Linking, Pressable } from "react-native-web";
import MyText from "../common/MyText";
import {
  black6,
  link,
  primaryBlue,
  primaryGreen,
} from "../../constants/theme/colors";
import { useDispatch } from "react-redux";
import { getPostsByUserId, getUserProfile } from "@/store/thunks/community";

const renderHyperlinkedText = (
  string,
  baseStyles = {},
  linkStyles = {},
  openLink
) => {
  if (typeof string !== "string") return null;
  const httpRegex = /http/g;
  const wwwRegex = /www/g;
  const comRegex = /.com/g;
  const httpType = httpRegex.test(string);
  const wwwType = wwwRegex.test(string);
  const comIndices = getMatchedIndices(comRegex, string);
  if (httpType || wwwType) {
    // Reset these regex indices because `comRegex` throws it off at its completion.
    httpRegex.lastIndex = 0;
    wwwRegex.lastIndex = 0;
    const httpIndices = httpType
      ? getMatchedIndices(httpRegex, string)
      : getMatchedIndices(wwwRegex, string);
    const result = [];
    let noLinkString = string.substring(0, httpIndices[0] || string.length);

    for (let i = 0; i < httpIndices.length; i++) {
      let index = string.indexOf("\n");

      if (index === -1) {
        index = string.length;
      }
      const linkString = noLinkString.substring(httpIndices[0], index);
      result.push(
        <Text
          key={linkString}
          style={[baseStyles, linkStyles]}
          // onPress={openLink ? () => openLink(linkString) : () => Linking.openURL(linkString)}
        >
          {linkString}
        </Text>
      );

      let addstring = string.substring(index, httpIndices[i + 1]);
      if (httpIndices.length > 1 && i === httpIndices.length - 1) {
        addstring = "";
      }
      if (addstring) {
        result.push(
          <Text key={noLinkString} style={baseStyles}>
            {addstring}{" "}
          </Text>
        );
      }
      noLinkString = string.substring(httpIndices[i + 1], string.length);
      // Make sure the parent `<View>` container has a style of `flexWrap: 'wrap'`
    }
    return result;
  }
  return <Text style={baseStyles}>{string}</Text>;
};

function getMatchedIndices(regex, text) {
  const result = [];
  let match;
  do {
    match = regex.exec(text);
    if (match) result.push(match.index);
  } while (match);
  return result;
}

function isMentionedUser(mentionedUsers, word) {
  let mentioned = false;
  if (mentionedUsers?.[word]) {
    mentioned = true;
  }

  return mentioned;
}

const HashTagText = React.memo(
  ({
    sentence = "",
    fullScreenPost = false,
    viewPost = () => {},
    mentionedUsers = {},
    maxLength = 250,
    ...props
  }) => {
    const [alterSentence, setalterSentence] = useState(sentence);
    const [readMore, setreadMore] = useState(false);

    const dispatch = useDispatch();
    const maxChar = maxLength;

    // Split the sentence into words

    const newLine = alterSentence.split("\n");

    let words = [];
    newLine.map((item, index) => {
      const word = item.split(" ");
      words = [...words, ...word, "\n"];
    });

    if (words[words.length - 1] === "\n") {
      words.pop();
    }

    const handleLinkPress = (url) => {
      if (url === "read" || url === "more") {
        viewPost();
        return;
      }
      Linking.openURL(url);
    };

    const handleProfilePress = (id) => {
      const user_id = mentionedUsers[id];
      if (user_id) {
        // rootNavigate("UsersProfile", "push", { navUserId: user_id });
        dispatch(getUserProfile({ userId: user_id, navigation: false }));
        dispatch(
          getPostsByUserId({
            page_number: 1,
            user_id: user_id,
            topic_id: "",
            subtopic_id: "",
          })
        );
      }
    };

    const handleHashTagPress = (hashTag) => {
      // rootNavigate("Search", "navigate", { searchText: hashTag });
    };

    useEffect(() => {
      if (!fullScreenPost && sentence.length > maxChar) {
        setalterSentence(sentence.substring(0, maxChar) + "...");
        setreadMore(true);
      } else {
        setalterSentence(sentence);
        setreadMore(false);
      }
    }, [fullScreenPost, sentence]);

    return (
      <MyText mt={8} fontSize={10} style={styles.container}>
        {words.map((word, index) => {
          // Check if the word contains a "#" symbol
          const isHashTag = word.includes("#");

          const isMention =
            word[0] === "@" &&
            isMentionedUser(mentionedUsers, word.substring(1));

          // Check if the word is a link (assuming links start with "http" or "https")
          const isLink =
            word.startsWith("http") ||
            word.startsWith("https") ||
            word === "Read More";

          // Define the style based on the presence of the "#" symbol or if it's a link
          const wordStyle = isHashTag
            ? styles.blueText
            : isLink
            ? styles.linkText
            : isMention
            ? styles.mentionText
            : styles.normalText;
          let addSpace = words?.[index - 1] === "\n" || !index ? "" : " ";
          // If it's a link, wrap it in a TouchableOpacity to make it tappable
          if (isLink) {
            return (
              <MyText
                mt={8}
                fontSize={16}
                key={index}
                onPress={() => handleLinkPress(word)}
                style={[wordStyle]}
                paragraphText>
                {renderHyperlinkedText(word, wordStyle, styles.link)}
              </MyText>
            );
          } else if (isMention) {
            return (
              <MyText
                mt={8}
                fontSize={16}
                key={index}
                onPress={() => handleProfilePress(word.substring(1))}
                style={wordStyle}
                paragraphText>
                {addSpace}
                {word}
              </MyText>
            );
          } else if (isHashTag) {
            return (
              <MyText
                mt={8}
                fontSize={16}
                key={index}
                onPress={() => handleHashTagPress(word.substring(1))}
                style={wordStyle}
                paragraphText>
                {addSpace}
                {word}
              </MyText>
            );
          } else {
            return (
              <MyText
                mt={8}
                fontSize={16}
                key={index}
                style={wordStyle}
                {...props}
                paragraphText>
                {addSpace}
                {word}
              </MyText>
            );
          }
        })}

        {readMore && (
          <Pressable
            onPress={() => {
              viewPost();
            }}>
            <MyText fontSize={16} style={styles.link}>
              {"Read More"}
            </MyText>
          </Pressable>
        )}
      </MyText>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  blueText: {
    color: primaryGreen,
  },
  normalText: {
    color: black6,
  },
  link: {
    textDecorationLine: "underline",
    color: link,
  },
  mentionText: {
    color: primaryBlue,
  },
});

export default memo(HashTagText);
