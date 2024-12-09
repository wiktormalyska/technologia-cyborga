import * as React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const FooterWrapper = styled.footer`
    background-color: #6200ea;  // 2f2f2f
    color: white;
    text-align: center;
    padding: 1rem 0;
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

const ExpandableContent = styled(ItemContent)<{$isOpen: boolean}>`
    font-size: ${props => props.$isOpen ? '12px' : 0};
    overflow: hidden;
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition: all 0.3s ease;
    padding-top: ${props => props.$isOpen ? '8px' : 0};
`

const authorLink = "https://docusaurus.wiktormalyska.ovh/docs/projekt-zespolowy-technologia-cyborga/intro#-contributors"
const docsLink = "https://docusaurus.wiktormalyska.ovh/docs/category/technologia-cyborga"

const Footer = () => {
    const [openSection, setOpenSection] = React.useState<string | null>(null);

    const toggleSection = (sectionName: string) => {
        setOpenSection(current =>
            current === sectionName ? null : sectionName
        );
    };

    return (
        <FooterWrapper>
            <Grid>
                <GridItem>
                    <ItemTitleLink onClick={() => toggleSection('details')}>
                        Contact Information
                    </ItemTitleLink>
                    <ExpandableContent $isOpen={openSection === 'details'}>
                        Tel.: 123 456 789<br/>
                        E-mail: cyborg@sigma.com
                    </ExpandableContent>
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
    )
};

export default Footer;