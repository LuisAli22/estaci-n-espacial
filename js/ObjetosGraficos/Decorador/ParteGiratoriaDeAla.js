function ParteGiratoriaDeAla(){
  this.limiteAngular=0.0;
  this.angulo = 0.0;
  this.deltaAngulo=0.005;

}
ParteGiratoriaDeAla.prototype.calcularMaximoMinimos=function(){
  this.angulo = Math.min(this.angulo,this.limiteAngular);
  this.angulo = Math.max(this.angulo,-this.limiteAngular);
}
ParteGiratoriaDeAla.prototype.girar=function(sentidoDeGiro){
  this.angulo=this.angulo+sentidoDeGiro*this.deltaAngulo;
  this.calcularMaximoMinimos();
}
ParteGiratoriaDeAla.prototype.giroHorario=function(){
  this.girar(GIRARHORARIO);
}
ParteGiratoriaDeAla.prototype.giroAntiHorario=function(){
  this.girar(GIRARANTIHORARIO);
}
