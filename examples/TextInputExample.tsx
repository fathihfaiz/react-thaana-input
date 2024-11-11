import React from "react";
import useThaanaInput from "../src/useThaanaInput";

const TextInputExample = () => {
  const { value, handleKeyDown, handleInputChange } = useThaanaInput();

  return (
    <input
      type="text"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
      placeholder="Type in Dhivehi"
    />
  );
};

export default TextInputExample;
