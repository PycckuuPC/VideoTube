import React from 'react';
import { Link } from 'react-router-dom';
import type { HomePageVideos } from '../types';

export default function Card({ data }: { data: HomePageVideos }): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm">
      <Link to={`/watch/${data.videoId}`}>
        <div className="w-64 flex gap-3 flex-col pb-4 rounded-lg bg-gray-100 overflow-hidden">
          <div className="relative">
            <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
              {data.videoDuration}
            </span>

            <img src={data.videoThumbnail} alt="thumbnail" />
          </div>
          <div className="flex gap-2 px-2 pt-2">
            <div className="min-w-fit">
              <p>
                <img src={data.channelInfo.image} alt="channel" className="h-9 w-9 rounded-full" />
              </p>
            </div>
            <div>
              <h3>
                <p className="line-clamp-2">{data.videoTitle}</p>
              </h3>
              <div className="text-sm text-gray-400">
                <div>
                  <p className="hover:text-black">{data.channelInfo.name}</p>
                </div>
                <div>
                  <span className="after:content-['•'] after:mx-1">{data.videoViews} views</span>
                  <span>{data.videoAge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
