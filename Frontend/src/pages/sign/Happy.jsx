import React from 'react';

const UserSearchHappy = () => {
  return (
    <div className="flex justify-start items-start px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl flex flex-row gap-12">
        {/* Container chính với flex-row để video và nội dung nằm ngang */}

        {/* Phần video */}
        <div className="w-3/4">
          <video
            id="video-player"
            className="w-full h-auto rounded-lg"
            controls
            poster="/video-poster.jpg"
          >
            <source src="https://www.signingsavvy.com/media2/mp4-ld/23/23649.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
        {/* Phần "Cách làm ký hiệu" */}
        <div className="w-1/4 flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-6" style={{color:'#67aaad'}}>ký hiệu: Happy</h1>
          <p className="text-lg leading-7">
          Đưa mu tay phải lên giữa ngực, với các ngón tay duỗi
          Di chuyển tay từ sau ra phía trước, giống như bạn đang thể hiện cảm giác vui vẻ hoặc hạnh phúc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSearchHappy;
