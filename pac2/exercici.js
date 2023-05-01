mensaje_final = "Resultats de les peticions del exercici" + "\n"


function pedir_numero(mensaje, min, max) {
    // recibe el mensaje de petición y la horquilla de minimo y maximo del rango posible
    let num = 0;
    while (num < min || num > max || (typeof num) != "number" || isNaN(num)) {
        num = parseInt(prompt(mensaje));
    }
    return num;
}
function constructor_nums(){
    this.n_primer= pedir_numero("Introdueix un primer número senser/natural del 1 al 50:", 1, 50);
    this.n_segon = pedir_numero("Introdueix un segon número senser/natural del 1 al 50:", 1, 50);
    this.suma = this.n_primer + this.n_segon;
    this.rel_primers = son_primers(this.n_primer , this.n_segon);
    this.rel_parells = son_parells(this.n_primer , this.n_segon);
    this.rel_intermitjos = rangs_intermitjos(this.n_primer , this.n_segon);
}
function unir_mensajes(inicial, parcial) {
    let mensaje = inicial + parcial + "\n";
    return mensaje;
}

function es_primer(n) {
    let resultado = true;
    for (let i = 2; i <= n / 2; i++) {
        if (n % i === 0) {
            resultado = false;
            return resultado;
        }
    }
    return resultado;
}
function son_primers(n1, n2) {
    let msg;
    if (es_primer(n1)) {
        if (es_primer(n2)) {
            msg = "Els números introduits son primers ";
        } else {
            msg = `Nomes el número  ${n1}  és primer`;
        }
    } else {
        if (es_primer(n2)) {
            msg = `Nomes el número  ${n2}  és primer`;
        } else {
            msg = "Cap dels números introduits son primers ";
        }
    }
    return msg;
}
function son_parells(n1, n2) {
    let msg
    if (n1 % 2 === 0) {
        if (n2 % 2 === 0) {
            msg = "Els números introduits son parells ";
        } else {
            msg = `Nomes el número  ${n1}  és parell`;
        }
    } else {
        if (n2 % 2 === 0) {
            msg = `Nomes el número  ${n2}  és parell`;
        } else {
            msg = "Cap dels números introduits son parells ";
        }
    }
    return msg;
}
function rangs_intermitjos(n1, n2) {
    let msg = "";
    let lista = [];
    let inicio;
    if (n1<n2) {
        if (n1 % 2 === 0) {
            inicio = 2;
        } else {
            inicio = 1;
        }
        for (i = (n1 + inicio); i < n2; i++) {
            lista.push(i);
            i++;
        }
        msg =`${n1} és menor que ${n2}.`; 
        if (lista.length > 0){
            msg = `${msg} Y el rang de parells entre ells es: ${lista}`;
        } else{
            msg = `${msg} Y no hi cap número parell entre ells.`;
        }
    }else if(n1>n2){
            if (n1 % 2 != 0) {
                inicio = 2;
            } else {
                inicio = 1;
            }
            for (i = (n1 - inicio); i > n2; i--) {
                lista.push(i);
                i--;
            }
            msg =`${n1} és major que ${n2}.`;
            if (lista.length > 0){
                msg = `${msg} Y el rang de senars entre ells es: ${lista}`;
            } else{
                msg = `${msg} Y no hi cap número senars entre ells.`;
            }
    }else{       
            msg = `Els dos números son iguals i aquest és: ${n1}`;
    }
    return msg;
}

const exercici= new constructor_nums();

mensaje_final = unir_mensajes(mensaje_final, "");

msg = "El primer elegit és: " + exercici.n_primer + " i el segon és: " + exercici.n_segon + "\n";
mensaje_final = unir_mensajes(mensaje_final, msg);
msg = "El resultat de sumar tots dos números es: " + exercici.suma + "\n";
mensaje_final = unir_mensajes(mensaje_final, msg);
mensaje_final = unir_mensajes(mensaje_final, exercici.rel_primers);
mensaje_final = unir_mensajes(mensaje_final, exercici.rel_parells);
mensaje_final = unir_mensajes(mensaje_final, exercici.rel_intermitjos);
console.log(mensaje_final);
alert(mensaje_final)
