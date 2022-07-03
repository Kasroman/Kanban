import { LocalStorage } from "./LocalStorage.js";
import { DateUtils } from './DateUtils.js';

export class Note {
    constructor(title, content, butoir = null){
        this.title = title;
        this.content = content;
        this.date = new Date();
        if(butoir){
            const dateArray = butoir.split('-');
            console.log(dateArray);
            this.butoir = new Date(butoir);
          }
        this.list = 'todo';
    }

    setNote(element){
        const title = document.createElement('h5');
        const content = document.createElement('p');
        const date = document.createElement('p');

        const div = document.createElement('div');

        title.textContent = this.title;
        content.textContent = this.content;
        date.textContent = DateUtils.dateToFr(this.date);

        title.classList.add('fw-bold', 'text-dark');
        div.classList.add('bg-warning', 'p-3', 'rounded-3', 'm-3', 'text-light', 'note');
        date.classList.add('text-secondary');

        const butoir = document.createElement('p');
        if(this.butoir){
            butoir.textContent = DateUtils.dateToFr(this.butoir);
            butoir.classList.add('text-danger');

            const today = new Date();
            if(DateUtils.compareDate(this.butoir, today)){
                div.classList.remove('bg-warning');
                div.classList.add('bg-danger');

                butoir.classList.remove('text-danger');
                butoir.classList.add('text-white');
            }
        }

        div.setAttribute('draggable', 'true');
        div.setAttribute('id', this.id);
        div.addEventListener('dragstart', (e) => {Note.onDragStart(e)});

        (this.butoir) ? div.append(title, content, date, butoir) : div.append(title, content, date);
        element.append(div);
    }

    static removeNotes(){
        const notes = document.querySelectorAll('.note');
        notes.forEach(note => {note.remove()});
    }

    static onDragStart(e){
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    static onDragOver(e){
        e.preventDefault();
    }

    static onDrop(e){
        const idElement = e.dataTransfer.getData('text');
        const idTarget = e.target.id;
        if(e.target.id === 'trash' || e.target.id === 'todo' || e.target.id === 'done' || e.target.id === 'verified'){
            LocalStorage.moveToStorageList(idElement, idTarget);
            LocalStorage.updateListsFromStorage();
        }
        e.dataTransfer.clearData();
    }
}