import { useParams } from "react-router"

function Coin() {
    const { coinID } = useParams();
    console.log("coinId: ", coinID);
    return <h1>Coin</h1>;
}
export default Coin;