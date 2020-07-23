# Instrucciones

La api se encuentra publicada en la URL https://mutant-284204.ue.r.appspot.com, para realizar uso de la API tenemos los endpoint:
<br />
<br />
https://mutant-284204.ue.r.appspot.com/Mutant el cual es un metodo POST, con el objetivo de detectar si un DNA humano es mutante basandose en su secuencia de ADN
<br />
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
<br />
Este metodo no recibe parametros.
<br />
El retorno de este metodo es:
<br />
{“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}
<br />
<br />
NOTA:
Esta api esta desarrollada en el lenguaje Javascript (node)
<br />
<br />
Trabaja con la libreria Cluster, con el fin de utilizar los multiples nucleos del procesador
<br />
<br />
Si desea realizar un git clone del proyecto para ejecutarlo, debe agregar el archivo "conf.json" en la raiz del proyecto.
<br />
<br />
Con la estructura
<br />
{
    "serverPort": 8000,
    "serverEnv": "develop",
    "mongoDB" : {
        "connectionString": "CADENA_DE_CONEXION_MONGODB"
    }
}
