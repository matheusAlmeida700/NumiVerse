import React from "react";

const MusicPlayer = () => {
  return (
    <div className="flex flex-col items-center group/he select-none">
      <div className="relative z-0 h-16 -mb-2 transition-all duration-200 group-hover/he:h-0">
        <svg
          width={128}
          height={128}
          viewBox="0 0 128 128"
          className="duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5 animate-[spin_3s_linear_infinite] transition-all"
        >
          <svg>
            <rect width={128} height={128} fill="black" />
            <circle cx={20} cy={20} r={2} fill="white" />
            <circle cx={40} cy={30} r={2} fill="white" />
            <circle cx={60} cy={10} r={2} fill="white" />
            <circle cx={80} cy={40} r={2} fill="white" />
            <circle cx={100} cy={20} r={2} fill="white" />
            <circle cx={120} cy={50} r={2} fill="white" />
            <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
            <circle cx={90} cy={30} r={8} fill="white" />
            <path
              d="M0 128 Q32 64 64 128 T128 128"
              fill="purple"
              stroke="black"
              strokeWidth={1}
            />
            <path
              d="M0 128 Q32 48 64 128 T128 128"
              fill="mediumpurple"
              stroke="black"
              strokeWidth={1}
            />
            <path
              d="M0 128 Q32 32 64 128 T128 128"
              fill="rebeccapurple"
              stroke="black"
              strokeWidth={1}
            />
            <path
              d="M0 128 Q16 64 32 128 T64 128"
              fill="purple"
              stroke="black"
              strokeWidth={1}
            />
            <path
              d="M64 128 Q80 64 96 128 T128 128"
              fill="mediumpurple"
              stroke="black"
              strokeWidth={1}
            />
          </svg>
        </svg>
        <div className="absolute z-10 w-8 h-8 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-12 left-12" />
      </div>
      <div className="z-30 flex flex-col w-40 h-20 transition-all duration-300 bg-black shadow-md group-hover/he:h-40 group-hover/he:w-72 rounded-2xl shadow-zinc-400">
        <div className="flex flex-row w-full h-0 group-hover/he:h-20">
          <div className="relative flex items-center justify-center w-24 h-24 group-hover/he:-top-6 group-hover/he:-left-4 opacity-0 group-hover/he:animate-[spin_3s_linear_infinite] group-hover/he:opacity-100 transition-all duration-100">
            <svg
              width={96}
              height={96}
              viewBox="0 0 128 128"
              className="duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5"
            >
              <svg>
                <rect width={128} height={128} fill="black" />
                <circle cx={20} cy={20} r={2} fill="white" />
                <circle cx={40} cy={30} r={2} fill="white" />
                <circle cx={60} cy={10} r={2} fill="white" />
                <circle cx={80} cy={40} r={2} fill="white" />
                <circle cx={100} cy={20} r={2} fill="white" />
                <circle cx={120} cy={50} r={2} fill="white" />
                <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
                <circle cx={90} cy={30} r={8} fill="white" />
                <path
                  d="M0 128 Q32 64 64 128 T128 128"
                  fill="purple"
                  stroke="black"
                  strokeWidth={1}
                />
                <path
                  d="M0 128 Q32 48 64 128 T128 128"
                  fill="mediumpurple"
                  stroke="black"
                  strokeWidth={1}
                />
                <path
                  d="M0 128 Q32 32 64 128 T128 128"
                  fill="rebeccapurple"
                  stroke="black"
                  strokeWidth={1}
                />
                <path
                  d="M0 128 Q16 64 32 128 T64 128"
                  fill="purple"
                  stroke="black"
                  strokeWidth={1}
                />
                <path
                  d="M64 128 Q80 64 96 128 T128 128"
                  fill="mediumpurple"
                  stroke="black"
                  strokeWidth={1}
                />
              </svg>
            </svg>
            <div className="absolute z-10 w-6 h-6 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-9 left-9" />
          </div>
          <div className="flex flex-col justify-center w-full pl-3 -ml-24 overflow-hidden group-hover/he:-ml-3 text-nowrap">
            <p className="text-xl font-bold">Music Name</p>
            <p className="text-zinc-600">Singer &amp; artist</p>
          </div>
        </div>
        <div className="flex flex-row mx-3 mt-3 bg-gray-200 rounded-md min-h-4 group-hover/he:mt-0">
          <span className="hidden pl-3 text-sm text-zinc-600 group-hover/he:inline-block">
            0:00
          </span>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            className="w-24 group-hover/he:w-full flex-grow h-1 mx-2 my-auto bg-gray-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="hidden pr-3 text-sm text-zinc-600 group-hover/he:inline-block">
            3:45
          </span>
        </div>
        <div className="flex flex-row items-center justify-center flex-grow mx-3 space-x-5">
          <label
            htmlFor="playMode"
            className="flex items-center justify-center w-0 h-full cursor-pointer group-hover/he:w-12"
          >
            <input
              type="checkbox"
              id="playMode"
              className="hidden peer/playMode"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-repeat peer-checked/playMode:hidden"
            >
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden feather feather-shuffle peer-checked/playMode:inline-block"
            >
              <polyline points="16 3 21 3 21 8" />
              <line x1={4} y1={20} x2={21} y2={3} />
              <polyline points="21 16 21 21 16 21" />
              <line x1={15} y1={15} x2={21} y2={21} />
              <line x1={4} y1={4} x2={9} y2={9} />
            </svg>
          </label>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-back"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1={5} y1={19} x2={5} y2={5} />
            </svg>
          </div>
          <label
            htmlFor="playStatus"
            className="flex items-center justify-center w-12 h-full cursor-pointer"
          >
            <input
              type="checkbox"
              name="playStatus"
              id="playStatus"
              className="hidden peer/playStatus"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-play peer-checked/playStatus:hidden"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden feather feather-pause peer-checked/playStatus:inline-block"
            >
              <rect x={6} y={4} width={4} height={16} />
              <rect x={14} y={4} width={4} height={16} />
            </svg>
          </label>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-forward"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1={19} y1={5} x2={19} y2={19} />
            </svg>
          </div>
          <div className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-0 feather feather-list group-hover/he:w-12"
            >
              <line x1={8} y1={6} x2={21} y2={6} />
              <line x1={8} y1={12} x2={21} y2={12} />
              <line x1={8} y1={18} x2={21} y2={18} />
              <line x1={3} y1={6} x2="3.01" y2={6} />
              <line x1={3} y1={12} x2="3.01" y2={12} />
              <line x1={3} y1={18} x2="3.01" y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
