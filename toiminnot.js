function lataa(){
    peliAlue.aloita();
}

var peliAlue = {
    canvas : document.createElement("canvas"),
    aloita : function(){
        console.log("funktio toimii");
        this.canvas.width = 320;
        this.canvas.height = 240;
        this.konteksti = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}