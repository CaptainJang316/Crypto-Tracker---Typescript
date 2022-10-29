import { useQuery } from "react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface ChartProps {
    coinId: string
}

function Chart() {
    const {coinId} = useOutletContext<ChartProps>();
    let {params} = useParams();
    console.log("params: ", params);
    const { isLoading, data } = useQuery(["ohlcv", params], () => 
        fetchCoinHistory(coinId)    
    );
    return <h1>Chart</h1>;
}
  
export default Chart;