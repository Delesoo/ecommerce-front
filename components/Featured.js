import Center from "./Center";
import styled from "styled-components";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;
const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`;
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img{
        max-width: 100%;
    }
`;
const Column = styled.div`
    display: flex;
    align-items: center;
`;

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                    <div>
                    <Title>Pro anywhere</Title>
                        <Desc>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</Desc>
                    </div>
                    </Column>
                    <Column>
                        <img src='https://deleso-next-ecommerce.s3.amazonaws.com/1698395158280.jpeg '></img>
                    </Column>
                </Wrapper>
            </Center>

        </Bg>
    );
}