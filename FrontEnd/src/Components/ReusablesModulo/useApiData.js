// useApiData.js
import { useEffect, useState } from "react";

export function useApiData(apiFunc) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await apiFunc();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [apiFunc]);
    return data;
}
