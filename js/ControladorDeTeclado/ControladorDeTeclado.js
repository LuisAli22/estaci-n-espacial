function ControladorDeTeclado(escena) {
  var nave=escena.obtenerUnObjetoDeLaEscena(CLAVENAVE);
  var patasNave=nave.obtenerHijo(PATAS);
  var ejesNave=nave.obtenerHijo(CLAVEEJESALAS);
  var turbinas=ejesNave.obtenerHijo(TURBINAS);
  var estacionEspacial=escena.obtenerUnObjetoDeLaEscena(CLAVEESTACION);
  var paneles=estacionEspacial.obtenerHijo(CLAVEPANELESTACION);
  this.comandos={ 38: new AbrirPaneles(paneles),
                  40: new CerrarPaneles(paneles),
                  79: new GiroTurbinasAntihorario(turbinas),
                  80: new GiroTurbinasHorario(turbinas),
                  75: new GiroEjesAntihorario(ejesNave),
                  76: new GiroEjesHorario(ejesNave),
                  103: new GiroAntihorarioNave(nave),
                  105: new GiroHorarioNave(nave),
                  104: new MoverNaveArriba(nave),
                  101: new MoverNaveAbajo(nave),
                  100: new MoverNaveIzquierda(nave),
                  102: new MoverNaveDerecha(nave),
                  97: new DesacelerarNave(nave),
                  98: new AcelerarNave(nave),
                  37: new CerrarTrenNave(patasNave),
                  39: new AbrirTrenNave(patasNave),
                  107: new Acercarse(escena),
                  109: new Alejarse(escena),
                  65: new MoverseHaciaLaIzquierda(escena),
                  68: new MoverseHaciaLaDerecha(escena),
                  83: new MoverseHaciaAtras(escena),
                  87: new MoverseHaciaAdelante(escena),
                  49: new AsignarCamaraOrbital(escena),
                  50: new AsignarCamaraPrimeraPersona(escena),
                  51: new AsignarCamaraCabinaNave(escena),
                  52: new AsignarCamaraPersecucionNave(escena)};
	document.onkeydown = this.sePresionaUnaTecla.bind(this);
	document.onkeyup = this.seSueltaUnaTecla.bind(this);
};
ControladorDeTeclado.prototype.deshabilitarAccionPorDefectoDeFlechasYEspacio=function(evento){
  if([32, 37, 38, 39, 40].indexOf(evento.keyCode) > -1) {
        evento.preventDefault();
    }
}
ControladorDeTeclado.prototype.sePresionaUnaTecla = function(evento) {
  console.log("Codigo de tecla: ",evento.keyCode);
  this.deshabilitarAccionPorDefectoDeFlechasYEspacio(evento);
  var key=evento.keyCode.toString();
  if (this.comandos.hasOwnProperty(key)){
    this.comandos[key].indicarQueEstaActualmentePresionada(true);
    this.comandos[key].ejecutar(evento);
}
};

ControladorDeTeclado.prototype.seSueltaUnaTecla = function(evento) {
  console.log("Codigo de tecla: ",evento.keyCode);
  var key=evento.keyCode.toString();
  if (this.comandos.hasOwnProperty(key)){
    this.comandos[key].indicarQueEstaActualmentePresionada(false);
    this.comandos[key].soltar();
  }
};

ControladorDeTeclado.prototype.manejarTeclas = function() {

  for(var claveComando in this.comandos){
    if (this.comandos[claveComando].estaActualmentePresionada()){
      this.comandos[claveComando].ejecutar();
    }
  }
};
