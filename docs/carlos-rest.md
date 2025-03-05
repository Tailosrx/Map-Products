# REST
 
REST (Representational State Transfer) es un ESTILO de Arquitectura a la hora de realizar una comunicación entre cliente y servidor.

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeVPgJz5iiuy5xU37qRsClby3lGHJYfSRnNI2X-816c1Uth2AJht7wQOes33PpFbSMIUVdIBu4z0mWezyl1SW9kJ4sUoGsXLAhNorE6I3QFLycUL0uEYCoWI7f1T1hW5io7550H?key=5s4uctNlhIiDpaDERL6yY-Xg)**

Cuando nosotros realizamos una comunicación cliente-servidor, le enviamos una información y recibimos un resultado.

## NIVEL 0

Podemos mandar a un servicio un mensaje en formato **XML o JSON**. El servicio lo recepcionará y nos devolverá una respuesta.

Esto es lo que habitualmente en Arquitecturas REST se denomina el nivel 0. No tenemos **ningún tipo de organización. Es el caos.**

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXemhuXDZZh8gsmNpO2Z7QbJDQAJX5r4VsttLJvgFffYqYRq_BrdqxOF2M_i5VbsCFJ-yHhaSZFGTEGdF-7DTmVTqBYdlQh-eBZa5UKoMQwMUeDZ-5aOs0BixxIftnteKt55HMP7?key=5s4uctNlhIiDpaDERL6yY-Xg)**

**Petición GET** (sin un recurso claro):
````sql
GET /alumno
````
**Respuesta** (simplemente devuelve datos):
````json
[ 
	{ 
		"id": 1, 
		"nombre": 
		"Carlos Díaz", 
		"edad": 23 
	}, 
	{ 
		"id": 2, 
		"nombre": 
		"María López", 
		"edad": 22 
	}	 
]
````

## NIVEL 1 (Recursos)

En vez de tener servicios con métodos diversos **declaramos Recursos**.

¿Qué es un Recurso?

Se introducen los recursos (como Facturas, Cursos, Compras) y **cada recurso tiene su propia URL**. El cliente puede interactuar con estos recursos a través de métodos HTTP, como **GET** y **POST**, pero no hay una distinción estricta entre qué verbo se usa para qué tipo de operación.

**![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc3SSUGZ2Mzznw-fKAlj5mFSZ0WzhUMxkdYhJykRxrMs9-6jIuAPnHFNRbLSnuOC5EsN3fBlZlHKiSGBtYQgiPsA6hfzATMRMuE81jo03fWcYO0eNmrRkjF5IV9gZZm4azbZiIULA?key=5s4uctNlhIiDpaDERL6yY-Xg)**

**Petición GET** (CON un recurso claro):
````sql
GET /alumno/3
````
**Respuesta** (más estructurada y definida como un recurso específico):
````json
{ 
	"id": 3, 
	"nombre": 
	"Carlos Díaz", 
	"edad": 23 
}
````


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


# EJERCICIO CON REST

Para este ejercicio, he creado una pequeña aplicación con node para poder acceder a los datos a través de **Postman**.

Te dejo el código para que puedas copiar y pegarlo en un archivo .js, dentro de un proyecto Node.
Después de tener todo instalado puedes hacer ‘node nombre.js’ para hacer correr el servidor y probar que funciona todo.

````javascript
const express = require('express');
const app = express();
const port = 3000;

// Datos simulados (en un caso real estarían en una base de datos)
let alumnos = [
  { id: 1, nombre: 'Carlos Díaz', edad: 23 },
  { id: 2, nombre: 'María López', edad: 22 },
  { id: 3, nombre: 'Luis Fernández', edad: 24 }
];

// Middleware para parsear el cuerpo de la solicitud (body parser)
app.use(express.json());

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de alumnos!');
});

// Ruta para obtener todos los alumnos (GET)
app.get('/alumnos', (req, res) => {
  const response = {
    alumnos: alumnos.map(alumno => ({
      id: alumno.id,         // Asegúrate de incluir el id
      nombre: alumno.nombre, // Asegura que se incluya el nombre
      edad: alumno.edad,     // Asegura que se incluya la edad
      _links: {
        self: { href: `http://localhost:${port}/alumno/${alumno.id}` }
      }
    })),
    _links: {
      self: { href: `http://localhost:${port}/alumnos` }
    }
  };

  console.log('Alumnos listados:', response);  // Imprimir para verificar en consola

  res.json(response);
});

// Ruta para obtener un alumno por ID (GET)
app.get('/alumno/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
  if (!alumno) {
    return res.status(404).send('Alumno no encontrado');
  }

  const response = {
    id: alumno.id,
    nombre: alumno.nombre,
    edad: alumno.edad,
    _links: {
      self: { href: `http://localhost:${port}/alumno/${alumno.id}` },
      all_alumnos: { href: `http://localhost:${port}/alumnos` }
    }
  };

  console.log('Alumno encontrado:', response);  // Imprimir para verificar en consola

  res.json(response);
});

// Ruta para agregar un nuevo alumno (POST)
app.post('/alumnos', (req, res) => {
  const { nombre, edad } = req.body;

  // Verificar si los campos nombre y edad están presentes
  if (!nombre || !edad) {
    return res.status(400).send('Faltan los campos nombre o edad');
  }

  // Crear un nuevo alumno con todos los campos
  const nuevoAlumno = {
    id: alumnos.length + 1, // Asignar un ID único
    nombre,
    edad
  };

  // Agregar el nuevo alumno a la lista
  alumnos.push(nuevoAlumno);

  console.log('Nuevo alumno agregado:', nuevoAlumno);  // Verificar en consola

  // Responder con el nuevo alumno
  res.status(201).json(nuevoAlumno);
});

// Ruta para actualizar un alumno por ID (PUT)
app.put('/alumno/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
  if (!alumno) {
    return res.status(404).send('Alumno no encontrado');
  }

  const { nombre, edad } = req.body;

  if (nombre) alumno.nombre = nombre;
  if (edad) alumno.edad = edad;

  res.json(alumno);
});

// Ruta para eliminar un alumno por ID (DELETE)
app.delete('/alumno/:id', (req, res) => {
  const alumnoIndex = alumnos.findIndex(a => a.id === parseInt(req.params.id));
  if (alumnoIndex === -1) {
    return res.status(404).send('Alumno no encontrado');
  }

  // Eliminar el alumno de la lista
  alumnos.splice(alumnoIndex, 1);
  res.status(204).send(); // Responde sin contenido, ya que el recurso fue eliminado
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
````

## Ejercicios Prácticos

1.  **GET**: Obtén la lista de todos los alumnos.
    
2. **GET**: Obtén los datos del alumno con id 2.
    
3.  **GET**: Obtén los datos de un alumno que no existe.
    
4.  **POST**: Crea un nuevo alumno enviando su nombre y edad en formato JSON  (Recuerda que el id se genera solo, así que define solamente nombre y edad).
    
5.  **PUT**: Actualiza el alumno que has creado y súmale 1 año.
    
6.  **DELETE**: Elimina el alumno que has creado.
