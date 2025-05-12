import React, {
  useState,
  useEffect,
  useCallback,
  TouchableOpacity,
} from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Text,
} from "react-native";
import RenderComment from "@components/comment/RenderComment";
import useAuthStore from "@store/authStore";
import ActionSendComment from "@components/comment/ActionSendComment";
import useCommentStore from "@store/commentStore";

export default function CommentScreen({ navigation, id }) {
  const user = useAuthStore((state) => state.user);
  const CURRENT_USER = user.name;
  const {
    listComment: comments,
    loading,
    fetchComment,
    loadMoreComments,
    resetComments,
    hasMoreComments,
    addComment,
  } = useCommentStore();

  const [isReplying, setIsReplying] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const listFooterComponent = useCallback(() => {
    if (loading) {
      return (
        <View className="py-4 flex items-center">
          <ActivityIndicator size="small" color="#000000" />
        </View>
      );
    }

    if (!hasMoreComments && comments.length > 0) {
      return (
        <View className="py-4 flex items-center">
          <Text className="text-gray-500">No more comments</Text>
        </View>
      );
    }

    if (hasMoreComments && comments.length > 0) {
      return (
        <TouchableOpacity
          onPress={handleLoadMore}
          className="py-4 flex items-center"
        >
          <Text className="text-blue-500 font-semibold">
            Load more comments
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  }, [loading, hasMoreComments, comments.length]);

  const handleReply = (commentId, userName) => {
    setIsReplying(true);
    setReplyingTo({
      id: commentId,
      name: userName,
    });
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    try {
      if (isReplying && replyingTo) {
        await useCommentStore
          .getState()
          .replyComment(replyingTo.id, commentText);
        cancelReply();
      } else {
        await addComment(id, commentText);
        await fetchComment(id, 1);
        setCommentText("");
      }
    } catch (error) {
      console.error("Failed to send comment:", error);
    }
  };

  const cancelReply = () => {
    setIsReplying(false);
    setReplyingTo(null);
    setCommentText("");
  };

  const renderItem = ({ item }) => (
    <RenderComment
      item={item}
      onReply={handleReply}
      navigation={navigation}
      currentUser={CURRENT_USER}
      isReplying={isReplying}
    />
  );

  const handleLoadMore = () => {
    if (hasMoreComments && !loading) {
      loadMoreComments(id);
    }
  };

  useEffect(() => {
    resetComments();
    fetchComment(id, 1);
    return () => {
      resetComments();
    };
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={listFooterComponent}
        ListEmptyComponent={
          !loading ? (
            <View className="py-10 flex items-center">
              <Text className="text-gray-500">Chưa có comment nào!!</Text>
            </View>
          ) : null
        }
      />
      <ActionSendComment
        isReplying={isReplying}
        replyingTo={replyingTo?.name}
        onCancel={cancelReply}
        value={commentText}
        onChangeText={setCommentText}
        onSend={handleSendComment}
      />
    </SafeAreaView>
  );
}
