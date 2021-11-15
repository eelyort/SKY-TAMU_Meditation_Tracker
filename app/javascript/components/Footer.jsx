import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <FooterLink href="#">
              <i className="fab fa-donate" target="_blank">
                <span style={{ marginLeft: "10px" }}>
                  Donate
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="mailto:email@gmail.com" target="_blank">
              <i className="fab fa-contactus">
                <span style={{ marginLeft: "10px" }}>
                  Contact Us
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="https://www.instagram.com/skyattamu/" target="_blank">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="https://discord.gg/fmxHPE9nck" target="_blank">
              <i className="fab fa-discord">
                <span style={{ marginLeft: "10px" }}>
                  Discord
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;