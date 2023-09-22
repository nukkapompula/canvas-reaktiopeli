var pallo;
var pisteet = 0;
var elamat = 3;
var extra;

// pelin käynnistyminen, arvojen alustaminen, pallon luominen
function lataa(){
    peliAlue.aloita();
    document.getElementById("ohjeet").style.display = "none";
    document.getElementById("tulokset").style.display = "none";
    document.getElementById("kommentti").innerHTML = "Elämät loppuivat,";
    pisteet = 0;
    elamat = 3;
    extra = new bonus(20, "blue");
    pallo = new esine(20, varinArpominen());
    pallo.suunnanArpominen();
    pallo.sijainninArpominen();
    peliAlue.canvas.addEventListener("mousedown", klikkaus);
}

function klikkaus(event){
    const palloYla = pallo.y - 2;
    const palloAla = pallo.y + pallo.sade - 1;
    const palloVasen = pallo.x - 2;
    const palloOikea = pallo.x + pallo.sade - 1;
    if(event.clientX > palloVasen && event.clientX < palloOikea 
        && event.clientY > palloYla && event.clientY < palloAla){
        pallo.suunnanArpominen();
        pallo.sijainninArpominen();
        pisteet += 1;
        pallo.vari = varinArpominen();
    } else {
        elamat -= 1;
    }

    const extraYla = extra.y - 2;
    const extraAla = extra.y + extra.sade - 1;
    const extraVasen = extra.x - 2;
    const extraOikea = extra.x + extra.sade - 1;

    if(event.clientX > extraVasen && event.clientX < extraOikea 
        && event.clientY > extraYla && event.clientY < extraAla){
        pisteet += 5;
        elamat += 1;
    }
    extra.x = -100
    extra.y = -100

    // pallon nopeutus ja ylimääräinen elämä
    if(pisteet > 0 && pisteet % 10 == 0){
        extra.sijainninArpominen();

    }
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
    },
    pysayta : function(){
        clearInterval(this.ajastin);
        document.getElementById("tulokset").style.display = "block";
        if(document.getElementById("edelliset").innerHTML == "Pistesaaliisi: "){
            document.getElementById("edelliset").innerHTML += `${pisteet} `;
        } else {
            document.getElementById("edelliset").innerHTML += `| ${pisteet} `;
        }
        if(pisteet < 15){
            document.getElementById("kommentti").innerHTML += " tarvitset hieman harjoitusta.";
        } else if(pisteet >= 15 && pisteet < 30){
            document.getElementById("kommentti").innerHTML += " ei huono saavutus.";
        } else if(pisteet >= 30 && pisteet < 60){
            document.getElementById("kommentti").innerHTML += " taitavasti pelattu!";
        } else if(pisteet >= 60 && pisteet < 100){
            document.getElementById("kommentti").innerHTML += " erinomainen tulos!";
        } else {
            document.getElementById("kommentti").innerHTML += " kerrassaan ilmiömäinen suoritus!";
        }
    }
}

// klikattavan pallon ominaisuudet, funktiot jne.
function esine(sade, vari){
    this.vari = vari;
    this.sade = sade;
    this.nopeus = 1;
    this.paivita = function(){
        kti = peliAlue.konteksti;
        kti.fillStyle = vari;
        kti.strokeStyle = "black";
        kti.lineWidth = 2;
        kti.beginPath();
        kti.arc(this.x, this.y, this.sade / 2, 0, Math.PI * 2);
        kti.fill();
        kti.beginPath();
        kti.arc(this.x, this.y, this.sade / 2, 0, Math.PI * 2);
        kti.stroke();
        kti.font = "20px Arial";
        kti.fillStyle = "black";
        kti.fillText(`Pisteet ${pisteet}`, 10, 30);
        kti.fillText(`Elämät ${elamat}`, 230, 30);
    }
    this.liiku = function(){
        if(this.suunta == 0){
            this.y -= this.nopeus;
        } else if(this.suunta == 1){
            this.x += this.nopeus * 0.8;
            this.y -= this.nopeus * 0.8;
        } else if(this.suunta == 2){
            this.x += this.nopeus;
        } else if(this.suunta == 3){
            this.x += this.nopeus * 0.8;
            this.y += this.nopeus * 0.8;
        } else if(this.suunta == 4){
            this.y += this.nopeus;
        } else if(this.suunta == 5){
            this.x -= this.nopeus * 0.8;
            this.y += this.nopeus * 0.8;
        } else if(this.suunta == 6){
            this.x -= this.nopeus;
        } else {
            this.x -= this.nopeus * 0.8;
            this.y -= this.nopeus * 0.8;
        }
        // pelialueelta karkaaminen
        if(this.x > peliAlue.canvas.width || this.x < 0 || this.y > peliAlue.canvas.height || this.y < 0){
            this.suunnanArpominen();
            this.sijainninArpominen();
            elamat -= 1;
        }
    }
    this.suunnanArpominen = function(){
        /*
        liikkumissuunnat:
        0 = ylös, 1 = yläoikea, 2 = oikea, 3 = alaoikea,
        4 = alas, 5 = alavasen, 6 = vasen, 7 = ylävasen
        */
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

        if(pisteet > 0 && pisteet % 10 == 0){
            pallo.nopeus += 0.1;
            extra.sijainninArpominen();
            if(elamat < 3){
                elamat += 1;
            }
    
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

// pallon sijainnin, pisteiden ym. päivittäminen ajastimen kautta
function paivitaPeliAlue(){
    peliAlue.tyhjenna();
    pallo.liiku();
    pallo.paivita();
    extra.paivita();
    if(elamat < 1){
        peliAlue.pysayta();
    }
}

// pallon väri arvotaan kunkin kierroksen alussa
function varinArpominen(){
    let vari1 = Math.round(Math.random()*255);
    let vari2 = Math.round(Math.random()*255);
    let vari3 = Math.round(Math.random()*255);
    return `rgb(${vari1}, ${vari2}, ${vari3})`;
}







function bonus(sade, vari){
    this.x = -100;
    this.y = -100;
    this.vari = vari;
    this.sade = sade;
    this.paivita = function(){
        kti = peliAlue.konteksti;
        kti.fillStyle = vari;
        kti.strokeStyle = "black";
        kti.lineWidth = 2;
        kti.beginPath();
        kti.arc(this.x, this.y, this.sade / 2, 0, Math.PI * 2);
        kti.fill();
        kti.beginPath();
        kti.arc(this.x, this.y, this.sade / 2, 0, Math.PI * 2);
        kti.stroke();
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