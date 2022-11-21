/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Sticker {
  _id: number;
  name: string;
  category: string;
  key: number;
}
export interface AlbumType {
  category: string;
  stickers: Sticker[];
}
export interface CollectionSliceState {
  album: AlbumType[];
  userStickers: number[];
  regions: any;
}

const collectionInitialState: CollectionSliceState = {
  album: [],
  userStickers: [],
  regions: [],
};

const collection = createSlice({
  name: 'collection',
  initialState: collectionInitialState,
  reducers: {
    setAlbum(state, { payload }: PayloadAction<any>) {
      state.album = payload;
    },
    setRegions(state, { payload }: PayloadAction<any>) {
      state.regions = payload;
    },
    setUserStickers(state, { payload }: PayloadAction<any>) {
      state.userStickers = payload;
    },
    deleteUserSticker(state, { payload }: PayloadAction<any>) {
      state.userStickers[payload] -= 1;
    },
    addUserSticker(state, { payload }: PayloadAction<any>) {
      state.userStickers[payload] += 1;
    },
    emptyAlbumState(state) {
      state.album = [];
      state.userStickers = [];
    },
  },
});

export const {
  setAlbum,
  setUserStickers,
  deleteUserSticker,
  addUserSticker,
  emptyAlbumState,
  setRegions,
} = collection.actions;

export default collection.reducer;
