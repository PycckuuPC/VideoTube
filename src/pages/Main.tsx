import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../redux/slices/videosSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getHomePageVideos } from '../redux/slices/thunks';
import type { HomePageVideos } from '../types';

export default function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
          >
            <div className="flex flex-wrap justify-center gap-6 my-6">
              {videos.map((item: HomePageVideos) => (
                <Card data={item} key={item.videoId} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
