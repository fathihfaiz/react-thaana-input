import React from "react";
import useThaanaInput from "../src/useThaanaInput";

const EditableDivExample = () => {
  const { value, handleKeyDown, handleSelect } = useThaanaInput();

  return (
    <div
      contentEditable
      onKeyDown={handleKeyDown}
      onSelect={handleSelect}
      suppressContentEditableWarning
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        minHeight: "50px",
        width: "100%",
      }}
    >
      {value}
    </div>
  );
};

export default EditableDivExample;