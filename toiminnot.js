var pallo;

/*
pallon liikkumissuunnat:
0 = ylös, 1 = yläoikea, 2 = oikea, 3 = alaoikea,
4 = alas, 5 = alavasen, 6 = vasen, 7 = ylävasen
*/

// pelin käynnistyminen, objektin luominen
function lataa(){
    peliAlue.aloita();
    pallo = new esine("yellow", 20);
    pallo.suunnanArpominen();
    pallo.sijainninArpominen();
    document.getElementsByTagName("canvas")[0].addEventListener("click", testi);
}

function testi(event){
    console.log(event.clientX, event.clientY);
}

// pelialueeseen liittyvät toiminnot
var peliAlue = {
    canvas : document.createElement("canvas"),
    aloita : function(){
        this.canvas.width = 320;
        this.canvas.height = 240;
        this.konteksti = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.ajastin = setInterval(paivitaPeliAlue, 20);
    },
    tyhjenna : function(){
        this.konteksti.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// klikattavan objektin ominaisuudet, funktiot jne
function esine(colour, radius){
    this.colour = colour;
    this.radius = radius;
    this.nopeus = 1;
    this.paivita = function(){
        kti = peliAlue.konteksti;
        kti.fillStyle = colour;
        kti.fillRect(this.x, this.y, this.radius, this.radius);
    }
    this.liiku = function(){
        if(this.suunta == 0){
            this.y -= this.nopeus;
        } else if(this.suunta == 1){
            this.x += this.nopeus;
            this.y -= this.nopeus;
        } else if(this.suunta == 2){
            this.x += this.nopeus;
        } else if(this.suunta == 3){
            this.x += this.nopeus;
            this.y += this.nopeus;
        } else if(this.suunta == 4){
            this.y += this.nopeus;
        } else if(this.suunta == 5){
            this.x -= this.nopeus;
            this.y += this.nopeus;
        } else if(this.suunta == 6){
            this.x -= this.nopeus;
        } else {
            this.x -= this.nopeus;
            this.y -= this.nopeus;
        }
    }
    this.suunnanArpominen = function(){
        let arpa = Math.round(Math.random()*7);
        if(arpa == 0){
            this.suunta = 0;
        } else if(arpa == 1){
            this.suunta = 1;
        } else if(arpa == 2){
            this.suunta = 2;
        } else if(arpa == 3){
            this.suunta = 3;
        } else if(arpa == 4){
            this.suunta = 4;
        } else if(arpa == 5){
            this.suunta = 5;
        } else if(arpa == 6){
            this.suunta = 6;
        } else {
            this.suunta = 7;
        }
    }
    this.sijainninArpominen = function(){
        let Xmin = Math.ceil(50);
        let Xmax = Math.floor(270);
        let Ymin = Math.ceil(50);
        let Ymax = Math.floor(190);
        let arpaX = Math.floor(Math.random() * (Xmax - Xmin) + Xmin);
        let arpaY = Math.floor(Math.random() * (Ymax - Ymin) + Ymin);
        this.x = arpaX;
        this.y = arpaY;
    }
}

// objektien sijainnin, pisteiden ym päivittäminen
function paivitaPeliAlue(){
    peliAlue.tyhjenna();
    pallo.paivita();
    pallo.liiku();
}