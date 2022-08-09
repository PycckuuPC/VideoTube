import React from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsYoutube } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../redux/slices/videosSlice';
import { getSearchPageVideos } from '../redux/slices/thunks';

export default function Navbar(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.videos.searchTerm);

  const handleSearch = (): void => {
    if (location.pathname !== '/search') navigate('/search');
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center px-6 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 items-center text-2xl">
        <Link
          to="/"
          onClick={() => {
            handleSearch();
            dispatch(clearSearchTerm());
          }}
        >
          <div className="flex gap-1 items-center justify-center">
            <BsYoutube className="text-3xl text-red-600 max-md:mr-6 max-md:hidden" />
            <span className="text-xl font-medium text-white mr-6 max-md:hidden">VideoTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5 max-md:w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex bg-gray-100 items-center h-10 px-4 pr-0 rounded-lg">
            <div className="flex gap-4 items-center pr-5 bg-gray-100">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-96 bg-gray-100 focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />

              <AiOutlineClose
                className={`text-xl cursor-pointer ${!searchTerm ? 'invisible' : 'visible'}`}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            <button
              type="button"
              className="h-10 w-16 flex items-center justify-center bg-gray-300 rounded-r-lg"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
