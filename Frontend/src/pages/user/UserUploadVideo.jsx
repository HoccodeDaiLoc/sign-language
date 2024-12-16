const UserUploadVideo = () => {
  return (
    <>
      <div className="flex h-[100%]">
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Danh sách Video</h2>
          <ul>
            <li className="mb-2 p-2 bg-gray-100 rounded shadow-md hover:bg-gray-200">
              <span className="text-gray-800">Video 1</span>
            </li>
            <li className="mb-2 p-2 bg-gray-100 rounded shadow-md hover:bg-gray-200">
              <span className="text-gray-800">Video 2</span>
            </li>
            <li className="mb-2 p-2 bg-gray-100 rounded shadow-md hover:bg-gray-200">
              <span className="text-gray-800">Video 3</span>
            </li>
            <li className="mb-2 p-2 bg-gray-100 rounded shadow-md hover:bg-gray-200">
              <span className="text-gray-800">Video 4</span>
            </li>
          </ul>
        </div>

        <div className="w-3/4 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tải Video Lên</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="video"
                  className="block font-semibold mb-2 text-gray-800"
                >
                  Chọn video để tải lên:
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  className="w-full p-2 border border-gray-400 rounded-md"
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nhận Video</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-800">Video bạn đã tải lên sẽ được hiển thị ở đây.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUploadVideo;
