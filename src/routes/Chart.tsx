import { useQuery } from "react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
    const isDark = useRecoilValue(isDarkAtom);
    const {coinId} = useOutletContext<ChartProps>();
    let {params} = useParams();
    console.log("params: ", params);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );

    return (
        <div>
            {isLoading ? (
            "Loading chart..."
        ) : (
            <ApexChart
                type="candlestick"
                series={[
                    {
                        name: "Price",
                        data: data?.map((price) => {
                            return {
                              x: new Date(Number(price.time_close) * 1000).toISOString(),
                              y: [price.open, price.high, price.low, price.close],  
                            };
                        }) ?? [],
                    },
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : "light",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        type: 'candlestick',
                        background: "transparent",
                    },
                    plotOptions: {
                        candlestick: {
                          colors: {
                            upward: '#3C90EB',
                            downward: '#DF7D46'
                          },
                        }
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