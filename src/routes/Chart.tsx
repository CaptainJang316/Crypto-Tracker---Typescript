import { useQuery } from "react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string
}

function Chart() {
    const {coinId} = useOutletContext<ChartProps>();
    let {params} = useParams();
    console.log("params: ", params);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );

    return (
        <div>
            {isLoading ? (
            "Loading chart..."
        ) : (
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: data?.map((price) => price.close) ?? [],
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    fill: {
                        type: "gradient",
                        gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                    },
                    colors: ["#0fbcf9"],
                    grid: { show: false },
                    stroke: {
                        width: 4,
                    },
                    yaxis: {
                        show: true,
                        axisBorder: {
                            show: true,
                        },
                    },
                    xaxis: {
                        type: "datetime",
                        categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toISOString()),
                        axisBorder: { show: true },
                        axisTicks: { show: true },
                        labels: { show: true },
                    },
                    tooltip: {
                        y: {
                            formatter: (value) => `$${value.toFixed(2)}`,
                        },
                    },
                }}
            />
        )}
        </div>
    );
}
  
export default Chart;