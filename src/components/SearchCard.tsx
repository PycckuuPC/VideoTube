import React from 'react';
import { Link } from 'react-router-dom';
import type { HomePageVideos } from '../types';

export default function SearchCard({ data }: { data: HomePageVideos }): JSX.Element {
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className="flex gap-3 bg-gray-100 rounded-xl w-9/12 p-1">
        <div className="relative">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {data.videoDuration}
          </span>
          <img src={data.videoThumbnail} className="h-52 w-96 rounded-xl" alt="thumbnail" />
        </div>
        <div className="flex gap-1 flex-col mt-2">
          <h3 className="max-w-2xl">
            <p className="line-clamp-2">{data.videoTitle}</p>
          </h3>
          <div className="text-xs text-grap-400">
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">{data.videoViews} views</span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
          <div className="min-w-fit my-2">
            <p className="flex items-center gap-2 text-xs">
              <img src={data.channelInfo.image} alt="channel" className="h-9 w-9 rounded-full" />
              <span>{data.channelInfo.name}</span>
            </p>
          </div>
          <div className="max-w-2xl line-clamp-2 text-sm">
            <p>{data.videoDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
