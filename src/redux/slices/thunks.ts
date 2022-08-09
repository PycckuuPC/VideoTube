import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import type { HomePageVideos, RecommendedVideos } from '../../types';
import { convertRawViewstoString, timeSince, parseData, parseRecommendedData } from '../../utils';
import { YOUTUBE_API_URL } from '../../utils/constants';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;

export const getHomePageVideos = createAsyncThunk(
  'videos/homePageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      videos: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ''
      }`,
    );
    console.log({ items, nextPageTokenFromState, nextPageToken });
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  },
);

export const getRecommendedVideos = createAsyncThunk(
  'yotubeApp/getRecommendedVideos',
  async (videoId: string, { getState }) => {
    const {
      videos: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;

    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`,
    );

    const parsedData: RecommendedVideos[] = await parseRecommendedData(items, videoId);

    return { parsedData };
  },
);

export const getSearchPageVideos = createAsyncThunk(
  'videos/searchPageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      videos: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ''
      }`,
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  },
);

const parseVideoData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`,
  );

  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
};

export const getVideoDetails = createAsyncThunk('yotubeApp/videoDetails', async (id: string) => {
  const {
    data: { items },
  } = await axios.get(
    `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`,
  );

  return parseVideoData(items[0]);
});
