
# Node.js + Express

## ¿Qué es Node.js?

Node.js es un entorno de ejecución _**JavaScript**_ de código abierto, utilizado para desarrollar aplicaciones escalables del lado del servidor y de red. Basado en el motor de ejecución **V8 de Google Chrome**, permite ejecutar código JavaScript fuera del navegador y se caracteriza por su modelo de programación **asincrónico** y **basado en eventos**, lo que lo hace perfecto para aplicaciones que manejan muchas operaciones al mismo tiempo.


## 2. ¿Qué es Express?

Express es un _**framework**_ para **Node.js** que facilita la creación de **aplicaciones web** y **APIs**. Te ayuda a organizar las rutas (por ejemplo, cuando un usuario entra a una página), manejar las solicitudes de los usuarios de manera sencilla y conectar con bases de datos para guardar y recuperar datos.

## 3. Instalación de Node.js y Express

### Instalación de Node.js

Para instal·lar Node.js tenemos que seguir los siguientes pasos:

1. **Descargar Node.js**: Ve a la página oficial de [Node.js](https://nodejs.org/) y descarga la versión recomendada (LTS).
   
2. **Instalar Node.js**: Una vez descargado el instalador, ejecútalo y sigue las instrucciones para completar la instalación.

3. **Verificar la instalación**: Abre la terminal o línea de comandos y escribe el siguiente comando para comprobar que Node.js se instaló correctamente:
`node -v`

### Instalación de Express

Para instalar **Express** en tu proyecto de Node.js, sigue estos pasos:

1. **Inicializar un proyecto de Node.js**: 
Primero, debes tener un proyecto de Node.js. Si aún no lo tienes, crea una carpeta para tu proyecto y abre la terminal dentro de esa carpeta. Luego, ejecuta el siguiente comando para inicializar un archivo `package.json`, el cual contendrá las dependencias y configuración del proyecto:`npm init -y`

2. **Instal·Lar Express**: 
Una vez tengamos inicializado el proyecto, instalamos _**Express**_ con el siguiente comando:`npm install express`
Este comando actualizara y generara tres elementos importantes:

3. **Configurar el servidor**: 
Uan vez instalado _**Express**_ creamos un archivo que sera el indice principal: **index.js** agrega el siguiente código dentro para crear un servidor básico con Express:

```javascript
const express = require('express');
const app = express();

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Configurar el puerto
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
```

4. **Ejecutar el servidor**: Para iniciar el servidor, ejecuta el siguiente comando en la terminal: `node index.js`
Si todo esta correcto nos saldra _**Servidor corriendo en puerto 3000**_

5. **Verificar en el navegador**: Abre tu navegador y ve a http://localhost:3000. Si todo está configurado correctamente, verás el mensaje _**¡Hola, mundo!**_.
6. **Actualización automática con Nodemon**: Para evitar tener que reiniciar manualmente el servidor cada vez que hagas un cambio en tu código, puedes usar una herramienta llamada **Nodemon**. Nodemon monitorea los cambios en tu aplicación y reinicia automáticamente el servidor cuando detecta modificaciones.

###### 1. Instalación de Nodemon

Para instalar Nodemon en tu sistema, ejecuta el siguiente comando en la terminal:
```bash
npm install nodemon -g
```
###### 1. Uso de Nodemon: 
Una vez instalado Nodemon, puedes iniciar tu servidor con el siguiente comando:
```bash
nodemon ./index.js
```

Con esto, Nodemon ejecutará tu servidor y lo reiniciará automáticamente cada vez que hagas un cambio en tu código. 
Esto facilita el desarrollo y te ahorra tiempo al no tener que reiniciar manualmente el servidor después de cada modificación.

## ¿Qué es CRUD?

CRUD representa las cuatro operaciones básicas que se pueden realizar en una base de datos:

- **Create**: Insertar nuevos registros en la base de datos.
- **Read**: Obtener datos almacenados.
- **Update**: Modificar datos existentes.
- **Delete**: Eliminar registros de la base de datos.

#### Implementación de CRUD con Express y PostgreSQL

Para manejar una base de datos **PostgreSQL** en un servidor **Node.js con Express**, utilizaremos el paquete `pg` para conectarnos a la base de datos.

#### Instalación de `pg`  

Antes de comenzar, necesitamos instalar el paquete que nos permitirá conectarnos a PostgreSQL:  

```sh
npm install pg
```
#### Configuración de la conexión a PostgreSQL

Creamos un archivo `db.js` donde configuramos la conexión a la base de datos:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'northwind',
  password: 'tu_contraseña',
  port: 5432,
});

module.exports = pool;
```

#### Creación de las rutas CRUD en Express

En nuestro archivo principal (**index.js** o **app.js**), importamos Express y configuramos las rutas para manejar los datos de la base de datos.

```javascript
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); // Permite recibir JSON en las peticiones

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
```
```javascript
// Agregar un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const { product_name, price } = req.body;
    await pool.query('INSERT INTO products (product_name, price) VALUES ($1, $2)', [product_name, price]);
    res.status(201).send('Producto agregado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
```
```javascript
// Actualizar un producto
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, price } = req.body;
    await pool.query('UPDATE products SET product_name = $1, price = $2 WHERE product_id = $3', [product_name, price, id]);
    res.send('Producto actualizado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
```
```javascript
// Eliminar un producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
    res.send('Producto eliminado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
```

## 📝 Ejercicio Práctico  

Crea una API con **Express** que implemente un CRUD para la tabla `products` de la base de datos **Northwind** en **PostgreSQL**.  

#### Requisitos:  
- Configurar un servidor con **Express**.  
- Conectar con la base de datos usando el paquete `pg`.  
- Implementar las rutas:  
  - `GET /productos` → Obtener todos los productos.  
  - `POST /productos` → Agregar un nuevo producto.  
  - `PUT /productos/:id` → Actualizar un producto por su ID.  
  - `DELETE /productos/:id` → Eliminar un producto por su ID.
