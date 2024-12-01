import * as React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    background-color: #6200ea;
    color: white;
    text-align: center;
    padding: 1rem;
`;

const Footer = () => (
    <FooterWrapper>
        <p>&copy; Cyborg 2024 | All rights reserved</p>
    </FooterWrapper>
);

export default Footer;