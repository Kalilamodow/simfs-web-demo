function initEditor(
  container: HTMLElement,
  saveButton: HTMLButtonElement,
) {
  const prism = (window as any).Prism;

  container.classList.add("code-editor");

  // pre should go BEFORE textarea
  const pre = document.createElement("pre");
  container.appendChild(pre);

  const textarea = document.createElement("textarea");
  textarea.spellcheck = false;
  container.appendChild(textarea);

  textarea.addEventListener("input", () => {
    const code = textarea.value;
    const type = container.parentElement.dataset.filetype;

    if (type == "text") {
      pre.innerHTML = code;
      pre.style.color = "black";
      return;
    } else {
      pre.style.color = "darkred";
    }

    if (!code) {
      pre.innerHTML = "";
      return;
    }

    const html = prism.highlight(code, prism.languages[type], type);

    pre.innerHTML = html;
  });

  textarea.addEventListener("scroll", () => {
    pre.scrollTop = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  });

  const matchPairs = {
    "{": "}",
    "(": ")",
    "[": "]",
    "'": "'",
    '"': '"',
    "`": "`",
  };

  function insertAtCaret(text: string, offset = 0) {
    const current = textarea.value;
    const caretPos = textarea.selectionStart;
    const newText =
      current.slice(0, caretPos) + text + current.slice(caretPos);
    textarea.value = newText;
    textarea.selectionStart = caretPos + offset;
    textarea.selectionEnd = caretPos + offset;
  }

  function getCharAtCaret(offset = 0) {
    const position = textarea.selectionStart + offset - 1;
    return textarea.value.at(position);
  }

  function getTabSize() {
    const line = textarea.value
      .slice(0, textarea.selectionStart)
      .split("\n")
      .pop();
    let count = 0;

    for (let i = 0; i < line.length; i++) {
      if (line.at(i) == " ") {
        count++;
      } else {
        break;
      }
    }

    return count;
  }

  let tabSize = 0;

  textarea.addEventListener("keydown", evt => {
    if (evt.ctrlKey && evt.key == "s") {
      evt.preventDefault();
      saveButton.click();
      return;
    }

    if (["Ctrl", "Shift", "Alt"].includes(evt.key)) return;
    if (textarea.selectionStart != textarea.selectionEnd) return;

    tabSize = getTabSize();
    saveButton.disabled = false;

    if (evt.key == "Tab") {
      evt.preventDefault();
      insertAtCaret("  ", 2);
    }

    if (Object.keys(matchPairs).includes(evt.key)) {
      evt.preventDefault();

      // there's weird behaviour in chrome
      if (Object.keys(matchPairs).indexOf(evt.key) < 3)
        insertAtCaret(evt.key, 1);
      else insertAtCaret(evt.key);

      insertAtCaret(matchPairs[evt.key]);
    }

    if (
      Object.values(matchPairs).includes(evt.key) &&
      getCharAtCaret(1) == evt.key
    ) {
      evt.preventDefault();
      textarea.selectionStart++;
      textarea.selectionEnd = textarea.selectionStart;
    }

    if (evt.key == "Enter") {
      const fc = getCharAtCaret();
      const sc = getCharAtCaret(1);

      if (Object.keys(matchPairs).includes(fc)) {
        if (Object.entries(matchPairs).find(x => x[0] == fc)[1] == sc) {
          evt.preventDefault();
          tabSize += 2;
          insertAtCaret(
            `\n${" ".repeat(tabSize)}\n${" ".repeat(tabSize - 2)}`,
            1 + tabSize,
          );
        }
      } else {
        evt.preventDefault();

        insertAtCaret("\n" + " ".repeat(tabSize), tabSize + 1);
      }
    }

    if (evt.key == "Backspace") {
      if (getCharAtCaret() == " " && getCharAtCaret(-1) == " ") {
        // delete tab
        evt.preventDefault();
        const selection = textarea.selectionStart;
        const newText =
          textarea.value.slice(0, selection - 2) +
          textarea.value.slice(selection);
        textarea.value = newText;
        textarea.selectionStart = selection - 2;
        textarea.selectionEnd = textarea.selectionStart;
      }
    }

    textarea.dispatchEvent(new Event("input"));
  });
}

export default initEditor;
