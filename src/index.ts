import SimulatedFilesystem, { SFFile } from "simfs";

let simfs = new SimulatedFilesystem();

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
    const button = document.createElement("button");
    button.classList.add("fl-btn");
    button.textContent = "up";
    button.style.color = "purple";

    button.addEventListener("click", () => {
      simfs.cd([".."]);
      paintDirListing();
    });

    listingEle.appendChild(button);
  }

  listing.forEach(resource => {
    const button = document.createElement("button");
    button.classList.add("fl-btn");

    const textSpan = document.createElement("span");
    textSpan.textContent = resource.name;

    button.appendChild(textSpan);

    if (resource.type == "directory") {
      button.classList.add("fl-d");

      button.addEventListener("click", () => {
        simfs.cd([resource.name]);
        paintDirListing();
      });

      document.getElementById("texteditor").hidden = true;
    } else {
      button.classList.add("fl-f");
      button.addEventListener("click", () => {
        const texteditor = document.getElementById("texteditor");
        texteditor.dataset.editing = simfs.cwd_path + "/" + resource.name;

        texteditor.querySelector("header").innerText = resource.name;

        texteditor.querySelector("textarea").value = (
          resource as SFFile
        ).read();

        texteditor.hidden = false;
      });
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";

    deleteBtn.addEventListener("click", () => {
      simfs.cwd().delete(resource.name);
      paintDirListing();
      document.getElementById("texteditor").hidden = true;
    });

    button.innerHTML += "&emsp;";
    button.appendChild(deleteBtn);
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
};
