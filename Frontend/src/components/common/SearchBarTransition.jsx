import { useEffect, useState } from "react";
import RightArrow from '../../assets/svg/right-arrow.svg';
import { store } from "../../utils/store";
import adminServices from "../../api/adminServices";
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const SearchBarTransition = ({ size, placeholder, search }) => {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const user = store.getState().auth.user;

    useEffect(() => {
        async function fetchData() {
            if (query.length >= 3) {
                if (search === "sign") {
                    try {
                        const userResults = await adminServices.getSign(query);
                        console.log(userResults.response.data.metadata);
                        setSearchResults(userResults.response.data.metadata);
                    } catch (error) {
                        console.error("Error fetching data:", error.message);
                        setSearchResults([]);
                    }
                }
                if (search === "account") {
                    try {
                        const userResults = await adminServices.getUserByEmail(query);
                        console.log(userResults.response.data.metadata.data);
                        setSearchResults(userResults.response.data.metadata.data);
                    } catch (error) {
                        console.error("Error fetching data:", error.message);
                        setSearchResults([]);
                    }
                }
            }
        }

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [query, user.role]);

    function focus() {
        setActive(true);
    }

    function blur() {
        setActive(false);
    }

    function clearQuery() {
        setQuery("");
        setSearchResults([]);
        setActive(false);
    }

    function handleLinkClick() {
        setActive(false);
        setQuery("");
    }

    return (
        <div className={`relative w-${size} h-${size}`}>
            <div
                className={`border border-gray-300 rounded-lg p-2 transition-all ${active ? "border-blue-500 shadow-lg" : ""}`}
            >
                <input
                    className="w-full p-2 text-gray-700 placeholder-gray-400 outline-none"
                    placeholder={placeholder ?? "Tìm kiếm"}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onFocus={focus}
                    onBlur={blur}
                />
                {query.length >= 3 && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <div className="p-4 overflow-x-scroll h-[70vh] flex flex-col items-start">
                            <div className="flex flex-row items-center  justify-between mb-4 ">
                                <p className="font-medium text-lg">Ngôn Ngữ Kí Hiệu</p>
                                <img
                                    className="w-8 h-8 ml-2"
                                    src={RightArrow}
                                    alt="Right Arrow"
                                />
                            </div>
                            {searchResults.length === 0 ? (
                                <div className="text-gray-500 text-center">
                                    Không tìm thấy kết quả
                                </div>
                            ) : (
                                <div className="">
                                    {searchResults && Array.isArray(searchResults) && searchResults.map((result, index) => (
                                        <Link
                                            key={index}
                                            to={`/${user.role}/searchresult/`}
                                            className="flex items-center font-semibold text-gray-800 border-black "
                                            onClick={handleLinkClick}
                                            state={{ itemName: result.name }}

                                        >
                                            {console.log(result)}
                                            {search === "account" ? (
                                                <>
                                                    {result.avatar && (
                                                        <img
                                                            src={result.avatar}
                                                            alt="User Avatar"
                                                            className="w-16 h-16 rounded-full mr-4"
                                                        />
                                                    )}
                                                    <div className="flex flex-col mr-2">
                                                        <span className="text-sm font-medium">{result.username}</span>
                                                        <span className="text-xs text-gray-500">{result.email}</span>
                                                    </div>

                                                </>
                                            ) : (
                                                <span className="text-lg font-semibold text-gray-800 p-1 rounded-md">
                                                    {result.name}
                                                </span>)}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {query && (
                <button
                    onClick={clearQuery}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    <FaTimes className="text-2xl" />
                </button>
            )}
        </div>
    );
};

export default SearchBarTransition;
