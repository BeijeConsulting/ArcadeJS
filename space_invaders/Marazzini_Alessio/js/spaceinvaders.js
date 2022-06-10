function Game() {

 this.configurazione = {
         rateoBombe: 0.05,
         velocitaBombe: 100,
         distanzaDiscesaNemico: 20,
         velocitaRazzi: 120,
         larghezzaCampo: 400,
         altezzaCampo: 300,
         fps: 50,
         righeNemici: 5,
         colonneNemici: 10,
         velocitaNave: 120,
     };

this.vite = 3;
this.width = 0;
this.height = 0;
this.limitiCampo = {left: 150, top: 150, right: 550, bottom: 450};
this.intervallo = 0;

this.listaStati = [];

this.tastiPremuti = {};
this.gameCanvas =  null;
}

function Nave(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 25;
}

function Nemico(x, y, riga, colonna) {
    this.x = x;
    this.y = y;
    this.riga = riga;
    this.colonna = colonna;
    this.width = 29;
    this.height = 25;
}


function Razzo(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}

function Bomba(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}



Game.prototype.inizializzazione = function(gameCanvas) {

    this.gameCanvas = gameCanvas;

    this.width = gameCanvas.width;
    this.height = gameCanvas.height;

};

//ritorna lo stato in cui ci si trova
Game.prototype.statoCorrente = function() {
    return this.listaStati.length > 0 ? this.listaStati[this.listaStati.length - 1] : null;
};

Game.prototype.cambiaStato = function(state) {

    if(this.statoCorrente()) {
        this.listaStati.pop();
    }

    if(state.enter) {
        state.enter(game);
    }

    this.listaStati.push(state);
};

function gameLoop(game) {
    var stato = game.statoCorrente();
    if(stato) {

        //delta t
        var dt = 1 / game.configurazione.fps;

        var ctx = game.gameCanvas.getContext("2d");

        //fai l'update se esiste
        if(stato.update) {
            stato.update(game, dt);
        }
        //fai la mostra se esiste
        if(stato.mostra) {
            stato.mostra(game, dt, ctx);
        }
    }
}

Game.prototype.inizia = function() {

    //passa subito alla pagina iniziale
    this.cambiaStato(new WelcomeState());
    this.vite = 3;
    var game = this;
    this.intervallo = setInterval(function () {gameLoop(game);}, 1000 / this.configurazione.fps );
};

//le successive due funzioni servono a comunicare i tasti premuti(la prima) e a comunicare quando viene alzato il dito da essi(la seconda)
Game.prototype.keyDown = function(keyCode) {
    this.tastiPremuti[keyCode] = true;
    if(this.statoCorrente() && this.statoCorrente().keyDown) {
        this.statoCorrente().keyDown(this, keyCode);
    }
};

Game.prototype.keyUp = function(keyCode) {
    delete this.tastiPremuti[keyCode];
    if(this.statoCorrente() && this.statoCorrente().keyUp) {
        this.statoCorrente().keyUp(this, keyCode);
    }
};

//stato pagina iniziale
function WelcomeState() {

}

WelcomeState.prototype.mostra = function(game, dt, ctx) {

    //azzerare lo sfondo
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center";
    ctx.textAlign="center";
    ctx.fillText("Space Invaders", game.width / 2, game.height/2 - 40);
    ctx.font="16px Arial";
    ctx.fillText("Premi 'Invio' per iniziare una partita.", game.width / 2, game.height/2);
};


WelcomeState.prototype.keyDown = function(game, keyCode,ctx) {
    //con il tasto 'invio' inizia la partita
    if(keyCode == 13) {
        game.cambiaStato(new PlayState(game.configurazione));
    }
};

//stato di gioco
function PlayState(configurazione) {
    console.log("sono dentro");
    this.configurazione = configurazione;
    this.nemiciScendono =  false;
    this.lastRocketTime = null;

    //entità nel gioco
    this.nave = null;
    this.nemici = [];
    this.razzi = [];
    this.bombe = [];
}

PlayState.prototype.enter = function(game) {
    //creo la nave
    this.nave = new Nave(game.width / 2, game.limitiCampo.bottom);
    //velocitaNave
    this.velocitaNave = this.configurazione.velocitaNave;
    this.rateoBombe = this.configurazione.rateoBombe;
    this.velocitaBombe = this.configurazione.velocitaBombe;

    this.vite = this.vite


    //creo i nemici
    var righes = this.configurazione.righeNemici;
    var files = this.configurazione.colonneNemici;
    var nemici = [];
    for(var rig = 0; rig < righes; rig++){
        for(var col = 0; col < files; col++) {
            nemici.push(new Nemico(
                (game.width / 2) + ((files/2 - col) * 200 / files),
                (game.limitiCampo.top + rig * 20),
                rig, col, 'Nemico'));
        }
    }
    this.nemici = nemici;
    this.velocitaNemico = {x: -35, y:0};
    this.velocitaNemicoSuccessiva = null;
};

PlayState.prototype.mostra = function(game, dt, ctx) {

    ctx.clearRect(0, 0, game.width, game.height);

    //mostra nave
    var img = new Image();
    img.src = 'img/spaceship.png';
    var x =  this.nave.x - (this.nave.width / 2);
    var y = this.nave.y - (this.nave.height / 2);
    var larghezza = this.nave.width ;
    var altezza = this.nave.height;
    ctx.drawImage(img, x, y, larghezza, altezza);

    //mostra nemici
    ctx.fillStyle = '#006600';
    for(var i=0; i<this.nemici.length; i++) {
        var invader = this.nemici[i];
        var img = new Image();
        img.src = 'img/invader.png';
        var x =  invader.x - invader.width/2;
        var y = invader.y - invader.height/2;
        var larghezza = invader.width;
        var altezza = invader.height;
        ctx.drawImage(img, x, y, larghezza, altezza);

    }

    //mostra bombe
    ctx.fillStyle = '#ff5555';
    for(var i=0; i<this.bombe.length; i++) {
        var bomb = this.bombe[i];
        ctx.fillRect(bomb.x - 2, bomb.y - 2, 4, 4);
    }

    //mostra razzi
    ctx.fillStyle = '#ff0000';
    for(var i=0; i<this.razzi.length; i++) {
        var razzo = this.razzi[i];
        ctx.fillRect(razzo.x, razzo.y - 2, 1, 4);
    }

    //mostra il numero di vite rimanenti
    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center";
    ctx.textAlign="center";
    ctx.fillText("Vite: "+game.vite, 175, 100);

};


var distanza = 0; /* servirà successivamente per verificare il movimento verticale dei nemici*/
PlayState.prototype.update = function(game, dt) {

   //se digiti 'freccia sinistra' si sposta a sinistra
   if(game.tastiPremuti[37]) {
       this.nave.x -= this.velocitaNave * dt;
   }
   //se digiti 'freccia destra' si sposta a destra
   if(game.tastiPremuti[39]) {
       this.nave.x += this.velocitaNave * dt;
   }
   //se digiti 'barra spaziatrice' spara i razzi
   if(game.tastiPremuti[32]) {
       this.fireRocket();
   }

   //se digiti 'esc' torna al menu
   if(game.tastiPremuti[27]) {
     game.vite = 3;
     game.cambiaStato(new WelcomeState());
   }

   //contenere la nave nei limiti dello spazio di gioco
   if(this.nave.x < game.limitiCampo.left) {
       this.nave.x = game.limitiCampo.left;
   }
   if(this.nave.x > game.limitiCampo.right) {
       this.nave.x = game.limitiCampo.right;
   }

   //movimento verticale delle bombe nemiche
    for(var i=0; i<this.bombe.length; i++) {
        var bomba = this.bombe[i];
        bomba.y += dt * bomba.velocity;

        //quando va oltre lo schermo viene cancellata
        if(bomba.y > this.height) {
            this.bombe.splice(i, 1);
        }
    }

    //movimento verticale razzi
    for(i=0; i<this.razzi.length; i++) {
        var razzo = this.razzi[i];
        razzo.y -= dt * razzo.velocity;

        //quando va oltre lo schermo viene cancellato
        if(razzo.y < 0) {
            this.razzi.splice(i, 1);
        }
    }

    //movimento nemici
    var hitLeft = false, hitRight = false, hitBottom = false;
    for(i=0; i<this.nemici.length; i++) {
        var nemico = this.nemici[i];
        var nuovaX = nemico.x + this.velocitaNemico.x * dt;
        var nuovaY = nemico.y + this.velocitaNemico.y * dt;
        if(hitLeft === false && nuovaX < game.limitiCampo.left) {
            hitLeft = true;
        }
        else if(hitRight === false && nuovaX > game.limitiCampo.right) {
            hitRight = true;
        }
        else if(hitBottom === false && nuovaY > game.limitiCampo.bottom) {
            hitBottom = true;
        }

        if(!hitLeft && !hitRight && !hitBottom) {
            nemico.x = nuovaX;
            nemico.y = nuovaY;
        }
    }

    //modifica direzioni e velocità dei nemici per quando stanno scendendo
    if(this.nemiciScendono) {
        distanza += this.velocitaNemico.y * dt;
        if(distanza >= this.configurazione.distanzaDiscesaNemico) {
            this.nemiciScendono = false;
            this.velocitaNemico = this.velocitaNemicoSuccessiva;
            distanza = 0;
        }
    }
    //se i nemici toccano il limite a sinistra, si muoveranno prima in giu e poi a destra
    if(hitLeft) {
        this.velocitaNemico = {x: 0, y:35 };
        this.nemiciScendono = true;
        this.velocitaNemicoSuccessiva = {x: 35 , y:0};
    }
    //se i nemici toccano il limite a destra, si muoveranno prima in giu e poi a sinistra
    if(hitRight) {
        this.velocitaNemico = {x: 0, y:35 };
        this.nemiciScendono = true;
        this.velocitaNemicoSuccessiva = {x: -35 , y:0};
    }
    //se i nemici toccano il limite in basso, hai perso
    if(hitBottom) {
      this.vite = 3;
      game.cambiaStato(new GameOverState());

    }

    //collisione tra razzo e nemici
    for(i=0; i<this.nemici.length; i++) {
        var nemico = this.nemici[i];
        var colpito = false;

        for(var j=0; j<this.razzi.length; j++){
            var razzo = this.razzi[j];

            if(razzo.x >= (nemico.x - nemico.width/2) &&
               razzo.x <= (nemico.x + nemico.width/2) &&
               razzo.y >= (nemico.y - nemico.height/2) &&
               razzo.y <= (nemico.y + nemico.height/2)){

                this.razzi.splice(j, 1);
                colpito = true;
                break;
            }
        }
        if(colpito) {
            this.nemici.splice(i, 1);
        }
    }

    //trovo i nemici in prima linea(riga)
    var primaFilaNemici = {};
    for(var i=0; i<this.nemici.length; i++) {
        var nemico = this.nemici[i];

        if(!primaFilaNemici[nemico.colonna] || primaFilaNemici[nemico.colonna].riga < nemico.riga) {
            primaFilaNemici[nemico.colonna] = nemico;
        }
    }

    //ogni nemico in prima fila avrà una possibilita di sparare una bombba
    for(var i=0; i<this.configurazione.colonneNemici; i++) {
        var nemico = primaFilaNemici[i];
        if(!nemico) continue;
        var possibilita = this.rateoBombe * dt;
        if(possibilita > Math.random() /*numero casuale tra 0 e 1*/) {
            this.bombe.push(new Bomba(nemico.x, nemico.y + nemico.height / 2,this.velocitaBombe));
        }
    }

    //collisione tra bomba nemica e nave
    for(var i=0; i<this.bombe.length; i++) {
        var bomba = this.bombe[i];
        if(bomba.x >= (this.nave.x - this.nave.width/2) &&
           bomba.x <= (this.nave.x + this.nave.width/2) &&
           bomba.y >= (this.nave.y - this.nave.height/2) &&
           bomba.y <= (this.nave.y + this.nave.height/2)){
            this.bombe.splice(i, 1);
            game.vite--;
        }
    }

    //collisione tra nave e nemici
    for(var i=0; i<this.nemici.length; i++) {
        var nemico = this.nemici[i];
        if((nemico.x + nemico.width/2) > (this.nave.x - this.nave.width/2) &&
            (nemico.x - nemico.width/2) < (this.nave.x + this.nave.width/2) &&
            (nemico.y + nemico.height/2) > (this.nave.y - this.nave.height/2) &&
            (nemico.y - nemico.height/2) < (this.nave.y + this.nave.height/2)) {
            game.vite = 0;
        }
    }

    //vite finite
    if(game.vite <= 0) {
        game.cambiaStato(new GameOverState());
    }

    //vittoria
    if(this.nemici.length === 0) {
        game.cambiaStato(new VictoryState());
    }
};

PlayState.prototype.fireRocket = function() {
    //se tra ora e l'ultimo razzo lanciato sono passati almeno 0.75 secondi si può sparare ancora, altrimenti no
    var data = new Date().valueOf();  //numero millisecondi dal 1 gennaio 1970 ad adesso
    if( (new Date()).valueOf() - this.lastRocketTime > 750){

        this.razzi.push(new Razzo(this.nave.x, this.nave.y - 12, this.configurazione.velocitaRazzi));
        this.lastRocketTime = (new Date()).valueOf();
    }
};


//stato vittoria
function VictoryState() {
    console.log("vittoria");
}

VictoryState.prototype.mostra = function(game, dt, ctx) {

    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="36px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.font="24px Arial";
    ctx.fillText("Hai vinto ",game.width / 2, game.height/2 - 40);
    ctx.fillText("Premi 'Invio' per tornare al menu",game.width / 2, game.height/2);
};

VictoryState.prototype.update = function(game, dt, ctx) {
    if(game.tastiPremuti[13]) {
      game.vite = 3;
      game.cambiaStato(new WelcomeState());
    }
};

//stato sconfitta
function GameOverState() {
    console.log("hai perso");
}

GameOverState.prototype.mostra = function(game, dt, ctx) {

    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="36px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.font="24px Arial";
    ctx.fillText("Hai perso ",game.width / 2, game.height/2 - 40);
    ctx.fillText("Premi 'Invio' per tornare al menu",game.width / 2, game.height/2);
};

GameOverState.prototype.update = function(game, dt, ctx) {
    if(game.tastiPremuti[13]) {
      game.vite = 3;
        game.cambiaStato(new WelcomeState());;
    }
};
