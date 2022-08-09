import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchCard from '../components/SearchCard';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import type { HomePageVideos } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearVideos } from '../redux/slices/videosSlice';
import { getSearchPageVideos } from '../redux/slices/thunks';

export default function Search(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos.videos);
  const searchTerm = useAppSelector((state) => state.videos.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === '') navigate('/');
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
            >
              {videos.map((item: HomePageVideos) => (
                <div className="my-5">
                  <SearchCard data={item} key={item.videoId} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
