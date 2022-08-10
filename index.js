let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById("addTxt");
    let notes = document.getElementById("notes");
    if (notes == null){
        notesObj = [];
    } else { 
        // notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
});
function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h6 class="text-xl font-medium text-gray-900 dark:text-white">Note ${index + 1}</h6>
                <p class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="bg-red-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 button-create">Delete</button>
                <hr>
            </div>
        </div>
        `;
    }
    );
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Create your first note.`;
    }
}
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
showNotes();
