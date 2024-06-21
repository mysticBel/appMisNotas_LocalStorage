
const addButton = document.getElementById('addNote');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');



function addNote(){
    //borra espacios vacios
    const note = noteInput.value.trim();
    
    if(note){
        createNoteElement(note);
        noteInput.value=''; //limpia el input
        saveNote(); //guarda la nota
    } else{
        // console.log('me cliqueaste!'); 
        alert("Por favor ingresa una nota.")
    }
}

addButton.addEventListener('click',addNote);

function createNoteElement(note){
    
    const listItem = document.createElement('li');
    listItem.className = 'noteContent';

    const noteText = document.createElement('span');
    noteText.textContent = note;
    noteText.className = 'noteText';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'deleteNote';
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';

    listItem.appendChild(noteText);
    listItem.appendChild(editButton); 
    listItem.appendChild(deleteButton); //añade el boton
    noteList.appendChild(listItem); //añade al padre
    
    deleteButton.addEventListener('click',function deleteNote(){
        noteList.removeChild(listItem);
        saveNote();
    });


   
    editButton.addEventListener('click',function editNote(){
        const notaEditada = prompt("Edita la nota :" ,noteText.textContent )
        
        if (notaEditada !== null&& newNote.trim() !== ''){
            noteText.textContent = notaEditada.trim();
            saveNote(); 
        }
        
    });
}



function saveNote(){
    let notes= [];
    noteList.querySelectorAll('li').forEach(function(item){
        notes.push(item.textContent.replace('Borrar','').trim());
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda las notas en el localStorage como una cadena JSON.
}

function loadNotes(){
    const notes = JSON.parse(localStorage.getItem('notes')) || []; //Si no hay notas guardadas, usa un array vacío por defecto.

    notes.forEach(createNoteElement);
}

loadNotes();