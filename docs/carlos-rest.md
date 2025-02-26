# REST
 
REST (Representational State Transfer) es un ESTILO de Arquitectura a la hora de realizar una comunicación entre cliente y servidor.

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeVPgJz5iiuy5xU37qRsClby3lGHJYfSRnNI2X-816c1Uth2AJht7wQOes33PpFbSMIUVdIBu4z0mWezyl1SW9kJ4sUoGsXLAhNorE6I3QFLycUL0uEYCoWI7f1T1hW5io7550H?key=5s4uctNlhIiDpaDERL6yY-Xg)**
Cuando nosotros realizamos una comunicación cliente-servidor, le enviamos una información y recibimos un resultado.

> ## NIVEL 0

Podemos mandar a un servicio un mensaje en formato **XML o JSON**. El servicio lo recepcionará y nos devolverá una respuesta.

Esto es lo que habitualmente en Arquitecturas REST se denomina el nivel 0. No tenemos **ningún tipo de organización. Es el caos.**

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXemhuXDZZh8gsmNpO2Z7QbJDQAJX5r4VsttLJvgFffYqYRq_BrdqxOF2M_i5VbsCFJ-yHhaSZFGTEGdF-7DTmVTqBYdlQh-eBZa5UKoMQwMUeDZ-5aOs0BixxIftnteKt55HMP7?key=5s4uctNlhIiDpaDERL6yY-Xg)**

> ## NIVEL 1 (Recursos)

En vez de tener servicios con métodos diversos **declaramos Recursos**.

  

¿Qué es un Recurso?

Se introducen los recursos (como Facturas, Cursos, Compras) y **cada recurso tiene su propia URL**. El cliente puede interactuar con estos recursos a través de métodos HTTP, como **GET** y **POST**, pero no hay una distinción estricta entre qué verbo se usa para qué tipo de operación.

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc3SSUGZ2Mzznw-fKAlj5mFSZ0WzhUMxkdYhJykRxrMs9-6jIuAPnHFNRbLSnuOC5EsN3fBlZlHKiSGBtYQgiPsA6hfzATMRMuE81jo03fWcYO0eNmrRkjF5IV9gZZm4azbZiIULA?key=5s4uctNlhIiDpaDERL6yY-Xg)**
## NIVEL 2 (**HTTP Verbs**)
Hasta este momento para realizar las peticiones se usa GET o POST indistintamente .

En el nivel 2 las **operaciones pasan a ser categorizadas de forma más estricta**.
Dependiendo decada tipo de operación se utilizará un método diferente de envío:

-   GET:  Se usara para solicitar consultar a los recursos
-   POST:  Se usará para insertar nuevos recursos
-   PUT :  Se usará para actualizar recursos
-   DELETE :  Se usará para borrar recursos

  **![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcn4BnQ6DmN4nqMxo8TMKZSuWgTgL6i7pOVpCAix7j9ae1qawWweRXfaY7OwGwLFzEr5KSNVP5sEMBMejpNYcp_OZ46GGBHfhfEuJZ8YGEyDfX_epK2dBydSpF5aHDmg-zRWKPW?key=5s4uctNlhIiDpaDERL6yY-Xg)**
## NIVEL 3 (HATEOAS)
Permite que las API REST incluyan enlaces a recursos relacionados en sus respuestas. Esto evita que el cliente tenga que conocer todas las URLs manualmente.

Por ejemplo, en vez de hacer dos peticiones separadas para obtener un Alumno y después sus Cursos, la API puede devolver directamente:

**Petición sin HATEOAS:**
````sql
GET /alumno/1
````
````json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "edad": 22
}
````
Después, el cliente sabe que debe hacer otra petición para obtener los cursos de ese alumno:
````sql
GET /alumno/1/cursos
````
````json
[ 
	{ "id": 101, "nombre": "Matemáticas" }, 
	{ "id": 102, "nombre": "Historia" } 
]
````
**Petición **con HATEOAS****
````sql
GET /alumno/1
````
````json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "edad": 22,
  "_links": {
    "self": "/alumno/1",
    "cursos": "/alumno/1/cursos"
  }
}
````
El cliente ahora sabe que el enlace a los **cursos** del alumno está en el campo `_links`. El cliente solo sigue el enlace proporcionado:

````sql
GET /alumno/1/cursos
````
````json
[ 
	{ "id": 101, "nombre": "Matemáticas" }, 
	{ "id": 102, "nombre": "Historia" } 
]
````

**Resumen de la diferencia:**

  

- **Sin HATEOAS**: El cliente necesita conocer las URLs de los recursos relacionados.

  

- **Con HATEOAS**: El servidor incluye los enlaces en la respuesta, y el cliente sigue esos enlaces sin tener que saber las URLs de antemano.
