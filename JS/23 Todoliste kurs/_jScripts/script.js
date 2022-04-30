
// public; Array das alle todos aufnimmt
let todos = [];


// Die input box selektieren
const todoInput = document.querySelector('.todo-input');

// Die <ul>-Liste mit der Klasse "todo-items" selektiern
const todoItemsList = document.querySelector('.todo-items');

// Die todo-form selektieren
const todoForm = document.querySelector('.todo-form');

// eventListener a.d. Form binden und das submit event kontrollieren
// das return-event bei Eingabe anbinden
todoForm.addEventListener('submit', function(event) {				//nicht click sondern submit! button submit nicht click 
																	//Return auf Eingabefeld ist möglich
																	//anonfk kriegt event- eventlistener können mit events arbeiten
  // Verhindern, dass die Seite beim Absenden des Formulars neu geladen wird
  event.preventDefault();		//unterbindet submit - seite nicht neu laden auch nicht mit dem onklick button
  addTodo(todoInput.value); // addTodo aufrufen & Inhalt der Textbox mitgeben
});

// auf Klick-events der Checkboxen & der Löschen Buttons lauschen
todoItemsList.addEventListener('click', function(event) {

  // wurde auf einer checkbox geklickt?
  if (event.target.type === 'checkbox') {
    // Das item togglen; durchgestrichen oder nicht; hier wird die ID der checkbox
    // dem toggle übergeben
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // Prüfen ob der delete-button gedrückt wurde
  if (event.target.classList.contains('delete-button')) {
    // Die ID aus dem data-key Attribut des li-Items auslesen
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

//*** *********************************************************************************************

// ein todo hinzufügen
function addTodo(item) {
  // item soll der textinhalt des input sein, falls der nicht leer ist
  // Obj. erzeugen & dem todo hinzu fügen, Speicher Methode aufrufen
  // & das Input Feld leeren
  if (item !== '') {
    // Ein todo object erzeugen
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // die input box leeren
    todoInput.value = '';

    // Das neu erzeugte todo Objekt dem public deklarierten todos Array hinzufügen
    todos.push(todo);
    addDataToLocalStorage(todos); // das "neue" todos Array speichern
  }
}

// die todos rendern und anzeigen
function renderTodos(todos) {
  // Erst mal die Item-Liste leeren
  todoItemsList.innerHTML = '';

  // alle items aus dem todos Element durchlaufen
  // und Liste wieder neu aufbauen
  todos.forEach(function(item) {

    // Prüfen, ob ein element completed ist
    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li'); // <li> Element: <li> </li>
    li.setAttribute('class', 'item'); // <li class="item"> </li>
    li.setAttribute('data-key', item.id); // <li class="item" data-key="1635411563026"> </li>
    /**
     * aus jedem item wird folgendes gebaut:
     * <li class="item" data-key="1635411563026">
     * */

    // item ist ein Objekt & falls Eigenschaft completed true eine CSS
    // Klasse hinzu, die das item durchgestrichen darstellt
    if (item.completed === true) {
      li.classList.add('checked');
    }

    // Alternative zu dem auskommebtierte Code weiter unten 
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checkbox');

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(item.name));

    const button = document.createElement('button');
    button.setAttribute('class', 'delete-button');
    button.appendChild(document.createTextNode('X'));
    li.appendChild(button);

    // //checkbox mittels =>`<= einfügen ' " ´
    // li.innerHTML = `
    //   <input type="checkbox" class="checkbox" ${checked}>
    //   ${item.name}
    //   <button class="delete-button">X</button>
    // `;

    // das erzeugte li wird dem ul der todoItemList hinzu gefügt
    todoItemsList.append(li);
  });
}

// add todo to local storage
function addDataToLocalStorage() {

  // das todo-Objekt in JSON-String verwandeln & im store speichern
  localStorage.setItem('todos', JSON.stringify(todos));

  // die todos i.d. Anzeige rendern
  renderTodos(todos);
}

// Holt die Daten aus dem local storage
function getDataFromLocalStorage() {
  //im local storage gibt es eine Variable mit dem key:todos
  const daten = localStorage.getItem('todos');

  // wenn Daten gefunden wurden diese in ein Array wandeln & rendern aufrufen
  if (daten) {
    todos = JSON.parse(daten);
    renderTodos(todos);
  }
}

// toggle die checkbox ist entweder ausgewählt oder nicht
function toggle(id) {
  todos.forEach(function(item) {
    // Hier KEIN === verwenden, weil zwei Typen, number oder string
    if (item.id == id) {
      // den Wert togglen
      item.completed = !item.completed;
    }
  });

  addDataToLocalStorage(todos);
}

/**
 * löscht ein Todo aus dem Todos-Array,
 * aktualisiert ocalstorage und
 * rendert die aktualisierte Liste auf dem Bildschirm
 * @param id (aus dem li-Item)
 */
function deleteTodo(id) {
  // filtert das <li> mit der ID heraus und aktualisiert das Todos-Array
  // somit erhält man ein Array aus dem das zu löschende Item verschwunden ist
  todos = todos.filter(function(item) {
    // Verwende != nicht !==, da hier die Typen unterschiedlich sind.
    // Einmal ist es eine Zahl und ein ander Mal ist es ein String
    return item.id != id;
  });

  // den localStorage updaten
  addDataToLocalStorage(todos);
}

// Seitenaufruf holt sämtliche Daten vom localStorage
getDataFromLocalStorage();