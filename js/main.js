import { Note } from './Note.js';
import { LocalStorage } from './LocalStorage.js';

const submitBtn = document.querySelector('#submit-btn');

const todo = document.querySelector('#todo');
const done = document.querySelector('#done');
const verified = document.querySelector('#verified');
const trash = document.querySelector('#trash');

todo.addEventListener('dragover', (e) => {Note.onDragOver(e)});
todo.addEventListener('drop', (e) => {Note.onDrop(e)});

done.addEventListener('dragover', (e) => {Note.onDragOver(e)});
done.addEventListener('drop', (e) => {Note.onDrop(e)});

verified.addEventListener('dragover', (e) => {Note.onDragOver(e)});
verified.addEventListener('drop', (e) => {Note.onDrop(e)});

trash.addEventListener('dragover', (e) => {Note.onDragOver(e)});
trash.addEventListener('drop', (e) => {Note.onDrop(e)});

LocalStorage.updateListsFromStorage();

submitBtn.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const butoir = document.querySelector('#butoir').value;
    console.log(butoir);

    if(title && content){
        let note;
        if(butoir){
            note = new Note (title, content, butoir);
        }else {
            note = new Note(title, content);
        }
        document.querySelector('#title').value = '';
        document.querySelector('#content').value = '';
        document.querySelector('#butoir').value = '';
        LocalStorage.addToStorage(note);
        LocalStorage.updateListsFromStorage();
    }
});


const modal = document.querySelector('.modale-section');
const modalClose = document.querySelector('.modale-close');
const deleteBtn = document.querySelector('#delete-btn');

modalClose.addEventListener('click', () => {
    modal.classList.add('d-none');
});

modal.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.classList.add('d-none');
    }
});

deleteBtn.addEventListener('click', () => {
    console.log(deleteBtn.getAttribute('data'));
    LocalStorage.deleteFromStorage(deleteBtn.getAttribute('data'));
    modal.classList.add('d-none');
    LocalStorage.updateListsFromStorage();
});

const exportBtn = document.querySelector('#export');
const importBtn = document.querySelector('#import');

exportBtn.addEventListener('click', () => {
    LocalStorage.exportStorage(exportBtn);
});

const form = document.querySelector('#upload');
const file = document.querySelector('#file');

form.addEventListener('submit', (e) => {
    LocalStorage.importStorage(e);
    file.value = '';
});