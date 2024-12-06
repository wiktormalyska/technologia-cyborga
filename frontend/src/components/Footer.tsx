import * as React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const FooterWrapper = styled.footer`
    background-color: #6200ea;  // 2f2f2f
    color: white;
    text-align: center;
    padding: 2.5rem 0;
`;

const Grid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 160px;
`

const GridItem = styled.div`
    display: flex;
    flex-direction: column;
`

const ItemTitle = styled.p`
    font-size: 18px;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    color: white;
    padding-bottom: 8px;
`

const ItemTitleLink = styled(ItemTitle)`
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`

const ItemContent = styled.p`
    font-size: 12px;
    font-family: 'Josefin Sans', sans-serif;
    text-align: left;
    color: white;
`

const authorLink = "https://docusaurus.wiktormalyska.ovh/docs/projekt-zespolowy-technologia-cyborga/intro#-contributors"
const docsLink = "https://docusaurus.wiktormalyska.ovh/docs/category/technologia-cyborga"

const Footer = () => (
    <FooterWrapper>
        <Grid>
            <GridItem>
                <ItemTitle>Contact Information</ItemTitle>
                <ItemContent>Tel.: 123 456 789</ItemContent>
                <ItemContent>E-mail: cyborg@sigma.com</ItemContent>
            </GridItem>
            <GridItem>
                <ItemTitleLink><Link to={"/policy"}>Privacy Policy</Link></ItemTitleLink>
            </GridItem>
            <GridItem>
                <ItemTitleLink>
                    <Link to={authorLink} target={"_blank"} rel={"noopener noreferrer"}>Authors</Link>
                </ItemTitleLink>
            </GridItem>
            <GridItem>
                <ItemTitleLink>
                    <Link to={docsLink} target={"_blank"} rel={"noopener noreferrer"}>Documentation</Link>
                </ItemTitleLink>
            </GridItem>
            <GridItem><p>&copy; Cyborg 2024 | All rights reserved</p></GridItem>
        </Grid>
    </FooterWrapper>
);

export default Footer;