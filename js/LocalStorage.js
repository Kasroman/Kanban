import { Note } from './Note.js';


export class LocalStorage {
    static storage = {
        id : 0
    };

    static addToStorage(obj){
        obj.butoir
        ? this.storage[this.storage.id + 1] = {
            title : obj.title,
            content : obj.content,
            date : obj.date,
            list : obj.list,
            butoir : obj.butoir
        }

        : this.storage[this.storage.id + 1] = {
            title : obj.title,
            content : obj.content,
            date : obj.date,
            list : obj.list
        };
        this.storage.id++;
        this.setStorage();
    }

    static deleteFromStorage(id){
        this.getStorage();
        delete this.storage[id];
        this.setStorage();
    }

    static updateListsFromStorage(){
        if(localStorage.getItem('storage')){
            this.getStorage();
            Note.removeNotes();
            for (const [key, value] of Object.entries(this.storage)){
                const note = this.storageToNote(key);
                switch(this.storage[key].list){
                    case 'todo':
                        note.setNote(todo);
                        break;
                    case 'done':
                        note.setNote(done);
                        break;
                    case 'verified':
                        note.setNote(verified);
                        break;
                    case 'trash':
                        LocalStorage.deleteFromStorage(note.id);
                        break;
                } 
            }
        }
    }

    static moveToStorageList(id, list){
        if(list === 'trash'){
            document.querySelector('.modale-section').classList.remove('d-none');
            document.querySelector('#delete-btn').setAttribute('data', id);
        }else{
            this.getStorage();
            this.storage[id].list = list;
            this.setStorage();
        }
    }

    static storageToNote(id){
        this.getStorage();
        let note = new Note(this.storage[id].title, this.storage[id].content);
        note['date'] = this.storage[id].date;
        note['id'] = id;
        if(this.storage[id].butoir){
            note['butoir'] = this.storage[id].butoir;
        }
        return note;
    }

    static exportStorage(element){
        const blob = new Blob([JSON.stringify(this.storage)], {
            type: 'application/json'
        });
        
        element.href = URL.createObjectURL(blob);
        element.download = "kanban_backup.json";
    }

    static importStorage(e){
        e.preventDefault();
        if (!file.value.length) return;
    
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            this.storage = JSON.parse(e.target.result);
            LocalStorage.setStorage();
            LocalStorage.updateListsFromStorage();
        });
        reader.readAsText(file.files[0]);
    }

    static setStorage(){
        localStorage.setItem('storage', JSON.stringify(this.storage));
    }

    static getStorage(){
        this.storage = JSON.parse(localStorage.getItem('storage'));
    }
}