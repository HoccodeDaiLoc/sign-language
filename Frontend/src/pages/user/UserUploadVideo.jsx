const UserUploadVideo = () => {
  return (
    <>
      <div className="flex h-[100%] text-[#0f5132]">
        <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Danh sách Video</h2>
          <ul>
            <li className="mb-2 p-2 bg-white rounded shadow-md hover:bg-gray-50">
              <span>Video 1</span>
            </li>
            <li className="mb-2 p-2 bg-white rounded shadow-md hover:bg-gray-50">
              <span>Video 2</span>
            </li>
            <li className="mb-2 p-2 bg-white rounded shadow-md hover:bg-gray-50">
              <span>Video 3</span>
            </li>
            <li className="mb-2 p-2 bg-white rounded shadow-md hover:bg-gray-50">
              <span>Video 4</span>
            </li>
          </ul>
        </div>

        <div className="w-3/4 p-6">
          <h2 className="text-2xl font-semibold mb-4">Tải Video Lên</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="video"
                  className="block font-semibold mb-2"
                >
                  Chọn video để tải lên:
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Tải Video Lên
              </button>
            </form>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Nhận Video</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>Video bạn đã tải lên sẽ được hiển thị ở đây.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUploadVideo;
