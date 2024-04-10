import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(`/posts`);
  return data;
});

export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get(`/tags`);
  return data;
});
export const fetchPostsTagsSuccess = (tag) => ({
    type: "posts/fetchPostsTagsSuccess",
    payload: tag,
  });
  ;

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  selectedTag: "",
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedTags(state, action) {
      state.selectedTag = action.payload;
    },
    fetchPostsTagsSuccess(state, action) {
        state.selectedTag = action.payload;
      },

  },
  extraReducers: {
    // Получение статтей
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // Получение популярный статей
    [fetchPopularPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    //   Удаление
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postSlice.reducer;
export const { setSelectedTags } = postSlice.actions;
