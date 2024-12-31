import { useEffect, useState } from "react";
import adminServices from "../../api/adminServices";
import Pagination from "../../components/common/Pagination";
import SearchBarTransition from "../../components/common/SearchBarTransition";

function AdminHome() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4;
    const [totalPage, setTotalPage] = useState(0); // Change ref to state for re-render

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await adminServices.getUserByPage(limit, currentPage);
                const data = res.response.data.metadata.data;
                setTotalPage(res.response.data.metadata.totalPage);
                setListUser(data);
            } catch (error) {
                console.log("An error occurred", error);
            }
        }
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="space-y-5 !overflow-y-visible ">
                <div className="m-4">
                    <SearchBarTransition search="account" size="1/4"></SearchBarTransition>
                </div>
                {listUser.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center p-2 border rounded-lg shadow-sm bg-white space-x-5 m-3"
                    >
                        <img
                            src={user?.avatar}
                            alt={`${user.username}'s avatar`}
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700 font-medium">Email: {user.email}</p>
                            <p className="text-sm text-gray-700 font-medium">Username: {user.username}</p>
                        </div>
                    </div>
                ))}
            </div>

            {totalPage > 0 && (
                <Pagination
                    totalPages={totalPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default AdminHome;
