# Instrucciones

La api se encuentra publicada en la URL https://mutant-284204.ue.r.appspot.com, para realizar uso de la API tenemos los endpoint:
<br />
https://mutant-284204.ue.r.appspot.com/Mutant el cual es un metodo POST, con el objetivo de detectar si un DNA humano es mutante basandose en su secuencia de ADN
<br />
un ejemplo de una peticion para este metodo es:
<br />
{
"dna": ["GTGCGA","CAGTGC","TTATAT","AGAAGG","ACCCTA","TCACTG"]
}
<br />
Las letras de los Strings solo pueden ser: (A,T,C,G).
<br />
Los retornos de este metodo son:
<br />
En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un
403-Forbidden
<br />
<br />
https://mutant-284204.ue.r.appspot.com/Stats el cual es un metodo GET, con el objetivo de devolver un Json con las estadisticas de las verificaciones de ADN
<br />
Este metodo no recibe parametros.
<br />
El retorno de este metodo es:
<br />
{“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}