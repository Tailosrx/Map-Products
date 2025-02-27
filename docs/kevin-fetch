# Carga Asincrona con Fetch

> Podria decirse que es un remplazo al *XMLHttpRequest* ya que este ultimo hace lo que permite la 
**API Fetch** pero mas limitada. 

(Fetch puede usarse en mas tecnologias y hace mas comodo la manipulacion de peticiones y respuestas).

# Ejemplo Simple
		    

    async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    document.getElementById("textFile").innerHTML= myText
    }

    

> La función `fetch()` devuelve una Promesa la cual es cumplida por un objeto Response **(Representa la respuesta del servidor)**

## Hacer un Request

Para hacer un request deberemos llamar un `fetch()` donde le pasaremos el recurso que queremos buscar. Puede ser uno de estos:

 

 1. Un `String` que contenga el **Url**
 2. Un objeto, como una instancia de la **Url**
 3. Una instancia de `Request`
 
## Ejemplo con Post

    fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    })
    .then(respuesta => respuesta.json())
    .then(datos => console.log(datos))

 > En este ejemplo se puede visualizar como buscamos la informacion en la web pasada como parametro. 


## Interfaces que usan Fetch


