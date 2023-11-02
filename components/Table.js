import styled from "styled-components"

const StyledTable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #ccc;
        font-weight: 500;
        font-size: .7rem;
    }
    td{
        border-top: 2px solid rgba(0,0,0, .1);
    }
`;

export default function Table(props) {
    return <StyledTable {...props} />
}