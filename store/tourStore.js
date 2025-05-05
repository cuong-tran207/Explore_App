import { create } from "zustand";
import apiServer from "@utils/api";

const useTourStore = create((set, get) => ({
  introduceTours: [],
  popularTours: [],
  loading: false,
  error: null,

  fetchIntroduceTours: async () => {
    try {
      set({ loading: true });
      const response = await apiServer.call("introduce/list");
      if (response.data) {
        set({
          introduceTours: response.data.results,
          error: null,
        });
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Error fetching introduce tours:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchPopularTours: async () => {
    try {
      set({ loading: true });
      const response = await apiServer.call("tours/popular");
      if (response.data) {
        set({
          popularTours: response.data,
          error: null,
        });
      }
    } catch (error) {
      set({ error: error.message });
      console.error("Error fetching popular tours:", error);
    } finally {
      set({ loading: false });
    }
  },

  clearTours: () => {
    set({
      introduceTours: [],
      popularTours: [],
      loading: false,
      error: null,
    });
  },

  refreshTours: async () => {
    try {
      set({ loading: true });
      const [introduceRes, popularRes] = await Promise.all([
        apiServer.call("tours/introduce"),
        apiServer.call("tours/popular"),
      ]);

      set({
        introduceTours: introduceRes.data || [],
        popularTours: popularRes.data || [],
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
      console.error("Error refreshing tours:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTourStore;
