var pallo;

// pelin käynnistyminen, objektin luominen
function lataa(){
    peliAlue.aloita();
    pallo = new esine(50, 50, "yellow", 20);
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
function esine(x, y, colour, radius){
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.radius = radius;
    this.paivita = function(){
        kti = peliAlue.konteksti;
        kti.fillStyle = colour;
        kti.fillRect(this.x, this.y, this.radius, this.radius);
    }
}

// objektien sijainnin, pisteiden ym päivittäminen
function paivitaPeliAlue(){
    peliAlue.tyhjenna();
    pallo.paivita();
}