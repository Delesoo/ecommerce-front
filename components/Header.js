import Link from "next/link";
import styled from 'styled-components';
import Center from "./Center";

const StyledHeader = styled.header`
    background-color: #222;
`;
const Logo = styled(Link)`
 color: #fff;
 text-decoration:none;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Center>
                <Logo href={'/'}>Ecommerce</Logo>
                <nav>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/products'}>All Products</Link>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/account'}>Account</Link>
                    <Link href={'/cart'}>Cart (0)</Link>
                </nav>
            </Center>
        </StyledHeader>
    );
}