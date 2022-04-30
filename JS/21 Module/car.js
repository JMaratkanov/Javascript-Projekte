let a = 111;
let b = 222;
let c = 333;

function sagHallo(){
    console.log('Hallo zusammen');
}

class Car{
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
    get getPS(){
        return this.power;
    }
    set setPS(ps){
        this.power = ps;
    }

    get getName(){
        return this.name;
    }
    set setName(name){
        this.name = name;
    }
}

//export{Car}

//exports
//Man kann mehrere male exportieren an verschiedenen stellen
export {Car, sagHallo, a as AAA,b as BBB,c as CCC}