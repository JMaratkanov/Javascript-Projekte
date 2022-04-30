'use strict'

let canvas = document.getElementById("canvasID");
let contextElement = canvas.getContext("2d");

let reihen = 30;
let spalten = 30;
let zellenBreite = canvas.width/spalten;
let zellenHoehe = canvas.height/reihen;
let schlange= [
    {x:9, y:3}
];
let futter= {
    x:2,
    y:3
};
let laufrichtung = "LINKS";
let essenEingesammelt = false;



setInterval(lasseSpielLaufen,500);
zeichneAlles();
document.addEventListener("keydown",fangeDiePfeiltasten);

function zeichneAlles(){
    // Spielfeld zeichnen
    contextElement.fillStyle = "black";
    contextElement.fillRect(0,0, canvas.width, canvas.height);

    // Schlange
    contextElement.fillStyle = "white";
    schlange.forEach(element => zeichneMich(element.x,element.y))

    // Essen
    contextElement.fillStyle = "yellow";
    zeichneMich(futter.x,futter.y);

    requestAnimationFrame(zeichneAlles);
}

function zeichneMich(x,y){
    contextElement.fillRect(x * zellenBreite, y * zellenHoehe, zellenBreite -1 , zellenHoehe-1 );
}

function lasseSpielLaufen(){
    testeObSpielIstZuEnde();
    bewegeSchlange();
    if(essenEingesammelt){
        schlange = [
            {
                x:schlange[0].x,
                y:schlange[0].y
            }, ...schlange
        ];
        essenEingesammelt = false;
    }
    if(laufrichtung == 'LINKS'){
        schlange[0].x--;
    }
    if(laufrichtung == 'RECHTS'){
        schlange[0].x++;
    }
    if(laufrichtung == 'OBEN'){
        schlange[0].y--;
    }
    if(laufrichtung == 'UNTEN'){
        schlange[0].y++;
    }
    if(schlange[0].x == futter.x &&
        schlange[0].y == futter.y
    ){
        essenEingesammelt = true;
        plaziereSchlangenFutter();
    }
}

function plaziereSchlangenFutter(){
    let randomX = Math.floor(Math.random() *  spalten);
    let randomY = Math.floor(Math.random() *  reihen);
    futter = {
        x:randomX,
        y:randomY
    };
}

function testeObSpielIstZuEnde(){
    if(schlange[0].x < 0 ||
        schlange[0].x > spalten-1 ||
        schlange[0].y < 0 ||
        schlange[0].y > reihen-1
    ){
        schlange = [
            {x:9, y:3},
        ];
        laufrichtung = "LINKS";
    }
}
function fangeDiePfeiltasten(e){
    switch (e.keyCode){
        case 37:
            console.log("LINKS");
            laufrichtung = 'LINKS';
            break;
        case 38:
            console.log("OBEN");
            laufrichtung = 'OBEN';
            break;
        case 39:
            console.log("RECHTS");
            laufrichtung = 'RECHTS';
            break;
        case 40:
            console.log("UNTEN");
            laufrichtung = 'UNTEN';
            break;
    }
}

function bewegeSchlange(){
    const kopf = {
        x:schlange[0].x,
        y:schlange[0].y
    }
    schlange.unshift(kopf);
    schlange.pop();
}


