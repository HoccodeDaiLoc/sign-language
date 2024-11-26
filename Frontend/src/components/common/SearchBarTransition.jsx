import { Input, Button, Flex, Typography } from "antd";
import { SearchOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import colors from "../../constants/Colors";
const SearchBarTransition = ({ size, placeholder }) => {
    const suffix = <SearchOutlined twoToneColor="#eb2f96" />;
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const testApi = "https://jsonplaceholder.typicode.com/photos";
    const [searchResults, setSearchResults] = useState([]);
    const { Text, Paragraph } = Typography;

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
        <div style={{ display: "flex", alignItems: "flex-start", width: `${size}` }}>
            <Flex
                onFocus={focus}
                onBlur={blur}
                style={{
                    marginRight: "10px",
                    width: active ? "100%" : "80%",
                    transition: "width 0.3s ease, transform 0.3s ease",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    position: "relative",
                }}
                vertical
            >
                <Input
                    placeholder={placeholder ?? "Tìm kiếm"}
                    suffix={suffix}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    style={{
                        width: "100%",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        borderColor: colors.border,
                    }}
                />
                {query.length >= 999 && (
                    <Flex
                        vertical
                        style={{
                            width: "100%",
                            height: "300px",
                            position: "absolute",
                            top: "38px",
                            border: `solid 1px ${colors.border}`,
                            overflowY: "scroll",
                            scrollbarWidth: "thin",
                            scrollbarColor: colors.grayMedium,
                            overflowX: "hidden",
                        }}
                    >
                        <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                            <Text style={{ fontSize: "large" }}></Text>
                        </Paragraph>
                        {searchResults.length == 0 ? (
                            <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                                <Text style={{ fontSize: "medium" }}>Không tìm thấy vấn đề sức khỏe</Text>
                            </Paragraph>
                        ) : (
                            searchResults.map((item) => (
                                <Flex
                                    key={item.id}
                                    style={{
                                        padding: "10px",
                                        borderTop: `solid 1px ${colors.border}`,
                                    }}
                                    vertical
                                >
                                    <div>{item.title}</div>
                                    <div>{item.id}</div>
                                </Flex>
                            ))
                        )}
                    </Flex>
                )}
            </Flex>


        </div>
    );
};

export default SearchBarTransition;
