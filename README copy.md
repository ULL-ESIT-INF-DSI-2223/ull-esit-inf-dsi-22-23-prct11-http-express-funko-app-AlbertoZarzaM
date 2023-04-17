# Informe práctica 10

***Por: Alberto Zarza Martín (alu0101412993@ull.edu.es)***

## Introducción

  En esta práctica vamos a realizar 3 ejercicios que nos ayudará a profundizar en el uso de las clases y las interfaces en TypeScript, por otra parte también mencionar el uso de Modulos ESM como yargs o chalk. Además, vamos a desarrollar 1 ejercicio que se ha propuesto en la sesion de practicas para practicar y verficicar los conocimientos adquiridos en las clases anteriores.

## Dispositivo de trabajo

  Para el desarrollo de esta práctica he utilizado un sistema operativo Ubuntu por lo cual algunos de los pasos realizados solo estarán disponibles para los usuarios que utilicen este sistema operativo.

## Coveralls

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM?branch=main)

## Ejercicio 1 

En este primer ejercicio se nos pide comentar cómo sería la traza del siguiente código:

``` typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
  En primer lugar, se importan los módulos necesarios para el desarrollo del ejercicio. En este caso se importan los módulos access, constants y watch del módulo fs.

  A continuación, se comprueba que el número de argumentos introducidos por el usuario es correcto, en caso de que no sea correcto se muestra un mensaje de error por pantalla.

  En caso de que el número de argumentos sea correcto, se crea una variable llamada filename que almacena el nombre del archivo que se va a comprobar.

  A continuación, se llama al método access del módulo fs, el cual recibe como parámetros el nombre del archivo, las constantes de acceso y una función de callback. En este caso, la función de callback recibe como parámetro un error, en caso de que el error sea null, significa que el archivo existe y se muestra un mensaje por pantalla indicando que se va a empezar a observar el archivo. En caso de que el error no sea null, significa que el archivo no existe y se muestra un mensaje por pantalla indicando que el archivo no existe.

  En caso de que el archivo exista, se llama al método watch del módulo fs, el cual recibe como parámetro el nombre del archivo. Este método devuelve un objeto de tipo watcher, el cual tiene un método on que recibe como parámetro el nombre del evento y una función de callback. En este caso, el evento que se está observando es el evento change, el cual se ejecuta cuando el archivo es modificado de alguna manera. En este caso, la función de callback recibe como parámetro el nombre del archivo y muestra un mensaje por pantalla indicando que el archivo ha sido modificado de alguna manera.

  Por último, se muestra un mensaje por pantalla indicando que el archivo ya no se está observando.

  A continuación, se muestra la traza de ejecución del código anterior:

``` typescript
Starting to watch file ./dist/Ejercicio_P10/hola.txt
File ./dist/Ejercicio_P10/hola.txt is no longer watched
File ./dist/Ejercicio_P10/hola.txt has been modified somehow
File ./dist/Ejercicio_P10/hola.txt has been modified somehow

```
En cuanto a la pila de llamadas, se muestra a continuación:

console.log('Please, specify a file');
console.log(`Starting to watch file ${filename}`);
console.log(`File ${filename} is no longer watched`);
watcher.on('change', () => {
  console.log(`File ${filename} has been modified somehow`);
});

El watcher.on pasa al registro de eventos, y cuando se produce el evento change, se ejecuta la función de callback, que es la que muestra el mensaje por pantalla.

Una vez se detecta el evento change, en el registro de eventos se pasa a la cola de manejo de eventos hasta esperar a que se vacíe la pila de llamadas. Una vez se vacía la pila de llamadas, se ejecuta la función de callback del watcher.on, que es la que muestra el mensaje por pantalla.


## Ejercicio 2 - Child Processes

En este ejercicio se nos pide desarrollar un programa que reciba como parámetro el nombre de un fichero y muestre por pantalla el número de líneas, palabras y caracteres que contiene el fichero. Para ello, se ha utilizado el módulo child_process. Para el ejercicio se nos pide dos maneras de realizarlo, una de ellas es utilizando el metodo pipe y la otra es sin utilizar el metodo pipe.

  A continuación, se muestra el código desarrollado:

``` typescript

yargs(hideBin(process.argv))
.command('read', 'Reads a file', {
  file: {
    description: 'File path',
    type: 'string',
    demandOption: true,
  },
  lines: {
    description: 'File lines',
    type: 'boolean',
    demandOption: true,
  },
  words: {
    description: 'File words',
    type: 'boolean',
    demandOption: true,
  },
  chars: {
    description: 'File chars',
    type: 'boolean',
    demandOption: true,
  }
} ,(argv) => {

  //si el ficher existe
  if (fs.existsSync(argv.file)) {
    //si el ficher es un archivo
    if (fs.lstatSync(argv.file).isFile()) {

      if (argv.lines) {
        const wc = spawn('wc', ['-l', argv.file]);
        let wcOutput = '';
        wc.stdout.on('data', (piece) => {
          wcOutput += piece;
        } );
        
        wc.on('close', () => {
          process.stdout.write(wcOutput[0] + '\n' );
        }
        );

      }

      if (argv.words) {
        const wc = spawn('wc', ['-w', argv.file]);
        let wcOutput = '';
        wc.stdout.on('data', (piece) => {
          wcOutput += piece;
        }
        );
        wc.on('close', () => {
          process.stdout.write(wcOutput[0] + '\n');
        }
        );
      }

      if (argv.chars) {
        const wc = spawn('wc', ['-c', argv.file]);
        let wcOutput = '';
        wc.stdout.on('data', (piece) => {
          wcOutput += piece;
        }
        );
        wc.on('close', () => {
          process.stdout.write(wcOutput[0] + '\n');
        }
        );
      }

    } else {
      console.log('El fichero no es un archivo');
    }
  } else {
    console.log('El fichero no existe');
  } 
})
.help()
.argv;
```
En este primer codigo podemos ver como se ha desarrollado el codigo integramente sin el uso de metodo pipe. La manera de proceder ha sido la siguiente: 

  Se ha creado un objeto de tipo spawn, el cual recibe como parámetros el comando a ejecutar y los argumentos que recibe dicho comando. En este caso, el comando es wc y los argumentos son -l, -w y -c, que son los argumentos que se utilizan para contar las lineas, palabras y caracteres respectivamente. Una vez se ha creado el objeto de tipo spawn, se ha creado un evento de tipo data, el cual recibe como parámetro una pieza de datos. En este caso, la pieza de datos es la salida del comando wc. Una vez se ha recibido la pieza de datos, se ha concatenado a la variable wcOutput. Una vez se ha recibido toda la salida del comando wc, se ha creado un evento de tipo close, el cual recibe como parámetro una función de callback. En este caso, la función de callback muestra por pantalla la salida del comando wc.

  A continuación, se muestra el código desarrollado utilizando el metodo pipe:

``` typescript
yargs(hideBin(process.argv))
    .command('read', 'Reads a file', {
      file: {
        description: 'File path',
        type: 'string',
        demandOption: true,
      },
      lines: {
        description: 'File lines',
        type: 'boolean',
        demandOption: true,
      },
      words: {
        description: 'File words',
        type: 'boolean',
        demandOption: true,
      },
      chars: {
        
        description: 'File chars',
        type: 'boolean',
        demandOption: true,
      }
    } , (argv) => {
      //si el ficher existe
      if (fs.existsSync(argv.file)) {
        //si el ficher es un archivo
        if (fs.lstatSync(argv.file).isFile()) {
    
          const cat = spawn('cat', [argv.file]);
          if (argv.lines) {
            const wc = spawn('wc', ['-l']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              
              process.stdout.write(wcOutput);
            });
          }

          if (argv.words) {
            const wc = spawn('wc', ['-w']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              process.stdout.write(wcOutput);
            });
          }

          if (argv.chars) {
            const wc = spawn('wc', ['-c']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              process.stdout.write(wcOutput);
            });
          }
    
        }
      } else {
        console.log("El fichero no existe");
      }
    })
  .help()
  .argv;

```

En este caso, se ha creado un objeto de tipo spawn, el cual recibe como parámetros el comando a ejecutar y los argumentos que recibe dicho comando. Una vez hemos realizado este paso se ha creado un objeto de tipo wc el cual recibe los parametros a ejecutar con el comando. Una vez hecho esto utilizamos el metodo pipe para conectar la salida del comando cat con la entrada del comando wc. Una vez hemos realizado este paso, se ha creado un evento de tipo data, el cual recibe como parámetro una pieza de datos. En este caso, la pieza de datos es la salida del comando wc. Una vez se ha recibido la pieza de datos, se ha concatenado a la variable wcOutput. Una vez se ha recibido toda la salida del comando wc, se ha creado un evento de tipo close, el cual recibe como parámetro una función de callback. En este caso, la función de callback muestra por pantalla la salida del comando wc.






## Ejercicio 3 - FunkoPops

En este he desarrollado una aplicación para gestionar los Funkos de los diferentes usuarios de nuestra aplicación. Para gerstionar los funkos y los usuarios que los tienen he creado 4 clases que iré explicando a continuación.


### Clase Funko

  Esta clase es la que se encarga de crear los objetos de tipo Funko, para ello he creado una clase que tiene como atributos el id, nombre, descripción, tipo, genero, franquicia, numero, exclusivo, caracteristicas especiales y valor de mercado. Además, he creado un constructor que recibe todos los atributos de la clase y los asigna a los atributos de la clase. Por último, he creado los métodos get y set para cada uno de los atributos de la clase.

  A continuación se muestra el código de la clase Funko:

``` typescript

export class Funko {
  private _id: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: Tipo;
  private _genero: Genero;
  private _franquicia: string;
  private _numero: number;
  private _exclusivo: boolean;
  private _caracteristicasEspeciales: string;
  private _valorDeMercado: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: Tipo,
    genero: Genero,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    caracteristicasEspeciales: string,
    valorDeMercado: number
  ) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._tipo = tipo;
    this._genero = genero;
    this._franquicia = franquicia;
    this._numero = numero;
    this._exclusivo = exclusivo;
    this._caracteristicasEspeciales = caracteristicasEspeciales;
    this._valorDeMercado = valorDeMercado;
  }
```
 Ademas, he creado los métodos get y set para cada uno de los atributos de la clase.

 También he creado un enum para los tipos de Funko que hay en el mercado.

``` typescript
export enum Tipo {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold",
}
```
 Además, he creado un enum para los géneros de Funko que hay en el mercado.

``` typescript
export enum Genero {
  Animacion = "Animación",
  PeliculasYTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Ánime",
}

```

Por otra parte he desarrollado también un metodo MostarFunko que nos muestra por pantalla los datos del Funko.

``` typescript

  mostrarFunko(): void {
    console.log(chalk.green(`ID: ${this._id}`));
    console.log(chalk.green(`Nombre: ${this._nombre}`));
    console.log(chalk.green(`Descripción: ${this._descripcion}`));
    console.log(chalk.green(`Tipo: ${this._tipo}`));
    console.log(chalk.green(`Género: ${this._genero}`));
    console.log(chalk.green(`Franquicia: ${this._franquicia}`));
    console.log(chalk.green(`Número: ${this._numero}`));
    console.log(chalk.green(`Exclusivo: ${this._exclusivo}`));
    console.log(
      chalk.green(
        `Características especiales: ${this._caracteristicasEspeciales}`
      )
    );
    if (this._valorDeMercado < 10) {
      console.log(chalk.green(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 10 && this._valorDeMercado < 30) {
      console.log(chalk.blue(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 30 && this._valorDeMercado < 50) {
      console.log(chalk.bgYellow(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 50 && this._valorDeMercado < 80) {
      console.log(chalk.red(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 80 && this._valorDeMercado < 100) {
      console.log(chalk.cyan(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else {
      console.log(chalk.magenta(`Valor de mercado: ${this._valorDeMercado}`));
    }

  }

```

Como se puede observar en el código anterior, si el valor de mercado del Funko es menor que 10, el valor de mercado se mostrará en verde, si es mayor o igual que 10 y menor que 30, el valor de mercado se mostrará en azul, si es mayor o igual que 30 y menor que 50, el valor de mercado se mostrará en amarillo, si es mayor o igual que 50 y menor que 80, el valor de mercado se mostrará en rojo, si es mayor o igual que 80 y menor que 100, el valor de mercado se mostrará en cyan y si es mayor o igual que 100, el valor de mercado se mostrará en magenta. Esto lo he hecho para cumplir con los requisitos de la práctica.

### Clase FunkoCollection

  Esta clase es la que se encarga de crear los objetos de tipo FunkoCollection, que son los que contienen los objetos de tipo Funko. Esta clase tiene un atributo privado de tipo Funko[] que es donde se almacenan los objetos de tipo Funko. Además, tiene un atributo privado de tipo string que es el nombre del propietario de la colección de Funkos.

  A continuación se muestra el código de la clase FunkoCollection:

``` typescript

export class FunkoCollection {
  private _funkos: Funko[];
  private owner: string;

  constructor(owner: string) {
    this._funkos = [];
    this.owner = owner;
      // Crea el directorio si no existe
      let archivos = [] as string[];
      try {
        // Lee el directorio
        archivos = fs
          .readdirSync("./data/" + this.owner + "/", { withFileTypes: true })
          .filter((dirent) => dirent.isFile())
          .map((dirent) => dirent.name);
      } catch (err) {
        if (err.code === "ENOENT") {
          // Si el error es porque el directorio no existe
          console.log(`El directorio  no existe. Creando directorio...`);
          fs.mkdirSync("./data/" + this.owner);
          console.log(`Directorio  creado exitosamente.`);
        } else {
          // Si el error no es porque el directorio no existe, lanza una excepción
          throw err;
        }
      }

      /**
       * Lee los archivos JSON y los convierte en objetos de tipo Funko
       * y los agrega al arreglo de Funkos
       *
       */
      for (let i = 0; i < archivos.length; i++) {
        const funko = new Funko(
          0,
          "",
          "",
          Tipo.Pop,
          Genero.Animacion,
          "",
          0,
          false,
          "",
          0
        );
        const funkoJSON = fs.readFileSync(
          "./data/" + this.owner + "/" + archivos[i],
          "utf-8"
        );
        const funkoLeido = JSON.parse(funkoJSON);
        Object.assign(funko, funkoLeido);
        this._funkos.push(funko);
      }
    
  }
 
  get Owner(): string {
    return this.owner;
  }

  get funkos(): Funko[] {
    return this._funkos;
  }

  setfunkos(funkos: Funko[]) {
    this._funkos = funkos;
  }

  addFunko(funko: Funko): void {

    const funkoJSON = JSON.stringify(funko);
    fs.writeFileSync(
      "./data/" + this.owner + "/funko" + funko.id + ".json",
      funkoJSON
    );
    this._funkos.push(funko);
  }

  removeFunko(id: number): void {

    const funko = this.getFunko(id);
    fs.unlinkSync("./data/" + this.owner + "/funko" + funko.id + ".json");
    this._funkos = this._funkos.filter((funko) => funko.id !== id);
  }

  getFunko(id: number): Funko {
    return this._funkos.find((funko) => funko.id === id) as Funko;
  }
}

```

Como podemos observar en el código anterior, el constructor de la clase FunkoCollection recibe como parámetro el nombre del propietario de la colección de Funkos. En el constructor se crea un arreglo de tipo Funko[] que es donde se almacenan los objetos de tipo Funko. Además, se crea un atributo privado de tipo string que es el nombre del propietario de la colección de Funkos.

  En el constructor se crea un directorio llamado data, que es donde se almacenan los archivos JSON de los objetos de tipo Funko. Además, se crea un directorio con el nombre del propietario de la colección de Funkos, que es donde se almacenan los archivos JSON de los objetos de tipo Funko. Si el directorio ya existe, no se crea.

  En el constructor se lee el directorio del propietario de la colección de Funkos y se almacenan los nombres de los archivos JSON en un arreglo de tipo string. Luego, se lee cada archivo JSON y se convierte en un objeto de tipo Funko, que se agrega al arreglo de tipo Funko[].

  Estas acciones se realizan en el constructor para que al crear un objeto de tipo FunkoCollection, se carguen los objetos de tipo Funko que se encuentran en el directorio del propietario de la colección de Funkos. De esta forma, al crear un objeto de tipo FunkoCollection, se cargan los objetos de tipo Funko que se encuentran en el directorio del propietario de la colección de Funkos. Utilizando para ello el modulo fs, de manera que se pueda leer y escribir archivos JSON de forma sincrónica.

  El método get Owner() retorna el nombre del propietario de la colección de Funkos.

  El método get funkos() retorna el arreglo de tipo Funko[].

  El método setfunkos recibe como parámetro un arreglo de tipo Funko[] y lo asigna al atributo privado de tipo Funko[].

  El método addFunko recibe como parámetro un objeto de tipo Funko y lo agrega al arreglo de tipo Funko[] y al directorio del propietario de la colección de Funkos.

  El método removeFunko recibe como parámetro el id de un objeto de tipo Funko y lo elimina del arreglo de tipo Funko[] y del directorio del propietario de la colección de Funkos.

  El método getFunko recibe como parámetro el id de un objeto de tipo Funko y lo retorna.

### Clase User 

La clase User representa a un usuario de la aplicación. Cada usuario tiene un nombre y una colección de Funkos. La clase User tiene los siguientes atributos:

  * nombre: string
  * ownerOf: FunkoCollection

  A continuación se muestra el código de la clase User:


``` typescript	

export class User {
  private _nombre: string;
  private _ownerOf: FunkoCollection;

  constructor(nombre: string) {
    this._nombre = nombre;
    if (nombre !== "prueba") {
      this._ownerOf = new FunkoCollection(this.nombre);
    }
    else {
      this._ownerOf = new FunkoCollection("prueba");
    }
  }
  get nombre(): string {
    return this._nombre;
  }
  setnombre(nombre: string) {
    this._nombre = nombre;
  }
  get ownerOf(): FunkoCollection {
    return this._ownerOf;
  }
  setownerOf(ownerOf: FunkoCollection) {
    this._ownerOf = ownerOf;
  }
}

```

Como se puede ver es una clase sencilla, que tiene un atributo privado de tipo string que es el nombre del usuario y un atributo privado de tipo FunkoCollection que es la colección de Funkos del usuario.

  El constructor recibe como parámetro el nombre del usuario y crea un objeto de tipo FunkoCollection, que es la colección de Funkos del usuario. Si el nombre del usuario es prueba, se crea un objeto de tipo FunkoCollection con el nombre prueba, de lo contrario se crea un objeto de tipo FunkoCollection con el nombre del usuario.

  El método get nombre() retorna el nombre del usuario.

  El método setnombre recibe como parámetro el nombre del usuario y lo asigna al atributo privado de tipo string.

  El método get ownerOf() retorna la colección de Funkos del usuario.

  El método setownerOf recibe como parámetro la colección de Funkos del usuario y lo asigna al atributo privado de tipo FunkoCollection.

### Clase UserCollection

La clase UserCollection representa a la colección de usuarios de la aplicación. La clase UserCollection tiene los siguientes atributos:

  * _users: User[]

  A continuación se muestra el código de la clase UserCollection:

``` typescript	

export class UserCollection {
  private _users: User[];

  constructor() {
    this._users = [];

    const directorios = fs
      .readdirSync("./data", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (let i = 0; i < directorios.length; i++) {
      const user = new User(directorios[i]);
      this._users.push(user);
    }
  }
  getUserByName(name: string): User {
    return this._users.find((user) => user.nombre === name) as User;
  }
  addUser(user: User): void {
    this._users.push(user);
  }
  removeUserbyName(name: string): void {
    //borro el directorio
    fs.rmdirSync(`./data/${name}`, { recursive: true });
    this._users = this._users.filter((user) => user.nombre !== name);
  }
  get users(): User[] {
    return this._users;
  }
  setusers(users: User[]) {
    this._users = users;
  }
}

```

Como podemos observar en el código anterior, el constructor de la clase UserCollection no recibe ningún parámetro. En el constructor se crea un arreglo de tipo User[] que es donde se almacenan los objetos de tipo User.

  En el constructor se lee el directorio data y se almacenan los nombres de los directorios en un arreglo de tipo string. Luego, se crea un objeto de tipo User por cada directorio y se agrega al arreglo de tipo User[].

  Estas acciones se realizan en el constructor para que al crear un objeto de tipo UserCollection, se carguen los objetos de tipo User que se encuentran en el directorio data. De esta forma, al crear un objeto de tipo UserCollection, se cargan los objetos de tipo User que se encuentran en el directorio data. Utilizando para ello el modulo fs, de manera que se pueda leer y escribir archivos JSON de forma sincrónica.

  El método getUserByName recibe como parámetro el nombre de un usuario y retorna el objeto de tipo User que tiene ese nombre.

  El método addUser recibe como parámetro un objeto de tipo User y lo agrega al arreglo de tipo User[].

  El método removeUserByName recibe como parámetro el nombre de un usuario y lo elimina del arreglo de tipo User[] y del directorio data.

  El método get users() retorna el arreglo de tipo User[].

  El método setusers recibe como parámetro un arreglo de tipo User[] y lo asigna al atributo privado de tipo User[].

### FunkoPopAPP 

En el archivo FunkoPopAPP.ts se encuentra el uso de todo el sistema completo mediante el modulo Yargs. Dentro de el vamos a encontrar los siguientes comandos:

  * add
  * remove
  * update
  * list
  * read

Cada uno de ellos realiza operaciones con los objetos de tipo Funko y los objetos de tipo User.

  * add: Agrega un Funko a la colección de un usuario. Si no existe el usuario, lo crea.

  * remove: Elimina un Funko de la colección de un usuario.  

  * update: Actualiza un Funko de la colección de un usuario. Si no existe el usuario, no hace nada.

  * list: Lista los Funkos de la colección de un usuario.

  * read: Muestra la información de un Funko de la colección de un usuario.

### Ampliación correspondiente a la práctica 10

Como ampliación a lo desarrollado hasta el momento, se ha creado un modelo cliente servidor mediante el modulo net. Además adicionalmente se ha creado las clases Sercidor y Cliente, y también se ha creado dos tipos para las peticiones y las respuestas.

``` typescript

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  nameuser?: string;
  namefunko?: number;
  funkoPop?: Funko;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkopops?: Funko[];
}

```
Como podemos observar en el código anterior, se ha creado dos tipos, RequestType y ResponseType. El tipo RequestType representa la petición que se envía al servidor, y el tipo ResponseType representa la respuesta que se envía al cliente.

  El tipo RequestType tiene los siguientes atributos:

  * type: 'add' | 'update' | 'remove' | 'read' | 'list'

  * nameuser?: string

  * namefunko?: number

  * funkoPop?: Funko

  El tipo ResponseType tiene los siguientes atributos:

  * type: 'add' | 'update' | 'remove' | 'read' | 'list'

  * success: boolean

  * funkopops?: Funko[]

  A continuación se muestra el código de la clase Servidor:

``` typescript

export class Server {

  private server: net.Server;
  private port: number;
  private response_ = '';

  constructor(port: number) {
    this.port = port;
    this.server = net.createServer();
  }

  public start() {

    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });


    this.server.on('connection', (socket: net.Socket) => {
      let requestData = Buffer.from('');

      socket.on('data', (data: Buffer) => {
        
        // Acumula los datos recibidos en el búfer
        requestData = Buffer.concat([requestData, data]);
       
        // Busca el delimitador al final de la petición
        const delimiter = Buffer.from('\n');
        const delimiterIndex = requestData.indexOf(delimiter);
        
        // Se encontró el delimitador, procesa la petición
        if (delimiterIndex !== -1) {
          // Emitir evento 'request' para indicar que se ha recibido una petición completa
          const request = requestData.slice(0, delimiterIndex).toString();
          //La petición es un objeto JSON, por lo que se convierte a objeto
          const requestObj = JSON.parse(request);
          // Se procesa la petición en este caso el primer parámetro es el comando y el segundo es el array de parámetros
          console.log(`Petición recibida: ${requestObj.type}`);
          // Se procesa la petición y se obtiene la respuesta
          let response: ResponseType;
          if (requestObj.type == "read") {
            if (users.getUserByName(requestObj.nameuser) !== undefined) {
              if ( users.getUserByName(requestObj.nameuser).ownerOf.getFunko(requestObj.namefunko) === undefined) {
                console.log(chalk.red("Funko not found"));
                response = {
                  type: 'read',
                  success: false,
                };
                

              } else {
                response = {
                  type: 'read',
                  success: true,
                  funkopops: [users.getUserByName(requestObj.nameuser).ownerOf.getFunko(requestObj.namefunko)]
                };
              }
            } else {
              console.log(chalk.red("User not found"));
              response = {
                type: 'read',
                success: false,
              };
            }
          } 
          else if (requestObj.type == "list") {
            if (users.getUserByName(requestObj.nameuser) !== undefined) {
              response = {
                type: 'list',
                success: true,
                funkopops: users.getUserByName(requestObj.nameuser).ownerOf.funkos
              };
            } else {
              console.log(chalk.red("User not found"));
              response = {
                type: 'list',
                success: false
              };
            }
          }
          else if (requestObj.type == "add") {

            if (users.getUserByName(requestObj.nameuser)?.ownerOf.getFunko(requestObj.namefunko) === undefined) {
              const FunkoToAdd = new Funko(
                0,
                "",
                "",
                Tipo.Pop,
                Genero.Animacion,
                "",
                0,
                false,
                "",
                0
              );
              Object.assign(FunkoToAdd, requestObj.funkoPop);
              const tipo = FunkoToAdd.tipo;
              const gender = FunkoToAdd.genero;
  
              if (estaEnEnum(tipo, Tipo)) {
                console.log(chalk.green("Tipo correcto"));
              } else {
                console.error(chalk.red("Tipo incorrecto"));
                response = {
                  type: 'add',
                  success: false
                };
              }
  
              if (estaEnEnum(gender, Genero)) {
                console.log(chalk.green("Género correcto"));
              } else {
                console.error(chalk.red("Género incorrecto"));
                response = {
                  type: 'add',
                  success: false
                };
              }

              if (users.getUserByName(requestObj.nameuser) === undefined) {
                console.log(chalk.red("User not found"));
                console.log(chalk.yellow("Creating user..."));
                users.addUser(new User(requestObj.nameuser, FunkoToAdd));
              } else {
                users.getUserByName(requestObj.nameuser).ownerOf.addFunko(FunkoToAdd);
              }
              response = {
                type: 'add',
                success: true
              };
            } else {
              console.log(chalk.red("Funko already exists on user " + requestObj.nameuser));
              response = {
                type: 'add',
                success: false
              };
            }
          }
          else if (requestObj.type == "update") {
    
            const FunkoToAdd = new Funko(
              0,
              "",
              "",
              Tipo.Pop,
              Genero.Animacion,
              "",
              0,
              false,
              "",
              0
            );
            Object.assign(FunkoToAdd, requestObj.funkoPop);
            const tipo = FunkoToAdd.tipo;
            const gender = FunkoToAdd.genero;

            if (estaEnEnum(tipo, Tipo)) {
              console.log(chalk.green("Tipo correcto"));
            } else {
              console.error(chalk.red("Tipo incorrecto"));
              response = {
                type: 'update',
                success: false
              };
            }

            if (estaEnEnum(gender, Genero)) {
              console.log(chalk.green("Género correcto"));
            } else {
              console.error(chalk.red("Género incorrecto"));
              response = {
                type: 'update',
                success: false
              };
            }
            if (users.getUserByName(requestObj.nameuser) === undefined) {
              console.log(chalk.red("User not found"));
              console.log(chalk.yellow("Creating user..."));
              users.addUser(new User(requestObj.nameuser , FunkoToAdd));
              
            } else {
              users.getUserByName(requestObj.nameuser).ownerOf.addFunko(FunkoToAdd);
            }
            console.log(
              chalk.green(
                "Funko " +
                  requestObj.nameuser +
                  " añadido al usuario " +
                  requestObj.namefunko +
                  " correctamente"
              )
            );
            response = {
              type: 'update',
              success: true
            };
          }
          else if (requestObj.type == "remove") {
            if (users.getUserByName(requestObj.nameuser) !== undefined) {
              if (users.getUserByName(requestObj.nameuser).ownerOf.getFunko(requestObj.namefunko) === undefined) {
                console.log(chalk.red("Funko not found"));
                response = {
                  type: 'remove',
                  success: false
                };
              } else {
                users.getUserByName(requestObj.nameuser).ownerOf.removeFunko(requestObj.namefunko);
                console.log(chalk.green("Funko " + requestObj.namefunko + " deleted successfully"));
                response = {
                  type: 'remove',
                  success: true
                };
              }
            }
            else {
              console.log(chalk.red("User not found"));
              response = {
                type: 'remove',
                success: false
              };
            }

          }


          else {
            console.log(chalk.red("Type not found"));
            response = {
              type: 'add',
              success: false,
            };
          }


          // Se envía la respuesta al cliente
          socket.write(JSON.stringify(response) + '\n');
          // Se cierra la conexión
          socket.end();     
                  

        }


      });
    });

  }

```
  En el código anterior, podemos ver como se ha implementado la clase servidor que se encarga de recibir las peticiones del cliente y de enviar las respuestas correspondientes al tipo de petición realizada. 

 Pasando a la clase cliente, podemos ver como se ha implementado la clase cliente que se encarga de realizar las peticiones al servidor y de recibir las respuestas correspondientes al tipo de petición realizada.

``` typescript


export class Client {

  private client: net.Socket;
  private port: number;

  constructor(port : number) {
    this.port = port    
  }

  //metodo start que recibe como parametro un JSON
  public start(peticion: RequestType) {
    this.client = net.createConnection({ port: this.port }, () => {
      console.log('Conexión establecida con el servidor');

      // Enviar la petición al servidor
      this.client.write(JSON.stringify(peticion) + '\n');
            
    });
    this.client.on('data', (dataJSON) => {
      // Procesa la respuesta recibida
      const response = JSON.parse(dataJSON.toString());
      console.log(`Respuesta recibida: `);
      const funko1 = new Funko(
        0,
        "",
        "",
        Tipo.Pop,
        Genero.Animacion,
        "",
        0,
        false,
        "",
        0
      );
      if (response.type == "read" || response.type == "list"  ) {
        if (response.success) {
          response.funkopops.forEach((funko: Funko) => {
            Object.assign(funko1, funko);
            funko1.mostrarFunko();
            console.log(chalk.yellow("----------------------------------------------"));
        });
        
      }
      else {
        console.log(chalk.red("Funko not found"));
      }
      


      
      }
      else if (response.type == "add" ) {
        if (response.success) {
          console.log(chalk.green("Funko added"));
        }
        else {
          console.log(chalk.red("Funko not added"));
        }
      }
      else if (response.type == "update" ) {
        if (response.success) {
          console.log(chalk.green("Funko updated"));
        }
        else {
          console.log(chalk.red("Funko not updated"));
        }
      }
      else if (response.type == "remove" ) {
        if (response.success) {
          console.log(chalk.green("Funko removed"));
        }
        else {
          console.log(chalk.red("Funko not removed"));
        }
      }
      
    });

    this.client.on('end', () => {
      console.log('Conexión cerrada con el servidor');
    });
  }
}

```
 La clase cliente se encarga de realizar las peticiones al servidor y de recibir las respuestas correspondientes al tipo de petición realizada.

## Ejercicio PE102

Para este ejercicio de practicas hemos desarrollado una clase cliente y otra servidor que se encargan de realizar las peticiones al servidor y de recibir las respuestas correspondientes al tipo de petición realizada.

``` typescript

export class Client {

  private client: net.Socket;
  private port: number;

  constructor(port : number) {
    this.port = port    
  }

  public start(peticion: string[]) {

    this.client = net.createConnection({ port: this.port }, () => {
      console.log('Conexión establecida con el servidor');
      
      // contruir el objeto JSON
      const request = {
        command: peticion[0],
        params: [...peticion]
      };
      // Enviar la petición al servidor
      this.client.write(JSON.stringify(request) + '\n');
            
    });
    this.client.on('data', (dataJSON) => {
      // Procesa la respuesta recibida
      const response = JSON.parse(dataJSON.toString());
      console.log(`Respuesta recibida: `);
      console.log(response.text);
    });

    this.client.on('end', () => {
      console.log('Conexión cerrada con el servidor');
    });
  }

}

```
  En el código anterior, podemos ver como se ha implementado la clase cliente que se encarga de realizar las peticiones de ejecución de comandos al servidor y de recibir las respuestas correspondientes al tipo de petición realizada.


``` typescript

export class Server {

  private server: net.Server;
  private port: number;
  private response_ = '';

  constructor(port: number) {
    this.port = port;
    this.server = net.createServer();
  }

  public start() {

    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });


    this.server.on('connection', (socket: net.Socket) => {
      let requestData = Buffer.from('');

      socket.on('data', (data: Buffer) => {
        
        // Acumula los datos recibidos en el búfer
        requestData = Buffer.concat([requestData, data]);
       
        // Busca el delimitador al final de la petición
        const delimiter = Buffer.from('\n');
        const delimiterIndex = requestData.indexOf(delimiter);
        
        // Se encontró el delimitador, procesa la petición
        if (delimiterIndex !== -1) {
          // Emitir evento 'request' para indicar que se ha recibido una petición completa
          const request = requestData.slice(0, delimiterIndex).toString();
          //La petición es un objeto JSON, por lo que se convierte a objeto
          const requestObj = JSON.parse(request);
          // Se procesa la petición en este caso el primer parámetro es el comando y el segundo es el array de parámetros
          console.log(`Petición recibida: ${requestObj.command} ${requestObj.params}`);
          //ejecutar el comando de manera sincrona sin metodos auxiliares
          const child = spawn(requestObj.command );
          let response = '';
          child.stdout.on('data', (data) => {
            // Almacenar la respuesta en la variable "response"
            response += data.toString();
            console.log(`Respuesta recibida: ${response}`);
          });
          child.on('close', (code) => {
            if (code !== 0) {
              console.log(`Comando fallido con código ${code}`);
            } else {

                   
                  // Construir el objeto JSON con la respuesta
                  const responseObj = {
                    text: response
                  };
                  // Enviar la respuesta al cliente
                  socket.write(JSON.stringify(responseObj) + '\n');
                  // Cerrar la conexión
                  
                  socket.end();


            }
          });
                  

        }
      });
    });

  }



  public getResponse(): string {
    return this.response_;
  }

  public stop() {
    this.server.close();
  }
}


const server = new Server(63004);

server.start();

```

  En el código anterior, podemos ver como se ha implementado la clase servidor que se encarga de recibir las peticiones de ejecución de comandos del cliente, ejecutar el comando mediante un child process y devolver la respuesta al cliente.


  ## Conclusiones

  Como conclusión podemos decir que hemos aprendido a realizar peticiones al servidor mediante sockets y a recibir las respuestas correspondientes al tipo de petición realizada. Además, hemos aprendido a ejecutar comandos de manera sincrona mediante un child process.
  Aunque destacar la dificultad de empezar a trabajar con codigo asíncrono, ya que es algo que  hemos trabajado en clase pero que nos ha costado un poco de trabajo entenderlo y aplicarlo. Aún así he intentado resolver los ejercicios propuestos de la mejor manera posible. 

  Destacar desde mi punto de vista que la mayor dificultad ha sido el desarrollo de la pruebas para el codigo desarrollado puesto que la complejidad que ha supuesto el trabajo con codigo asincrono ha hecho que las pruebas no funcionen correctamente.

  

