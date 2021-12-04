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
    <div class="footer">
        <a href="#" target="_blank" id="footerId" >Donate</a>
        <p style={{display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <a href="mailto:email@gmail.com" target="_blank" id="footerId">Contact Us</a>
        <p style={{display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <a href="https://www.instagram.com/skyattamu/" target="_blank" id="footerId">Instagram</a>
        <p style={{display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <a href="https://discord.gg/fmxHPE9nck" target="_blank" id="footerId">Discord</a>
    </div>
  );
};
export default Footer;
