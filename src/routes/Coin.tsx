import { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

function Coin() {
    const { coinID } = useParams();
    const [loading, setLoading] = useState(true);

    console.log("coinId: ", coinID);

    const location = useLocation();
    const name = location.state as RouteState;
    const state = location.state;
    console.log("state: ", state);
    console.log("name: ", name);

    return (
        <Container>
            <Header>
                {/* state가 존재하면 name을 가져오고, 아니면 "Loading..." 을 보여줘라 */}
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading? <Loader>Loading...</Loader> : null}
        </Container>
    );
}
export default Coin;