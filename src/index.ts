import SimulatedFilesystem, { SFFile } from "simfs";
import { Resource } from "simfs/dist/resources";
import createCodeEditor from "./codeEditor/codeEditor";

let simfs = new SimulatedFilesystem();

function createTrashImage() {
  const b64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAA" +
    "AAf8/9hAAAAAXNSR0IArs4c6QAAAUNJREFUOE+V0j8sn1EUxvGPv6mBUSeJ" +
    "XWM1kZKIJraGVqdKDJI2HUxsGhOThYiNSagY0RqaMJnpLKmJkQiC/Lwnub+" +
    "kuSl53eXNOe9zv / fe5zw1 / r + 6sI6W9PsCH3GYy2tSI75tqE / 1Mj" +
    "axl + p + DGE81fc4RaUK2MG7J27zVHsbgwFoxO0LN4e8glcBqMVKFC + " +
    "EXBXPGKs + Ifa + R11JyAO2Qvsv4AytuMRJIejE36QJg4 + Km7ajGed4" +
    "nQOO0YGf6UlrmEs3msQnjGIAf4opvckBv / EWu1hFAGYTYCoBPqdphbYvB" +
    "0RwPpQEhHYkByzga0lAaL / lgOmi8b0kILQzOeALFksCQruUA4axgTAogh" +
    "VGzicTJ4rRhoExhd7k1Y8c0F04u58ielOMsAl3CdCA65TWyE4PDnJARPkXA" +
    "vTcikMiC3GIR2AJShmfkBrbAAAAAElFTkSuQmCC";

  const img = document.createElement("img");
  img.src = b64;
  img.style.width = "16px";
  img.style.height = "16px";

  return img;
}

function createButton(
  resource: Resource,
  sfs: SimulatedFilesystem,
  deletable = true,
) {
  const container = document.createElement("div");
  container.classList.add("fl-ctr");

  const goButton = document.createElement("button");
  goButton.textContent = resource.name;

  if (resource.type == "directory") {
    goButton.classList.add("fl-btn-d");

    goButton.addEventListener("click", () => {
      simfs.cd([resource.name]);
      paintDirListing();
    });

    document.getElementById("texteditor").hidden = true;
  } else {
    goButton.classList.add("fl-btn-f");
    goButton.addEventListener("click", () => {
      const texteditor = document.getElementById("texteditor");
      texteditor.dataset.editing = simfs.cwd_path + "/" + resource.name;
      texteditor.dataset.filetype =
        {
          js: "javascript",
          html: "html",
          css: "css",
          json: "json",
          txt: "text",
          md: "markdown",
          py: "python",
          ts: "typescript",
        }[resource.name.split(".").pop()] || "text";

      texteditor.querySelector("header").innerText = resource.name;

      texteditor.querySelector("textarea").value = (
        resource as SFFile
      ).read();

      texteditor.hidden = false;

      if (document.querySelector("div#editor>textarea")) {
        document
          .querySelector("div#editor>textarea")
          .dispatchEvent(new Event("input"));
      }
    });
  }

  container.appendChild(goButton);

  if (deletable) {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("fl-del");
    deleteBtn.appendChild(createTrashImage());
    deleteBtn.addEventListener("click", () => {
      sfs.cwd().delete(resource.name);
      paintDirListing();
    });

    container.appendChild(deleteBtn);
  }

  return container;
}

function createSampleSimfs() {
  const root = simfs.root;

  root.createFile("file1.txt", "This is the first file.");
  root.createFile("file2.txt", "This is the second file.");

  const subdir = root.createDirectory("directory");
  subdir.createFile("file3.txt", "This is the third file.");
  subdir.createFile("file4.txt", "This is the fourth file.");

  subdir.createDirectory("emptydir");
}

function paintDirListing() {
  document.getElementById("cwd-display").innerText = simfs.cwd_path;
  if (simfs.cwd_path != "/")
    document.getElementById("cwd-display").innerText += "/";

  const listing = simfs.cwd().get();
  const listingEle = document.getElementById("dir-listing");

  while (listingEle.firstChild) {
    listingEle.removeChild(listingEle.firstChild);
  }

  if (simfs.cwd_path != "/") {
    const resource = {
      name: "..",
      type: "directory",
    } as Resource;

    const button = createButton(resource, simfs, false);
    button.style.backgroundColor = "lightcyan";

    listingEle.appendChild(button);
  }

  listing.forEach(resource => {
    const button = createButton(resource, simfs);

    listingEle.appendChild(button);
  });
}

createSampleSimfs();
paintDirListing();

window.onload = () => {
  // text editor save button
  (() => {
    const teSaveButton = document.querySelector(
      "#texteditor>button",
    ) as HTMLButtonElement;

    teSaveButton.addEventListener("click", () => {
      const path = document.getElementById("texteditor").dataset.editing;

      (simfs.get_by_path(path) as SFFile).write(
        document.querySelector("textarea").value,
      );
    });
  })();

  // new file/dir buttons
  (() => {
    const newFileButton = document.querySelector(
      "#new-file-btn",
    ) as HTMLButtonElement;

    const newDirButton = document.querySelector(
      "#new-dir-btn",
    ) as HTMLButtonElement;

    newFileButton.addEventListener("click", () => {
      const fileName = prompt("Enter file name");
      if (!fileName) return;

      if (
        simfs
          .cwd()
          .get()
          .some(resource => resource.name == fileName)
      ) {
        alert("File already exists");
        return;
      }

      simfs.cwd().createFile(fileName, "");
      paintDirListing();
    });

    newDirButton.addEventListener("click", () => {
      const dirName = prompt("Enter directory name");
      if (!dirName) return;

      if (
        simfs
          .cwd()
          .get()
          .some(resource => resource.name == dirName)
      ) {
        alert("Directory already exists");
        return;
      }

      simfs.cwd().createDirectory(dirName);
      paintDirListing();
    });
  })();

  // save/load/clear simfs buttons
  (() => {
    document.getElementById("save-btn").addEventListener("click", () => {
      const serialized = simfs.serialize() as string;
      const blob = new Blob([serialized], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "filesystem";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    });

    document.getElementById("load-btn").addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "*";
      input.style.display = "none";
      input.click();

      input.addEventListener("change", () => {
        const file = input.files[0];
        input.remove();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = evt => {
          simfs = new SimulatedFilesystem(evt.target.result as string);
          paintDirListing();
        };

        reader.readAsText(file);
      });
    });

    document.getElementById("clear-btn").addEventListener("click", () => {
      if (confirm("Are you sure?")) {
        simfs = new SimulatedFilesystem();
        paintDirListing();
      }
    });
  })();

  // init code editor
  (() => {
    const editorContainer = document.querySelector(
      "#texteditor>#editor",
    ) as HTMLDivElement;
    createCodeEditor(editorContainer);
  })();
};
