# Football Competitions - ASV

Esto es una aplicación como prueba técnica en el proceso de selección. 
La aplicación consiste en la gestión de una serie de competiciones deportivas, en este caso de fútbol, en la cual se pueden visualizar todos los equipos que se han dado de alta en una competición. Se pueden quedar varios tipos de competiciones, como por ejemplo, competición de jornada, competición de eliminatoria o una competición mixta (jornada+eliminatoria). Asimismo, el usuario puede ver el histórico de competiciones que ha logrado cada equipo, como el número de Champions League que ha ganado a lo largo de su trayectoria. Además, un equipo puede indicar su equipo rival histórico.
Un usario para poder acceder a la aplicación ha tenido que darse de alta en ella mediante un formulario de registro.

## Get started

### Clonar el repositorio

```shell
git clone https://github.com/proyectoMetaenlace/asv.git
cd workspace-asv
```

**Nota:** En el repositorio se han subido distintos tipos de ficheros que no deben de subirse, pero para un despliegue automatizado era necesario (.jar, /dist, etc.)

### Instalar los paquetes npm

En primer lugar vamos a construir la librería del api-client. Para ello ejecutamos los siguientes comandos:
```shell
cd asv-api-client
npm install
npm run build
```

En segundo lugar vamos a generar la paquetería de asvAngular. Para ello ejecutamos los siguientes comandos:
```shell
cd asvAngular
npm install
ng build --prod
```

#### Ejecutar los siguientes pasos si se quiere desplegar en desarrollo:

Una vez hecho el `npm install`, ejecutamos el siguiente comando:
```shell
npm start
```
Nota: El npm start levanta la aplicación utilizando el proxy-conf para evitar el problema del CORS.

Para levantar la base de datos, ejecutamos el siguiente comando para crear una BBDD postgres:
```shell
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
Mediante un IDE hemos arrancado la aplicación asvBackend.

### Ejecutar el siguiente comando para un despliegue automatizado con docker:

Para generar el .jar hemos ejecutado el comando de Maven build, ya sea utilizando un IDE o desde una terminal.
Una vez generado el compilado de angular (directorio /dist) y el .jar del backend, tenemos que situarnos en la carpeta raíz del proyecto y ejecutar el siguiente comando:

```shell
docker-compose -f docker-compose.yml -p asv up -d --build
```

Para parar la aplicación podemos ejecutar el siguiente comando:

```shell
docker-compose -p asv down
```

#### Los servicios se levantan en los siguientes puertos:

FrontEnd Port: 4200
Backend Port: 8080
Database: 5432
FRONTEND_NAME: asv-frontend
BACKEND_NAME: asv-backend
DATABASE: postgresql

### Para probar la aplicación, debemos utilizar un navegador y acceder a la siguiente URL:

[http://localhost:4200/login](http://localhost:4200/login)

El usuario por defecto es:
username: admin
password: Entrar.01

### Vías futuras:

A continuación, se listaran una serie de funcionalidad que no ha podido ser desarrollada por falta de tiempo:

* Formulario registrar: Incluir los campos que faltan para completar los del usuario (nombre, apellido, teléfono, etc.)
* Formulario listado de equipos: Falta por implementar la eliminación de equipos. Esta funcionalidad se ha desarrollado en el formulario de competiciones, es decir, una competición se puede borrar desde la aplicación. Habría que replicar esa funcionalidad en esta entidad. También se podrían ampliar los campos a filtrar.
* Formulario detalle de equipo: Añadir la paginación cuando se edita un equipo en la tabla que muestra las competiciones ganadas por ese equipo. Esta funcionalidad está desarrollada tanto en listado de equipos como en listado de competiciones.
* Formulario listado de competiciones: Ampliar el número de campos por los que se puede filtrar.
* Formulario listado de usuarios: Mostrar más información de los usuarios. Esta funcionalidad va ligada al formulario de registro. Añadir filtrado como en las pantallas anteriores
* Refresh token: Cuando el usuario se autentica, se le asocia un token para poder acceder a los datos. Este token tiene una fecha de caducidad. Cuando caduca, sería necesario hacer un proceso de refresco de token mediante el refreshToken almacenado en el sessionStorage del navegador.
* canActivate (frontend): Falta por securizar el routing de angular.
* Añadir profiles tanto para maven, spring y angular, para los diferentes entornos y de testing.
* Tests karma: Cuando se crea un component, se genera un fichero .spect.ts en el que se pueden hacer los tests.
