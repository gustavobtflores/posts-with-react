import styled from "styled-components";

const ButtonMorePosts = styled.button`
  background-color: #05eb24;
  border: 1px solid darkblue;
  outline: none;
  padding: 8px;
  margin: 0 auto;
  display: flex;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 16px;
`;

export const Button = ({ text, onClick }) => {
  return <ButtonMorePosts onClick={onClick}>{text}</ButtonMorePosts>;
};
