import React from 'react';
import { Link } from 'react-router-dom';
import type { RecommendedVideos } from '../types';

export default function WatchCard({ data }: { data: RecommendedVideos }): JSX.Element {
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className="flex gap-3 bg-gray-100 rounded-md p-2">
        <div className="relative min-w-fit">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {data.videoDuration}
          </span>
          <img src={data.videoThumbnail} className="h-24 w-40 rounded-md" alt="thumbnail" />
        </div>
        <div className="flex gap-1 flex-col">
          <h4 className="text-sm">
            <p className="line-clamp-2">{data.videoTitle}</p>
          </h4>
          <div className="text-xs text-grap-400">
            <div>
              <p className="hover:text-white">{data.channelInfo.name}</p>
            </div>
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">{data.videoViews} views</span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
