import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import InfoUserComment from "./InfoUserComment";
import ActionComment from "./ActionComment";

// Helper function to format comment content
const renderCommentContent = (content, userName) => {
  if (!content) return null;

  return (
    <View className="mb-3">
      <Text className="text-gray-800 leading-5">{content}</Text>
    </View>
  );
};

const RenderReply = React.memo(({ reply, currentUser }) => {
  return (
    <View className="mt-2 ml-8 bg-gray-100 rounded-lg p-3">
      <InfoUserComment
        userName={reply.name}
        time={reply.createdAt}
        userAvatar={reply.avatar}
      />
      <View>{renderCommentContent(reply.content, reply.name)}</View>
    </View>
  );
});

const RenderComment = React.memo(
  ({ item, onReply, navigation, currentUser, isReplying }) => {
    const [showReplies, setShowReplies] = useState(false);

    const toggleReplies = useCallback(() => {
      setShowReplies((prev) => !prev);
    }, []);

    const handleReply = useCallback(() => {
      if (onReply) {
        onReply(item.id, item.name);
      }
    }, [item.id, item.name, onReply]);

    const replyCount =
      item.replies && Array.isArray(item.replies) ? item.replies.length : 0;

    return (
      <View className="mb-4 bg-gray-50 rounded-xl p-4 shadow-sm">
        <InfoUserComment
          userName={item.name}
          time={item.createdAt}
          userAvatar={item.avatar}
        />
        <View>{renderCommentContent(item.content, item.name)}</View>
        <ActionComment
          onReply={handleReply}
          commentData={{
            id: item.id,
            userName: item.name,
          }}
        />

        {replyCount > 0 && (
          <TouchableOpacity onPress={toggleReplies} className="mt-1 mb-2">
            <Text className="text-gray-500 text-sm">
              {showReplies
                ? "Hide replies"
                : `View ${replyCount} ${
                    replyCount === 1 ? "reply" : "replies"
                  }`}
            </Text>
          </TouchableOpacity>
        )}

        {showReplies && replyCount > 0 && (
          <View className="mt-2">
            {item.replies.map((reply, index) => (
              <RenderReply
                key={`reply-${item.id}-${index}`}
                reply={reply}
                currentUser={currentUser}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
);

export default RenderComment;
