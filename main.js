

let noteListRootElement=document.querySelector('.noteList');

let notes=[]

function renderElementTOScreen(){
  if(localStorage.getItem('notes')){
    notes=JSON.parse(localStorage.getItem('notes'))
    notes.forEach(note=>{
      renderNoteToDoList(note,note.uniqueId);
    })
  }
}

document.querySelector('#deleteAllNotes').addEventListener("click",()=>{
     document.querySelectorAll('.note').forEach(note=>{
      note.remove();
     })
     localStorage.clear();
})

document.querySelector('#createNoteButton').addEventListener('click',()=>{
  let uniqueId='note'+Math.floor(Math.random()*1000)
  let note={
    title:document.querySelector('#createnotetitle').value,
    content:document.querySelector('#createNoteContent').value
  }
  addNoteToLocalStorage(note,uniqueId);
  renderNoteToDoList(note,uniqueId);
})
function renderNoteToDoList(note,uniqueId){
   //console.log(uniqueId)
  let noteDiv=document.createElement('div')
  noteDiv.classList.add('note' , uniqueId)
  let noteTitle=document.createElement('h3')
  let noteContent=document.createElement('p')
  let noteDeleteButton=document.createElement('button')
  noteDeleteButton.className='deletenote'


  noteTitle.innerText=note.title;
  noteContent.innerText=note.content;
  noteDeleteButton.innerText='delete note'

  noteDeleteButton.addEventListener('click',()=>{
    //noteDeleteButton.parentElement.remove();
    removeElementFromNotesList(uniqueId);
  })


  noteDiv.appendChild(noteTitle)
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteDeleteButton);

  noteListRootElement.appendChild(noteDiv);

  document.querySelector('#createnotetitle').value=''
  document.querySelector('#createNoteContent').value=''


 

}

function addNoteToLocalStorage(note,uniqueId){
  note={...note,uniqueId};
  notes.push(note);
  localStorage.setItem('notes',JSON.stringify(notes))
}



function removeElementFromNotesList(id){
  document.querySelector('.' + id).remove();
  notes=JSON.parse(localStorage.getItem('notes'))
  let index=notes.findIndex(note=>note.uniqueId == id)
  notes.splice(index,1)
  localStorage.setItem('notes',JSON.stringify(notes));
}

renderElementTOScreen();