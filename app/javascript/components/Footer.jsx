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
      <h1 style={{ color: "rgb(200, 162, 200)", 
                   textAlign: "marginLeft" }}>
        SKY@TAMU
      </h1>
      <Container>
        <Row>
          <Column>
            <FooterLink href="#">
              <i className="fab fa-testimonials">
                <span style={{ marginLeft: "10px" }}>
                  Testimonials
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">
              <i className="fab fa-contactus">
                <span style={{ marginLeft: "10px" }}>
                  Contact Us
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">
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