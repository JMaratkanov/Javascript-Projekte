"use strict"

window.onload = isDocumentReady;		//window sehr mächtig, event:onload kriegt fk zugeschrieben,
										//Wenn seite geladen ruft window.onload die fk aud

window.onload = console.log("loaded");	//so nicht!! mit runden klammern führt er einfach aus an der Stelle

function isDocumentReady(){				//fk kapselt kritischen code
    let element = document.getElementById("testId");	//Ändere div Container, existiert an import stelle von script nicht
    element.innerText = "Text dynamisch hinzu";		//Lösung entweder winbinden unten in html 
}

