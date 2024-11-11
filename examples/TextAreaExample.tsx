
import React from "react";
import useThaanaInput from "../src/useThaanaInput";

const TextAreaExample = () => {
    const { value, handleKeyDown, handleInputChange } = useThaanaInput();
  
    return (
      <textarea
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        placeholder="Type in Dhivehi"
      />
    );
  };
  
  export default TextAreaExample;