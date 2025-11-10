let currentColumn = null;
let draggedCard = null;

function openPopup(columnId){
  currentColumn = columnId;
  document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup(){
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('taskName').value = '';
  document.getElementById('taskDue').value = '';
  document.getElementById('taskUsers').value = '';
  document.getElementById('taskColor').value = 'red';
}

function saveTask(){
  const name = document.getElementById('taskName').value.trim();
  if(!name){alert('Please enter a task name.');return;}
  const due = document.getElementById('taskDue').value;
  const users = document.getElementById('taskUsers').value;
  const color = document.getElementById('taskColor').value;

  const column = document.getElementById(currentColumn);
  const card = document.createElement('div');
  card.className = 'card';
  card.style.borderLeft = `6px solid ${color}`;
  card.draggable = true;
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);

  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = `<strong>${escapeHtml(name)}</strong><br><small>Due: ${escapeHtml(due) || 'N/A'}</small><br><small>Users: ${escapeHtml(users) || 'None'}</small>`;

  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.title = 'Delete task';
  del.textContent = '✕';
  del.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(confirm('Delete this task?')) card.remove();
  });

  card.appendChild(content);
  card.appendChild(del);

  column.insertBefore(card, column.querySelector('.add-card'));
  closePopup();
}

function dragStart(e){
  draggedCard = this;
  this.classList.add('dragging');
}

function dragEnd(e){
  this.classList.remove('dragging');
  draggedCard = null;
}

function allowDrop(e){
  e.preventDefault();
}

function drop(e, columnId){
  e.preventDefault();
  if(draggedCard){
    const column = document.getElementById(columnId);
    column.insertBefore(draggedCard, column.querySelector('.add-card'));
  }
}

// small utility to avoid XSS when inserting text
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"]+/g, function(s){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]||s);
  });
}

// optional: keyboard support for delete when a card is focused
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Delete' || e.key === 'Backspace'){
    const active = document.activeElement;
    if(active && active.classList && active.classList.contains('card')){
      if(confirm('Delete selected task?')) active.remove();
    }
  }
});
