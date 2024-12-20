import { useEffect, useState } from "react";
import RightArrow from '../../assets/svg/right-arrow.svg'
import "../../assets/css/SearchBarTransition.css"; // Import file CSS

const SearchBarTransition = ({ size, placeholder }) => {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const testApi = "https://jsonplaceholder.typicode.com/photos";
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                const res = await fetch(testApi, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error("Fetching Error");
                }
                const data = await res.json();
                setSearchResults(
                    data.filter((item) => {
                        return item.title.toLowerCase().includes(query.toLowerCase());
                    })
                );
            } catch (error) {
                if (error.name !== "AbortError") console.log(error.message);
            }
        }

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }

        return function () {
            controller.abort();
        };
    }, [query]);

    function focus() {
        setActive(true);
    }

    function blur() {
        setActive(false);
    }

    function clearQuery() {
        setQuery("");
    }

    return (
        <div className="search-bar-container" style={{ width: size }}>
            <div
                className={`search-input-wrapper ${active ? "active" : ""}`}
                onFocus={focus}
                onBlur={blur}
            >
                <input
                    className="search-input"
                    placeholder={placeholder ?? "Tìm kiếm"}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                {query.length >= 1 && active && (
                    <div className="search-results-container">
                        <div className="search-results">
                            <span className="results-header">
                                <p style={{ fontSize: "large" }}>Ngôn Ngữ kí hiệu</p>
                                <img style={{ width: "2rem", height: "2rem" }} src={RightArrow}></img>
                            </span>
                            {searchResults.length === 0 ? (
                                <span className="no-results">
                                    <p style={{ fontSize: "medium" }}>Không tìm thấy ngôn ngữ kí hiệu này</p>
                                </span>
                            ) : (
                                searchResults.map((item) => (
                                    <div
                                        key={item.id}
                                        className="search-item"
                                    >
                                        <div>{item.title}</div>
                                        <div>{item.id}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBarTransition;
