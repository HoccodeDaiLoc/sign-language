import { useEffect, useState } from "react";
import adminServices from "../../api/adminServices";
import defaultava from '../../assets/svg/person.svg';
import Pagination from "../../components/common/Pagination";

function AdminHome() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 4;

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await adminServices.getAllUser(usersPerPage)
                const data = res.response.data.metadata;
                setListUser(data)
            } catch (error) {
                console.log("An error occurred", error);
            }
        }
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="space-y-5 !overflow-y-visible">
                {listUser.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center p-5 border rounded-lg shadow-sm bg-white space-x-5 m-3"
                    >
                        <img
                            src={user?.avatar ?? defaultava}
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

            <Pagination
                itemsPerPage={usersPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default AdminHome;
