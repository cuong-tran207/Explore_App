// CommentScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { initialComments } from "@utils/TestData";
import RenderComment from "@components/comment/RenderComment";
import useAuthStore from "@store/authStore";
import ActionSendComment from "@components/comment/ActionSendComment";

export default function CommentScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const CURRENT_USER = user.name;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyToId, setReplyToId] = useState(null);
  const [replyToUser, setReplyToUser] = useState(null);
  const [replyToParentId, setReplyToParentId] = useState(null);
  const ITEMS_PER_PAGE = 10;

  const [allComments, setAllComments] = useState(
    initialComments.map((comment) => ({
      ...comment,
      mentionedUser: null,
      replies: comment.replies
        ? comment.replies.map((reply) => ({
            ...reply,
            mentionedUser: null,
          }))
        : [],
    }))
  );

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = useCallback(() => {
    if (!hasMoreComments || loading) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;
      const newComments = allComments.slice(startIndex, endIndex);

      if (newComments.length > 0) {
        setComments((prevComments) => [...prevComments, ...newComments]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreComments(false);
      }

      setLoading(false);
    }, 1000);
  }, [allComments, hasMoreComments, loading, page]);

  const handlePostComment = useCallback(
    (newCommentText) => {
      if (!newCommentText.trim()) return;

      let actualContent = newCommentText;
      let mentionedUser = null;

      // Handle reply to a user
      if (replyToUser) {
        // Remove @username from content
        actualContent = newCommentText
          .replace(`@${replyToUser.userName}`, "")
          .trim();

        // Keep mention if not replying to yourself
        if (replyToUser.userName !== CURRENT_USER) {
          mentionedUser = {
            id: replyToUser.id,
            username: replyToUser.userName,
          };
        }
      }

      const newCommentObj = {
        id: Date.now().toString(),
        userName: CURRENT_USER,
        userAvatar: user.avatar,
        time: "Just now",
        content: actualContent,
        mentionedUser: mentionedUser,
        upvotes: 0,
        replies: [],
      };

      let updatedComments;

      // Case: reply to a level 1 comment
      if (replyToId && !replyToParentId) {
        updatedComments = comments.map((comment) => {
          if (comment.id === replyToId) {
            return {
              ...comment,
              replies: [...comment.replies, newCommentObj],
            };
          }
          return comment;
        });
      }
      // Case: reply to a level 2 comment
      else if (replyToId && replyToParentId) {
        updatedComments = comments.map((comment) => {
          if (comment.id === replyToParentId) {
            return {
              ...comment,
              replies: [...comment.replies, newCommentObj],
            };
          }
          return comment;
        });
      }
      // Case: new comment
      else {
        updatedComments = [...comments, newCommentObj];
      }

      setComments(updatedComments);
      setAllComments((prev) => [...prev, newCommentObj]); // Update total list

      // Reset reply state
      setReplyToId(null);
      setReplyToUser(null);
      setReplyToParentId(null);
    },
    [comments, replyToId, replyToUser, replyToParentId, user, CURRENT_USER]
  );

  const handleReply = useCallback(
    (replyId, parentId, replyUser) => {
      // If no user is passed, find user from commentId
      if (!replyUser) {
        const commentToReply = comments.find(
          (comment) => comment.id === replyId
        );
        if (commentToReply) {
          setReplyToId(replyId);
          setReplyToUser(commentToReply);
          setReplyToParentId(null);
        }
      }
      // If replying to a level 2 comment
      else {
        setReplyToId(replyId);
        setReplyToUser(replyUser);
        setReplyToParentId(parentId);
      }
      if (replyUser) {
        // If replyUser is already set, toggle it to force the effect to run again
        setReplyToUser(null);
        setTimeout(() => {
          setReplyToUser(replyUser);
        }, 10);
      }
    },
    [comments]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <RenderComment
            item={item}
            onReply={handleReply}
            navigation={navigation}
            currentUser={CURRENT_USER}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={loadComments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? (
            <View className="py-4 flex items-center">
              <ActivityIndicator size="small" color="#000000" />
            </View>
          ) : null
        }
      />
      <ActionSendComment
        onPostComment={handlePostComment}
        initialReplyUser={replyToUser}
      />
    </SafeAreaView>
  );
}
