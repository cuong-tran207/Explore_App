import { create } from "zustand";
import apiServer from "@utils/api";

const useCommentStore = create((set, get) => ({
  listComment: [],
  repliesComment: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMoreComments: true,

  fetchComment: async (id, page = 1) => {
    try {
      set({ loading: true, error: null });
      const res = await apiServer.call(`comment/list/${id}?page=${page}`);
      console.log("res :", res);

      const newComments = Array.isArray(res.data)
        ? res.data.map((comment) => ({
            ...comment,
            replies: JSON.parse(comment.replies || "[]"),
          }))
        : [];

      const hasMore = newComments.length > 0;

      set((state) => ({
        listComment:
          page === 1 ? newComments : [...state.listComment, ...newComments],
        loading: false,
        currentPage: page,
        hasMoreComments: hasMore,
      }));

      return newComments;
    } catch (error) {
      console.log("error :", error);
      set({ loading: false, error: error.message });
      return [];
    }
  },

  loadMoreComments: async (id) => {
    const { currentPage, hasMoreComments, loading } = get();

    if (!hasMoreComments || loading) return;

    const nextPage = currentPage + 1;
    const newComments = await get().fetchComment(id, nextPage);

    // If we received fewer comments than expected or none, there are no more to load
    if (newComments.length === 0) {
      set({ hasMoreComments: false });
    }
  },

  resetComments: () => {
    set({
      listComment: [],
      currentPage: 1,
      hasMoreComments: true,
    });
  },

  addComment: async (introduceId, content) => {
    try {
      set({ loading: true, error: null });
      const res = await apiServer.call("comment/add", {
        introduceId,
        content,
      });
      console.log("res new:", res);

      if (res.data) {
        const newComment = {
          ...res.data,
          replies: [],
        };

        set((state) => ({
          listComment: [...state.listComment, newComment],
          loading: false,
        }));
      } else {
        set({ loading: false });
      }

      return res.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  replyComment: async (commentId, content) => {
    try {
      set({ loading: true, error: null });
      const res = await apiServer.call("comment/reply", {
        commentId,
        content,
      });
      console.log("res reply:", res);

      if (res.data) {
        set((state) => ({
          listComment: state.listComment.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...res.data],
              };
            }
            return comment;
          }),
          loading: false,
        }));
      } else {
        set({ loading: false });
      }

      return res.data;
    } catch (error) {
      console.error("Error replying to comment:", error);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  onReply: () => {},
}));

export default useCommentStore;
