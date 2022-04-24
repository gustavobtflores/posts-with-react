import styled from 'styled-components';

function TextInput({ searchValue, handleChange }) {
  return (
    <StyledTextInput
      type="search"
      value={searchValue}
      onChange={handleChange}
      placeholder="Type your search"
    />
  );
}

const StyledTextInput = styled.input`
  width: 100%;
  font-size: 1.5rem;
  padding: 8px;
  border: 1px solid #111111;
  transition: border 0.2s ease-in-out;

  &:focus {
    border: 1px solid blue;
  }
`;

export default TextInput;
