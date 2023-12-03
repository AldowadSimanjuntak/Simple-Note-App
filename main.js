const notes = [];

const noteInput = document.getElementById("noteInput");
const saveButton = document.getElementById("saveButton");
const noteList = document.getElementById("noteList");
const notification = document.getElementById("notification");

saveButton.addEventListener("click", addNote);

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        notes.push(noteText);
        noteInput.value = "";
        notes.reverse();
        displayNotes();
        showNotification("Data berhasil ditambah", "green");

        const newNoteIndex = 0;
        const newNoteLi = noteList.children[newNoteIndex];
        const newNoteCopyButton = newNoteLi.querySelector(".copy-button");
        newNoteCopyButton.style.display = "inline-block";
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    displayNotes();
    showNotification("Data berhasil dihapus", "red");
}

function displayNotes() {
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("div");
        li.className = "note-item";
        li.innerHTML = `
            <p>${note.length > 500 ? note.substring(0, 500) + "..." : note}</p>
            <div class="button-container">
                <button class="edit-button" onclick="editNote(${index})">Edit</button>
                <button class="delete-button" onclick="deleteNote(${index})">Hapus</button>
                <button class="copy-button" onclick="copyNote(${index})">Salin</button>
                ${note.length > 500 ? `<button class="show-more-button" onclick="showFullText(${index})">Lihat Selengkapnya</button>` : ""}
            </div>
        `;

        noteList.appendChild(li);
    });
}

function showFullText(index) {
    const li = noteList.children[index];
    const p = li.querySelector("p");
    p.textContent = notes[index];
    li.querySelector(".show-more-button").style.display = "none";
}

function editNote(index) {
    const li = noteList.children[index];
    const p = li.querySelector("p");
    const editButton = li.querySelector(".edit-button");
    const deleteButton = li.querySelector(".delete-button");
    const showMoreButton = li.querySelector(".show-more-button");

    p.contentEditable = "true";
    p.focus();

    editButton.textContent = "Konfirmasi";
    editButton.classList.add("confirm-button");
    editButton.classList.remove("edit-button");

    editButton.onclick = () => confirmEdit(index);
    deleteButton.style.display = "none";
    showMoreButton.style.display = "none";

    copyButton.style.display = "none";
}

function confirmEdit(index) {
    const li = noteList.children[index];
    const p = li.querySelector("p");
    const editButton = li.querySelector(".confirm-button");
    const deleteButton = li.querySelector(".delete-button");
    const showMoreButton = li.querySelector(".show-more-button");

    p.contentEditable = "false";
    notes[index] = p.textContent;
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.classList.remove("confirm-button");
    editButton.onclick = () => editNote(index);
    deleteButton.style.display = "inline-block";
    if (notes[index].length > 500) {
        showMoreButton.style.display = "inline-block";
    }

    // Tampilkan kembali tombol "Salin" dalam item catatan yang sedang diedit
    const copyButton = li.querySelector(".copy-button");
    copyButton.style.display = "inline-block";

    displayNotes();
    showNotification("Data berhasil diedit", "blue");
}

function copyNote(index) {
    const textToCopy = notes[index];
    navigator.clipboard.writeText(textToCopy)
        .then(() => showNotification("Teks berhasil disalin", "green"))
        .catch((error) => showNotification("Gagal menyalin teks", "red"));
}

function showNotification(message, color) {
    notification.textContent = message;
    notification.style.backgroundColor = color;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 5000);
}

displayNotes();
