import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }


  const PriceDiv = styled.div`
        text-align: center;
        padding-bottom: 50px;
  `;

  const CurrentPrice = styled.h1`
        padding: 20px;
        padding-bottom: 30px;
        font-size: 20px;
  `;

  const PriceChange = styled.span`
        padding: 15px;
        font-size: 17px;
        color: ${(props) => props.color}
  `;

  const RedAiFillCaretUp = styled(AiFillCaretUp)`
    color: red;
  `;

  const BlueAiFillCaretDown = styled(AiFillCaretDown)`
    color: blue;
  `;


function Price() {

    
    
    const {coinId} = useParams();

    const { isLoading, data } = useQuery<PriceData>(
        ["Price", coinId],
        () => fetchCoinTickers(coinId!), {
            refetchInterval: 1000,
        }
      );
    
    return (
        <PriceDiv>
          {isLoading ? ("isLoading..")
            : (
              <>
                <CurrentPrice>$ {data?.quotes.USD.price.toFixed(3)}</CurrentPrice>
                  {
                    data?.quotes.USD.percent_change_1h && 0 < data?.quotes.USD.percent_change_1h ?
                    (
                      <PriceChange color="red">
                        1h % : <AiFillCaretUp/> {data?.quotes.USD.percent_change_1h}
                      </PriceChange>
                    ) : (
                      <PriceChange color="dodgerblue">
                        1h % : <AiFillCaretDown/> {data?.quotes.USD.percent_change_1h}
                      </PriceChange>
                    )
                  }
                  {
                    data?.quotes.USD.percent_change_24h && 0 < data?.quotes.USD.percent_change_24h ?
                    (
                      <PriceChange color="red">
                        24h % : <AiFillCaretUp/> {data?.quotes.USD.percent_change_24h}
                      </PriceChange>
                    ) : (
                      <PriceChange color="dodgerblue">
                        24h % : <AiFillCaretDown/> {data?.quotes.USD.percent_change_24h}
                      </PriceChange>
                    )
                  }
                  {
                    data?.quotes.USD.percent_change_7d && 0 < data?.quotes.USD.percent_change_7d ?
                    (
                      <PriceChange color="red">
                        7d % : <AiFillCaretUp/> {data?.quotes.USD.percent_change_7d}
                      </PriceChange>
                    ) : (
                      <PriceChange color="dodgerblue">
                        7d % : <AiFillCaretDown/> {data?.quotes.USD.percent_change_7d}
                      </PriceChange>
                    )
                  }
              </>
            )
        }
        </PriceDiv>
    );
}
  
export default Price;