import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import InfoUserComment from "./InfoUserComment";
import ActionComment from "./ActionComment";

const RenderComment = React.memo(
  ({ item, onReply, navigation, currentUser }) => {
    const [showAllReplies, setShowAllReplies] = useState(false);

    const renderCommentContent = (content, mentionedUser, authorName) => {
      if (!content) return null;

      const isSelfReply =
        mentionedUser && mentionedUser.username === authorName;
      if (!mentionedUser || isSelfReply) {
        return <Text className="text-gray-800">{content}</Text>;
      }
      return (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (navigation) {
                navigation.navigate("UserProfile", {
                  username: mentionedUser.username,
                });
              }
            }}
          >
            <Text
              style={{
                backgroundColor: "#e0f7fa",
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4,
                overflow: "hidden",
                color: "#0277bd",
                fontWeight: "500",
              }}
            >
              @{mentionedUser.username}
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-800">{" " + content}</Text>
        </View>
      );
    };

    const shouldShowViewMoreButton = item.replies && item.replies.length > 3;

    return (
      <View className="mb-4 bg-white rounded-xl p-4 shadow-lg">
        <InfoUserComment
          userName={item.userName}
          time={item.time}
          userAvatar={item.userAvatar}
        />
        <View>
          {renderCommentContent(
            item.content,
            item.mentionedUser,
            item.userName
          )}
        </View>
        <ActionComment onReply={() => onReply(item.id)} commentId={item.id} />

        {/* Hiển thị replies */}
        {item.replies && item.replies.length > 0 && (
          <View
            className="mt-4 pl-4 border-l border-gray-100 p-1"
            style={{
              borderLeftWidth: 1,
              borderLeftColor: "rgba(0,0,0,0.1)",
              paddingLeft: 8,
            }}
          >
            {shouldShowViewMoreButton && !showAllReplies ? (
              <>
                {item.replies.slice(0, 3).map((reply) => (
                  <View key={reply.id} className="mb-3">
                    <InfoUserComment
                      userName={reply.userName}
                      time={reply.time}
                      userAvatar={reply.userAvatar}
                    />
                    <View className="mb-1">
                      {renderCommentContent(
                        reply.content,
                        reply.mentionedUser,
                        reply.userName
                      )}
                    </View>
                    <ActionComment
                      onReply={() => onReply(reply.id, item.id, reply)}
                      commentId={reply.id}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  className="mt-2"
                  onPress={() => setShowAllReplies(true)}
                >
                  <Text className="text-blue-500">
                    Xem thêm {item.replies.length - 3} reply
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              item.replies.map((reply) => (
                <View key={reply.id} className="mb-3">
                  <InfoUserComment
                    userName={reply.userName}
                    time={reply.time}
                    userAvatar={reply.userAvatar}
                  />
                  <View className="mb-1">
                    {renderCommentContent(
                      reply.content,
                      reply.mentionedUser,
                      reply.userName
                    )}
                  </View>
                  <ActionComment
                    onReply={() => onReply(reply.id, item.id, reply)}
                    commentId={reply.id}
                  />
                </View>
              ))
            )}
            {shouldShowViewMoreButton && showAllReplies && (
              <TouchableOpacity
                className="mt-2"
                onPress={() => setShowAllReplies(false)}
              >
                <Text className="text-blue-500">Ẩn bớt</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
);

export default RenderComment;
