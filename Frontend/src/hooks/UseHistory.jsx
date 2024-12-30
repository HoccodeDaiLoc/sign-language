import { useEffect, useState } from "react";
import historyServices from '../api/historyServices'
import { store } from "../utils/store";
import adminServices from "../api/adminServices";
const UseHistory = (pageNum = 1) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);
    const limit = 3;
    const user = store.getState().auth.user;

    useEffect(() => {

        async function getHistory() {
            const controller = new AbortController()
            const { signal } = controller;
            try {
                setIsLoading(true);
                setIsError(false);
                setError({});
                let result
                if (user.role === "user") {
                    result = await historyServices.getUploadedHistory(user._id, pageNum, limit, { signal })
                }
                if (user.role === "admin") {
                    result = await adminServices.getAllSign(pageNum, 1)
                }
                const data = result.response.data.metadata;
                setResults(prev => [...prev, ...data]);
                setHasNextPage(Boolean(data.length));
                setIsLoading(false);
                return () => controller.abort();
            } catch (error) {
                setIsLoading(false);
                if (signal.abort)
                    return
                setIsError(true);
                setError({
                    message: error.message
                })
            }
        }
        getHistory()

    }, [pageNum, user._id]);

    return { isLoading, isError, error, results, hasNextPage }
}
export default UseHistory;