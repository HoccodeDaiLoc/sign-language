import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import RightArrow from '../../assets/svg/right-arrow.svg';
import "../../assets/css/SearchBarTransition.css"; // Import file CSS

const SearchBarTransition = ({ size, placeholder }) => {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const testApi = "https://jsonplaceholder.typicode.com/photos";
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

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
            setSearchResults([]); // If there's no query, reset search results
        }

        return function () {
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        // Example of navigation when a specific word is typed
        if (query.toLowerCase() === "hello") {
            navigate("/user/searchresult", { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/24/24851.mp4", signName: "Hello" } }); 
        } else if (query.toLowerCase() === "love") {
            navigate("/user/searchresultLove", { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/23/23180.mp4", signName: "Love" } }); 
        } else if (query.toLowerCase() === "you") {
            navigate("/user/searchresultYou", { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/23/23180.mp4", signName: "You" } }); 
        } else if (query.toLowerCase() === "happy") {
            navigate("/user/searchresultHappy", { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/23/23180.mp4", signName: "Happy" } }); 
        }
        else if (query.toLowerCase() === "yes") {
            navigate("/user/searchresultYes", { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/23/23180.mp4", signName: "yes" } }); 
        }
    }, [query, navigate]);

    function focus() {
        setActive(true);
    }

    function blur() {
        setActive(false);
    }

    function clearQuery() {
        setQuery("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // Navigate to the appropriate result and close the search
            if (searchResults.length > 0) {
                navigate("/user/searchresult", { state: { videoUrl: searchResults[0].url, signName: searchResults[0].title } });
            }
            setActive(false);  // Close the search suggestions
            setQuery("");  // Clear the input field
        }
    };

    const predefinedSuggestions = ["hello", "love", "you", "happy", "yes"];

    const filteredSuggestions = predefinedSuggestions.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );

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
                    onKeyDown={handleKeyDown}  // Handle the "Enter" key press
                />
                {query.length >= 1 && active && (
                    <div className="search-results-container">
                        <div className="search-results">
                            <span className="results-header">
                                <p style={{ fontSize: "large" }}>Ngôn Ngữ kí hiệu</p>
                                <img style={{ width: "2rem", height: "2rem" }} src={RightArrow} alt="arrow" />
                            </span>
                            {searchResults.length === 0 && filteredSuggestions.length === 0 ? (
                                <span className="no-results">
                                    <p style={{ fontSize: "medium" }}>Không tìm thấy ngôn ngữ kí hiệu này</p>
                                </span>
                            ) : (
                                <>
                              
                                    {searchResults.map((item) => (
                                        <div
                                            key={item.id}
                                            className="search-item"
                                            onClick={() => {
                                                navigate("/user/searchresult", { state: { videoUrl: item.url, signName: item.title } });
                                                setActive(false);  
                                                setQuery("");  
                                            }}
                                        >
                                            <div>{item.title}</div>
                                        </div>
                                    ))}
                                    {/* Show predefined suggestions if no search results found */}
                                    {searchResults.length === 0 && filteredSuggestions.length > 0 && (
                                        <div className="suggestions">
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="search-item"
                                                    onClick={() => {
                                                        navigate(`/user/searchresult${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}`, { state: { videoUrl: "https://www.signingsavvy.com/media2/mp4-ld/23/23180.mp4", signName: suggestion } });
                                                        setActive(false);  
                                                        setQuery("");  
                                                    }}
                                                >
                                                    <div>{suggestion}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBarTransition;
