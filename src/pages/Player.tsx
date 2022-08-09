import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRecommendedVideos, getVideoDetails } from '../redux/slices/thunks';
import Navbar from '../components/Navbar';
import WatchCard from '../components/WatchCard';

export default function Player(): JSX.Element {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector((state) => state.videos.currentPlaying);
  const recommendedVideos = useAppSelector((state) => state.videos.recommendedVideos);

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate('/');
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  return (
    <div>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen">
          <div style={{ height: '7.5vh' }}>
            <Navbar />
          </div>
          <div className="flex w-full" style={{ height: '92.5vh' }}>
            <div className="flex gap-y-10 gap-x-5 p-7 mx-20 mr-0 w-full overflow-auto">
              <div>
                <div>
                  <iframe
                    width="800"
                    height="502"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl overflow-hidden"
                  />
                  <div className="mt-5 px-4">
                    <p className="text-xl">{currentPlaying.videoTitle}</p>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>
                      <div className="flex items-center gap-4 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-xl" />
                          <strong>{currentPlaying.videoLikes}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div>
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt=""
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div className="w-5/6">
                          <h5 className="text-sm">
                            <strong>{currentPlaying.channelInfo.name}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus ? 'max-h-16 overflow-hidden' : ''
                        } text-sm w-11/12`}
                      >
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="uppercase text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? 'less' : 'more'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-24 flex flex-col gap-3">
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => <WatchCard data={item} key={item.videoId} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
