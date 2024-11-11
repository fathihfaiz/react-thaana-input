
# react-thaana-input

A React hook for handling Thaana (Divehi) input seamlessly.

## Installation

Install the package via npm:

```bash
npm install react-thaana-input
```

## Usage

### Text Input Example

```tsx
import React from "react";
import useThaanaInput from "react-thaana-input";

const MyComponent = () => {
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

export default MyComponent;
```

### Textarea Example

```tsx
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
```

### ContentEditable Example

```tsx
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

```

### Features

- Supports thaana (Divehi) character input.
- Compatible with React 16.8+, 17.x, and 18.x.
- Works with input, textarea, and contentEditable elements.

## License

MIT

## Author

[@fathihfaiz](https://github.com/fathihfaiz) | [@continumm.mv](https://continumm.mv)
