function Space() {

	this.canvas = null;
	this.width = 0;
	this.height = 0;
}

//inizializzazione spazio
Space.prototype.inizializzazione = function(div) {

	this.containerDiv = div;
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	//creazione canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Space.prototype.inizia = function() {

	//per poi impostare la grafica
	var ctx = this.canvas.getContext("2d");

	//Sfondo nero
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

};
