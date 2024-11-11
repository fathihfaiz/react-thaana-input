import { useState } from "react";

/*
 * @fathihfaiz
 * @continumm.mv
 * A React hook for handling Thaana (Divehi) input in various input fields, including contenteditable elements.
 */

const mappings: Record<string, string> = {
  "KeyA": "ަ", "KeyB": "ބ", "KeyC": "ޗ", "KeyD": "ދ", "KeyE": "ެ", "KeyF": "ފ", 
  "KeyG": "ގ", "KeyH": "ހ", "KeyI": "ި", "KeyJ": "ޖ", "KeyK": "ކ", "KeyL": "ލ", 
  "KeyM": "މ", "KeyN": "ނ", "KeyO": "ޮ", "KeyP": "ޕ", "KeyQ": "ް", "KeyR": "ރ", 
  "KeyS": "ސ", "KeyT": "ތ", "KeyU": "ު", "KeyV": "ވ", "KeyW": "އ", "KeyX": "ޘ", 
  "KeyY": "ޠ", "KeyZ": "ޡ", "Shift+KeyA": "ާ", "Shift+KeyB": "ޞ", "Shift+KeyC": "ޝ", 
  "Shift+KeyD": "ޑ", "Shift+KeyE": "ޭ", "Shift+KeyF": "ﷲ", "Shift+KeyG": "ޣ", 
  "Shift+KeyH": "ޙ", "Shift+KeyI": "ީ", "Shift+KeyJ": "ޛ", "Shift+KeyK": "ޚ", 
  "Shift+KeyL": "ޅ", "Shift+KeyM": "ޟ", "Shift+KeyN": "ޏ", "Shift+KeyO": "ޯ", 
  "Shift+KeyP": "÷", "Shift+KeyQ": "ޤ", "Shift+KeyR": "ޜ", "Shift+KeyS": "ށ", 
  "Shift+KeyT": "ޓ", "Shift+KeyU": "ޫ", "Shift+KeyV": "ޥ", "Shift+KeyW": "ޢ", 
  "Shift+KeyX": "×", "Shift+KeyY": "ޠ", "Shift+KeyZ": "ޡ"
}

interface UseThaanaInput {
  value: string;
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelect: (event: React.SyntheticEvent<HTMLElement>) => void;
}

const useThaanaInput = (): UseThaanaInput => {
  const [value, setValue] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // Allow common shortcuts
    if (event.ctrlKey || event.metaKey) {
      return; // Let the browser handle Ctrl+A, Ctrl+C, Ctrl+V, etc.
    }

    if (event.key === "Process") {
      return; 
    }

    
    const key = event.shiftKey ? `Shift+${event.code}` : event.code;
    const newChar = mappings[key];
    
    if (newChar) {
      event.preventDefault();

      const target = event.target as HTMLElement;
      const isContentEditable = target.getAttribute("contenteditable") === "true";

      if (isContentEditable) {
        const currentValue = target.innerText || "";
        const newValue = currentValue.slice(0, selectionStart) + newChar + currentValue.slice(selectionStart);
        setValue(newValue);
        target.innerText = newValue;
      } else {
        const inputTarget = target as HTMLInputElement | HTMLTextAreaElement;
        const currentValue = inputTarget.value || "";
        const newValue = currentValue.slice(0, selectionStart) + newChar + currentValue.slice(selectionStart);
        setValue(newValue);
        inputTarget.value = newValue;
      }

      const newSelectionStart = selectionStart + newChar.length;
      setSelectionStart(newSelectionStart);

      setTimeout(() => {
        if (isContentEditable) {
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(target.childNodes[0] || target, newSelectionStart);
          range.collapse(true);
          sel?.removeAllRanges();
          sel?.addRange(range);
        } else {
          const inputTarget = target as HTMLInputElement | HTMLTextAreaElement;
          inputTarget.setSelectionRange(newSelectionStart, newSelectionStart);
        }
      }, 0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const isContentEditable = target.getAttribute("contenteditable") === "true";

    if (isContentEditable) {
      const sel = window.getSelection();
      if (sel?.rangeCount) {
        const range = sel.getRangeAt(0);
        setSelectionStart(range.startOffset);
      }
    } else {
      const inputTarget = target as HTMLInputElement | HTMLTextAreaElement;
      setSelectionStart(inputTarget.selectionStart || 0);
    }
  };

  return {
    value,
    handleKeyDown,
    handleInputChange,
    handleSelect,
  };
};

export default useThaanaInput;
