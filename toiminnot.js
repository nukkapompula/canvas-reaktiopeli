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
    }
}

// klikattavan objektin ominaisuudet, funktiot jne
function esine(x, y, colour, radius){
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.radius = radius;
}

