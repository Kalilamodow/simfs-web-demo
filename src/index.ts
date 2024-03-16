import SimulatedFilesystem, { SFFile } from "./simfs";
import deserialize from "./simfs/deserializer";

let simfs = new SimulatedFilesystem();

function createInitialSimfs() {
  const root = simfs.root;
  root.createFile("hello.txt", "Hello, World!");
  root.createFile(
    "secret.txt",
    "The treasure is in Africa, at the coordina-",
  );

  const subdir = root.createDirectory("subdir");
  subdir.createFile(
    "secret2.txt",
    "Okay, I got cut off last time. It's located in-",
  );
  subdir.createFile("bye bye.txt", "Bye bye, world :(");
}

function updateDisplay() {
  const listing = simfs.cwd();
  document.getElementById("current-working-directory")!.innerText =
    simfs.cwd_path + (simfs.cwd_path != "/" ? "/" : "");

  const toShow: {
    type: "directory" | "file";
    name: string;
    displayName: string;
  }[] = [];

  if (simfs.cwd_path != "/")
    toShow.push({ type: "directory", name: "..", displayName: "back" });

  listing.get().forEach(pth => {
    toShow.push({
      type: pth.type,
      name: pth.name,
      displayName: pth.type == "directory" ? `${pth.name}/` : pth.name,
    });
  });

  const listingEle = document.getElementById("directory-listing")!;
  listingEle.innerHTML = "";
  toShow.forEach(x => {
    const ele = document.createElement("div");
    ele.setAttribute("data-type", x.type);
    ele.innerText = x.displayName;

    if (x.type == "directory") {
      ele.addEventListener("click", () => {
        simfs.cd([x.name]);
        document.getElementById("file-editor-ctr")!.hidden = true;
        updateDisplay();
      });
    } else {
      ele.addEventListener("click", () =>
        openFileEditor(listing.get(x.name, "file")!),
      );
    }

    listingEle.appendChild(ele);
  });
}

function openFileEditor(file: SFFile) {
  const container = document.getElementById("file-editor-ctr")!;
  const textarea = container.querySelector(
    "#file-editor-input",
  ) as HTMLTextAreaElement;
  textarea.value = file.read();

  // remove last button (save button)
  Array.from(container.children).at(-1)!.remove();

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.innerText = "Save";

  saveButton.onclick = () => {
    file.write(textarea.value);
    textarea.value = "";
    container.hidden = true;
  };

  container.appendChild(saveButton);

  (container.children[0] as HTMLElement).innerText = file.name;
  container.hidden = false;
}

function create(type: "file" | "directory") {
  const name = prompt("Name of new " + type);
  if (!name) return;

  if (simfs.cwd().get(name)) {
    alert("Already exists");
    return;
  }

  if (type == "file") {
    simfs.cwd().createFile(name);
  } else {
    simfs.cwd().createDirectory(name);
  }

  updateDisplay();
}

function downloadSimfs() {
  const serialized = simfs.serialize();
  const blob = new Blob([serialized], {
    type: "application/octet-stream",
  });

  const link = document.createElement("a");
  link.download = "filesystem.simfs";
  link.href = URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);

  link.click();
  link.remove();
}

function loadSimfs() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "*.simfs";

  input.onchange = () => {
    const fileList = input.files;
    if (!fileList) return;
    const file = fileList[0];
    if (!file) return;

    file.text().then(text => {
      simfs = new SimulatedFilesystem(text);
      updateDisplay();
    });

    input.remove();
  };

  input.click();
}

// createInitialSimfs();
updateDisplay();

document
  .querySelector("#cwd-buttons>button:first-child")!
  .addEventListener("click", () => create("file"));

document
  .querySelector("#cwd-buttons>button:last-child")!
  .addEventListener("click", () => create("directory"));

document
  .getElementById("save-fs")
  ?.addEventListener("click", downloadSimfs);

document.getElementById("load-fs")?.addEventListener("click", loadSimfs);

document.getElementById("clear-fs")?.addEventListener("click", () => {
  if (confirm("Are you sure?")) simfs = new SimulatedFilesystem();
});
