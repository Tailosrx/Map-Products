
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

1. **Inicializar un proyecto de Node.js**: Primero, debes tener un proyecto de Node.js. Si aún no lo tienes, crea una carpeta para tu proyecto y abre la terminal dentro de esa carpeta. Luego, ejecuta el siguiente comando para inicializar un archivo `package.json`, el cual contendrá las dependencias y configuración del proyecto:`npm init -y`

2. **Configurar tu servidor con Express**: Una vez tengamos inicializado el proyecto, instalamos _**Express**_ con el siguiente comando:`npm install express`
Este comando actualizara y generara tres elementos importantes:

<!-- - **package.json**: Contiene las dependencias y configuración de tu proyecto. Se actualiza con Express en la sección de "dependencies".

- **package-lock.json**: Asegura que las dependencias se instalen de forma consistente, guardando versiones exactas de las librerías.

- **node_modules/**: Carpeta que contiene las dependencias instaladas. No debes compartirla ni subirla a un repositorio, ya que se genera automáticamente. -->



