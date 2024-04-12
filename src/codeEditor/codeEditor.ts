function initEditor(container: HTMLElement) {
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
}

export default initEditor;
