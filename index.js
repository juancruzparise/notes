let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let newNote = addTxt.value.trim();

    if (newNote !== "") {
        notesObj.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        showNotes();
        swal("Good job!", "Your note has been added!", "success");
    } else {
        swal("Oops!", "You must enter something to create a note.", "error");
    }
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let notesElm = document.getElementById("notes");
    notesElm.innerHTML = "";

    notesObj.forEach(function (element, index) {
        let noteCard = document.createElement("div");
        noteCard.className = "noteCard my-2 mx-2 card";
        noteCard.style.width = "18rem";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let noteHeader = document.createElement("h6");
        noteHeader.className = "text-xl font-medium text-gray-900 dark:text-white";
        noteHeader.innerText = `Note ${index + 1}`;

        let noteTextArea = document.createElement("textarea");
        noteTextArea.className = "editable-note bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900";
        noteTextArea.value = element;
        noteTextArea.disabled = true;

        let editButton = document.createElement("button");
        editButton.className = "bg-yellow-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 button-create";
        editButton.innerText = "Edit";
        editButton.onclick = function () {
            toggleEditMode(noteTextArea, editButton, saveButton);
        };

        let saveButton = document.createElement("button");
        saveButton.className = "bg-green-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 button-create";
        saveButton.innerText = "Save";
        saveButton.style.display = "none";
        saveButton.onclick = function () {
            saveNoteEdit(index, noteTextArea, editButton, saveButton);
        };

        let deleteButton = document.createElement("button");
        deleteButton.className = "bg-red-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 button-create";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function () {
            deleteNote(index);
        };

        let hr = document.createElement("hr");

        cardBody.appendChild(noteHeader);
        cardBody.appendChild(noteTextArea);
        cardBody.appendChild(editButton);
        cardBody.appendChild(saveButton);
        cardBody.appendChild(deleteButton);
        cardBody.appendChild(hr);
        noteCard.appendChild(cardBody);

        notesElm.appendChild(noteCard);
    });

    if (notesObj.length === 0) {
        notesElm.innerHTML = `Nothing to show! Create your first note.`;
    }
}

function toggleEditMode(textArea, editButton, saveButton) {
    textArea.disabled = !textArea.disabled;
    editButton.style.display = textArea.disabled ? "block" : "none";
    saveButton.style.display = textArea.disabled ? "none" : "block";
}

function saveNoteEdit(index, textArea, editButton, saveButton) {
    let editedNote = textArea.value;
    if (editedNote.trim() !== "") {
        notesObj[index] = editedNote;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        toggleEditMode(textArea, editButton, saveButton);
        swal("Success!", "Your note has been edited!", "success");
    } else {
        swal("Oops!", "You must enter something to save your note.", "error");
    }
}

function deleteNote(index) {
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    swal("Deleted!", "Your note has been deleted!", "success");
}

showNotes();