const MENSAJEERRORCONTEXTOCANVAS="Error al obteniendo el contexto del canvas. No se puede inicializar WebGL, perdon :-(";
const MENSAJEERRORCANVAS="Error obteniendo el canvas (por id)";
const MENSAJEERRORSHADER="Error obeniendo el shader (por id)";
const XSHADERXFRAGMENT="x-shader/x-fragment";
const XSHADERXVERTEX="x-shader/x-vertex";
const RUTAIMAGENLUNA="img/moon.gif";
const RUTAIMAGENMARTE="img/mars_1k_color.jpg";
const RUTAIMAGENASTRONAUTA="img/astronauta.png";
const RUTAIMAGENTECHOINTERIOR="img/techo.jpg";
const RUTAIMAGENPISOINTERIOR="img/piso.jpg";
const RUTAIMAGENPAREDINTERIOR="img/paredInterna1.jpg";
const RUTAIMAGENEXTERIOR="img/shiphull.jpg";
const RUTAIMAGENVENTANALEXTERIOR="img/ventanal.jpg";
const TIPODESCRIPTINCORRECTO="El script debe ser de tipo x-shader/x-fragment o x-shader/x-vertex";
const IDSHADERFRAGMENTOS="shader-fs";
const IDSHADERVERTICES="shader-vs";
const AVERTEXPOSITION="aVertexPosition";
const ATEXTURECOORD="aTextureCoord";
const AVERTEXNORMAL="aVertexNormal";
const UPMATRIX="uPMatrix";
const UVIEWMATRIX="uViewMatrix";
const UMODELMATRIX="uModelMatrix";
const UNMATRIX="uNMatrix";
const USAMPLER="uSampler";
const UUSELIGHTING="uUseLighting";
const UAMBIENTCOLOR="uAmbientColor";
const ULIGHTPOSITION="uLightPosition";
const UDIRECTIONALCOLOR="uDirectionalColor";
const PROGRAMPARAM="No se puede inicializar los shaders. Error en el parametro del programa";
const SENSIBILIDADDELMOUSE = 100 * Math.PI;
const CLAVESOL="SOL";
const CLAVETIERRA="TIERRA";
const CLAVEESTACION="ESTACION";
const CLAVENAVE="NAVE";
const CLAVEINTERIORESTACION="INTERIORESTACION";
const CLAVEEXTERIORESTACION="EXTERIORESTACION";
const CLAVETAPAINICIALESTACION="TAPAINICIAL";
const CLAVETAPAFINALESTACION="TAPAFINAL";
const CLAVECENTROESTACION="CENTRO";
const CLAVECILINDROSLATERALESESTACION="CILINDROSLATERALES";
const CLAVEEJESESTACION="EJES";
const CLAVEPANELESTACION="PANEL";
const CLAVEESCOTILLASESTACION="ESCOTILLAS";
const CLAVEMANGUERA="MANGUERA";
const CLAVEASTRONAUTA="ASTRONAUTA";
const CLAVEEJESALAS="EJESDEALAS";
const CLAVEINTERIORPISO="INTERIORPISO";
const CLAVEINTERIORTECHO="INTERIORTECHO";
const CLAVEINTERIORDERECHA="INTERIORDERECHA";
const CLAVEINTERIORIZQUIERDA="INTERIORIZQUIERDA";
const CLAVEEXTERIORPISO="EXTERIORPISO";
const CLAVEEXTERIORTECHO="EXTERIORTECHO";
const CLAVEEXTERIORDERECHA="EXTERIORDERECHA";
const CLAVEEXTERIORIZQUIERDA="EXTERIORIZQUIERDA";
const TURBINAS="TURBINAS";
const EJESNAVE="EJESNAVE";
const PATAS="PATAS";
const CUERPO="CUERPO";
const XCOORD="x";
const YCOORD="y";
const ZCOORD="z";
const DORADO=1;
const VIOLETA=2;
const CELESTE=3;
const AMARILLO=4;
const BEIS=5;
const COLUMNASESTACIONESPACIAL = 120;
const FILASESTACIONESPACIAL = 120;
const FACTORESCALASOL=8.0;
const FACTORESCALATIERRA=80.0;
const DISTANCIAXSOL=180;
const DISTANCIAYTIERRA=-90.0;
const DISTANCIAZNAVE=-6.0;
const FACTORESCALAESTACION=0.5;
const FACTORESCALANAVE=0.05;
const COORDENADAXOBSERVADOR=30;
const COORDENADAYOBSERVADOR=30;
const COORDENADAZOBSERVADOR= -10;
const ALTURACILINDRO=1.0;
const CANTIDADDECILINDROS = 7;
const ANGULOINCIALCILINDRO = -60.0;
const VARIACIONDELANGULO = 20.0;
const BOTONIZQUIERDODELMOUSE=1;
const TECLADIRECCIONARRIBA=38;
const TECLADIRECCIONABAJO=40;
const COORDENADAX=0;
const COORDENADAY=1;
const TITAMIN=0.01
const TITAMAX=Math.PI-0.01;
const FIMIN=-Number.MAX_VALUE;
const FIMAX=Number.MAX_VALUE;
const BORDELEJANOFRUSTUM=2000.0;
const BORDECERCANOFRUSTUM=0.1;
const RADIOMINIMO=10.0;
const RADIOMAXIMO=(BORDELEJANOFRUSTUM/2.0);
const ARRIBA=1;
const ABAJO=2;
const GIRARHORARIO=-1.0;
const GIRARANTIHORARIO=-GIRARHORARIO;
const DESPLAZARIZQUIERDA=1;
const DESPLAZARATRAS=DESPLAZARIZQUIERDA;
const DESPLAZARADELANTE=-DESPLAZARATRAS;
const DESPLAZARDERECHA=-DESPLAZARIZQUIERDA;
const INDICEUBICACIONTRAYECTORIAPUNTOAPARICION=28;
const TITAPRIMERAPERSONAPUNTOAPARICION=1.55488;
const FIPRIMERAPERSONAPUNTOAPARICION=-1.4804;
const RADIOOBSERVACIONPRIMERAPERSONA=10;
const PASODESPLAZAMIENTORADIAL=0.1;
const DESPLAZAMIENTORADIALCENTROBAHIA=2;
const DESPLAZAMIENTORADIALPAREDEXTERIOR=2.5;
const DESPLAZAMIENTORADIALPAREDINTERIOR=1.7;
const INCREMENTOCONTECLAPARAACERCARSE=-1;
const INCREMENTOCONTECLAPARAALEJARSE=-INCREMENTOCONTECLAPARAACERCARSE;
