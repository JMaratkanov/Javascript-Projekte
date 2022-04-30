'use strict'
window.onload = isDocumentReady;
function isDocumentReady(){
    const button = document.getElementById("cmdId");
    button.addEventListener("click",showAllToasts);
}

// ruft alle Toasts auf
function showAllToasts(){
    document.querySelectorAll(".toast").forEach(showToast);
}

//toast anzeigen
function showToast(toast){
    // Prüfen ob das Element schon sichtbar ist
    // wenn sichtbar dann weitere Ausführung beenden
    if(toast.classList.contains("block")){			//schon sichtbar? stop, für 3ten damit er oben bleibt
        return;
    }

	
    // den transitionend event listener entfernen
    toast.removeEventListener("transitionend", removeBlockClass);

    // toast an das Ende des Toast-Containers
    document.querySelector(".toast-container").appendChild(toast);


    // toast zum Block-Element machen (wird sichtbar)
    toast.classList.add("block");

    // Mindestens eine Bildaktualisierung verstreichen lassen
    // und dann erst toast mit der spezial-Klasse sichtbar machen
    setTimeout(function (){
        // toast mit der CSS-Klasse sichtbar machen
        toast.classList.add("fadein");
    },100);




    // Anzeigedauer aus dem HTML-Attribut ermitteln
    const showTime = toast.getAttribute("data-showTime");

    // Ist Anzeigedauer vorhanden, dann entsprechende
    // Zeit abwarten und die ausblenden Funktion aufrufen
    if(showTime !== null){
        setTimeout(hideToast, showTime, toast); //funkt, zeit, param der fk
    }
}

function removeBlockClass(event){
    event.target.classList.remove("block");
}

//lässt verschwinden
function hideToast(toast){
    // zuerst die eingeblendet Klasse entfernen
    toast.classList.remove("fadein");
    // warten bis Animation durchgelaufen ist
    setTimeout(function (){
        // erstm dann block Klasse entfernen
        toast.classList.remove("block");
    },1000)

    // event wird immer ausgelöste, wenn Element
    // eine CSS-transition beendet hat
    toast.addEventListener("transitionend", removeBlockClass);

}





