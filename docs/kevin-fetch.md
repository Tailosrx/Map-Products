# Carga Asincrona con Fetch

> La API Fetch es una alternativa moderna a  **XMLHttpRequest** que permite realizar peticiones HTTP de forma mas sencilla y legible.  

**Ventajas sobre XMLHttpRequest**

 - Soporte nativo de Promises
 - Mayor compatibilidad con async/await
 - Mas versatilidad con el uso de `Headers`, `Request`, `Response`

# Ejemplo de una Petición GET
		    

    async function getData(url) {
    try{
    let response = await fetch(url);
     if (!response.ok) {
     throw new Error(`Error ${response.status}: ${response.statusText}`);
     }
    let data = await response.json();
    console.log(data);
    } catch (error) {
    console.error('Hubo un problema con la peticion:', error);
    }
    }
    getData('https://jsonplaceholder.typicode.com/users');

    

> La función `fetch()` devuelve una Promesa la cual es cumplida por un objeto `Response` **(Representa la respuesta del servidor)**

### Metodos HTTP con Fetch

 - `GET` Obtiene datos
 - `POST` Envia datos
 - `PUT` Actualiza datos
 - `DELETE` Elimina datos

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

# Diferencia entre `then/catch` y `async/await`

Se puede usar `fetch()` con `then/catch` o con `async/await`. La segunda opción es mas legible y recomendada en código moderno.

# Interfaces Relacionadas con Fetch

 - `Request: ` Permite crear peticiones personalizadas
 - `Response: `  Sirve para manejar las respuestas del servidor
 - `Headers: ` Permite manipular cabeceras HTTP
 -  `Body: `  Maneja los datos enviados/recibidos
## Ejemplo con Request

    const request = new Request('https://jsonplaceholder.typicode.com/posts',{
    method: 'GET',
    headers: new Headers{{ 'Content-Type': 'application/json' })
    });
    
    fetch(request)
    .then(response => response.json())
    .then(data => console.log('Datos obtenidos:', data))
    .catch(error => console.error('Error en la petición:', error));
    }

> En este ejemplo:
- Se usa `new Request()` para definir una solicitud personalizada
- Se agregan `Headers` con `Content-Type: application/json`
- Se ejecuta `fetch(request)`, obteniendo la respuesta en formato JSON
    

## Ejemplo con Response

    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response = > {
    console.log('Status', response.status);
    console.log('Headers: ', response.headers);
    return response.json();
    })
    .then(data => console.log('Data: ', data))
    .catch(error => console.error('Error:', error));

> En este ejemplo:
- Se imprime el `status` (si sale `200` significa que ha habido exito)
- Se accede a `headers` para ver las cabeceras HTTP de la respuesta
- Se convierte la respuesta en JSON y se muestra en consola

## Ejemplo con Headers Personalizados

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer token123');
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'GET',
    headers: headers
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error: ', error));
    
> En este ejemplo:
- Se crean `Headers` y se agregan `Content-Type` y `Authorization`.
- `Authorization` se usa para enviar un token de autenticación (`Bearer token123`).
- Se realiza una petición `GET` con estos encabezados.

## Ejemplo con Body

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Nuevo Post',
	body: 'Este es el contenido del post',
        userId: 1
      })
     })
     .then(response => response.json())
     .then(data => console.log('Post creado:', data))
     .catch(error => console.error('Error:', error));

> En este ejemplo:
- Se envían datos en formato JSON con `body: JSON.stringify({...})`
- Se especifica en los `headers` que el contenido es `application/json`
- Se maneja la respuesta con `then()` y errores con `catch()`
  


 > Las acciones que puedes hacer son recuperar, establecer, agregar i eliminar cabeceras de la lista de la lista de cabeceras de la solicitud.



