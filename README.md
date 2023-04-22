# Informe práctica 11

***Por: Alberto Zarza Martín (alu0101412993@ull.edu.es)***

## Introducción

  En esta práctica vamos a realizar 1 ejercicio que nos ayudará a profundizar en el uso de las clases y las interfaces en TypeScript, por otra parte también mencionar el uso de Modulos ESM como yargs o chalk y también a manejar un servidor Express. Además, vamos a desarrollar 1 ejercicio que se ha propuesto en la sesion de practicas para practicar y verficicar los conocimientos adquiridos en las clases anteriores.

## Dispositivo de trabajo

  Para el desarrollo de esta práctica he utilizado un sistema operativo Ubuntu por lo cual algunos de los pasos realizados solo estarán disponibles para los usuarios que utilicen este sistema operativo.

## Coveralls

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-AlbertoZarzaM?branch=main)

## Ejercicio 1 - FunkoPops mod Express Server

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

### Ampliación correspondiente a la práctica 11

Como ampliación a lo desarrollado hasta el momento, se ha creado un  servidor mediante el modulo express. Además adicionalmente se ha creado dos tipos para las peticiones y las respuestas para gestionar las peticiones HTTP.

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

  A continuación se muestra el código de la clase Servidor que implementa el servidor express:

``` typescript
const users = new UserCollection();

const app = express();

function estaEnEnum(valor: string, enumObj: object): boolean {
  return Object.values(enumObj).includes(valor);
}

export const listFunko = (user: string, callback: (
  err: ResponseType | undefined, data: ResponseType| undefined) => void) => {


  if (users.getUserByName(user) !== undefined) {

    const response: ResponseType = {
      type: 'list',
      success: true,
      funkopops: users.getUserByName(user).ownerOf.funkos
    }

    callback(undefined, response);
  } else {

    const response: ResponseType = {
      type: 'list',
      success: false
    }

    callback(response, undefined);
  }
  
};

export const readFunko = (user: string, idfunko: number, callback: (
  err: ResponseType | undefined, data: ResponseType| undefined) => void) => {
    let response: ResponseType;
    if (users.getUserByName(user) !== undefined) {
      if ( users.getUserByName(user).ownerOf.getFunko(idfunko) === undefined) {
        console.log(chalk.red("Funko not found"));
        response = {
          type: 'read',
          success: false,
        };
        callback(response, undefined);
        

      } else {
        response = {
          type: 'read',
          success: true,
          funkopops: [users.getUserByName(user).ownerOf.getFunko(idfunko)]
        };
        callback(undefined, response);
      }
    } else {
      console.log(chalk.red("User not found"));
      response = {
        type: 'read',
        success: false,
      };
      callback(response, undefined);
    }
};

export const deleteFunko = (user: string, idfunko: number, callback: (
  err: ResponseType | undefined, data: ResponseType| undefined) => void) => {

    let response: ResponseType;
    if (users.getUserByName(user) !== undefined) {
      if (users.getUserByName(user).ownerOf.getFunko(idfunko) === undefined) {
        console.log(chalk.red("Funko not found"));
        response = {
          type: 'remove',
          success: false
        };
        callback(response, undefined);
      } else {
        users.getUserByName(user).ownerOf.removeFunko(idfunko);
        console.log(chalk.green("Funko " + idfunko + " deleted successfully"));
        response = {
          type: 'remove',
          success: true
        };
        callback(undefined, response);
      }
    }
    else {
      console.log(chalk.red("User not found"));
      response = {
        type: 'remove',
        success: false
      };
      callback(response, undefined);
    }
};

export const addFunko = (user: string, idfunko: number, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorDeMercado: number, callback: (
  err: ResponseType | undefined, data: ResponseType| undefined) => void) => {

    let response: ResponseType;
    if (users.getUserByName(user)?.ownerOf.getFunko(idfunko) === undefined) {
      
      if (estaEnEnum(tipo, Tipo)) {
        console.log(chalk.green("Tipo correcto"));
      } else {
        console.error(chalk.red("Tipo incorrecto"));
        response = {
          type: 'add',
          success: false
        };
        callback(response, undefined);
      }

      if (estaEnEnum(genero, Genero)) {
        console.log(chalk.green("Género correcto"));
      } else {
        console.error(chalk.red("Género incorrecto"));
        response = {
          type: 'add',
          success: false
        };
        callback(response, undefined);
      }
      const FunkoToAdd = new Funko(
        idfunko,
        nombre,
        descripcion,
        tipo,
        genero,
        franquicia,
        numero,
        exclusivo,
        caracteristicasEspeciales,
        valorDeMercado
      );

      if (users.getUserByName(user) === undefined) {
        console.log(chalk.red("User not found"));
        console.log(chalk.yellow("Creating user..."));
        users.addUser(new User(user, FunkoToAdd));
      } else {
        users.getUserByName(user).ownerOf.addFunko(FunkoToAdd);
      }
      response = {
        type: 'add',
        success: true
      };
      callback(undefined, response);
    } else {
      console.log(chalk.red("Funko already exists on user " + user));
      response = {
        type: 'add',
        success: false
      };
      callback(response, undefined);
    }
    
   
};

export const updateFunko = (user: string, idfunko: number, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorDeMercado: number, callback: (
  err: ResponseType | undefined, data: ResponseType| undefined) => void) => {

    let response: ResponseType;

    if (estaEnEnum(tipo, Tipo)) {
      console.log(chalk.green("Tipo correcto"));
    } else {
      console.error(chalk.red("Tipo incorrecto"));
      response = {
        type: 'update',
        success: false
      };
      callback(response, undefined);
    }

    if (estaEnEnum(genero, Genero)) {
      console.log(chalk.green("Género correcto"));
    } else {
      console.error(chalk.red("Género incorrecto"));
      response = {
        type: 'update',
        success: false
      };
      callback(response, undefined);
    }

    const FunkoToAdd = new Funko(
      idfunko,
      nombre,
      descripcion,
      tipo,
      genero,
      franquicia,
      numero,
      exclusivo,
      caracteristicasEspeciales,
      valorDeMercado
    );

    
    if (users.getUserByName(user) === undefined) {
      console.log(chalk.red("User not found"));
      console.log(chalk.yellow("Creating user..."));
      users.addUser(new User(user , FunkoToAdd));
      
    } else {
      users.getUserByName(user).ownerOf.addFunko(FunkoToAdd);
    }
    console.log(
      chalk.green(
        "Funko " +
          user +
          " añadido al usuario " +
          idfunko +
          " correctamente"
      )
    );
    response = {
      type: 'update',
      success: true
    };
    callback(undefined, response);
};

app.get('/funko', (req, res) => {

  if (req.query.user && req.query.idFunko) {
    const nameUser = req.query.user as string;
    const idFunko = Number(req.query.idFunko as string);
    readFunko(nameUser, idFunko, (err, data) => {
      if (err){
        res.send(err);        
      }
      else if (data){
        res.send(data);
      }
    });
  }
  else if (req.query.user) {

    const nameUser = req.query.user as string;
    listFunko(nameUser, (err, data) => {

      if (err){
        res.send(err);        
      }
      else if (data){
        res.send(data);
      }

    });
  }

  else {
    res.status(400).send('Bad request');
  } 
});

app.delete('/funko', (req, res) => {
  if (req.query.user && req.query.idFunko) {
    const nameUser = req.query.user as string;
    const idFunko = Number(req.query.idFunko as string);
    
    deleteFunko(nameUser, idFunko, (err, data) => {
      if (err){
        res.send(err);
      }
      else if (data){
        res.send(data);
      }
    });
  }
  else {
    res.status(400).send('Bad request');
  }
});

app.post('/funko', (req, res) => {
  if (req.query.user && req.query.idFunko && req.query.tipo && req.query.genero && req.query.franquicia && req.query.numero && req.query.exclusivo && req.query.caracteristicasEspeciales && req.query.valorDeMercado) {
    const nameUser = req.query.user as string;
    const idFunko = Number(req.query.idFunko as string);
    const nombre = req.query.nombre as string;
    const descripcion = req.query.descripcion as string;
    const tipo = req.query.tipo as Tipo;
    const genero = req.query.genero as Genero;
    const franquicia = req.query.franquicia as string;
    const numero = Number(req.query.numero as string);
    const exclusivo = Boolean(req.query.exclusivo as string);
    const caracteristicasEspeciales = req.query.caracteristicasEspeciales as string;
    const valorDeMercado = Number(req.query.valorDeMercado as string);

    addFunko (nameUser, idFunko, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorDeMercado, (err, data) => {
      if (err){
        res.send(err);
      }
      else if (data){
        res.send(data);
      }
    });
  }
  else {
    res.status(400).send('Bad request');
  }
});


app.patch('/funko', (req, res) => {
  if (req.query.user && req.query.idFunko && req.query.tipo && req.query.genero && req.query.franquicia && req.query.numero && req.query.exclusivo && req.query.caracteristicasEspeciales && req.query.valorDeMercado) {
    const nameUser = req.query.user as string;
    const idFunko = Number(req.query.idFunko as string);
    const nombre = req.query.nombre as string;
    const descripcion = req.query.descripcion as string;
    const tipo = req.query.tipo as Tipo;
    const genero = req.query.genero as Genero;
    const franquicia = req.query.franquicia as string;
    const numero = Number(req.query.numero as string);
    const exclusivo = Boolean(req.query.exclusivo as string);
    const caracteristicasEspeciales = req.query.caracteristicasEspeciales as string;
    const valorDeMercado = Number(req.query.valorDeMercado as string);

    updateFunko (nameUser, idFunko, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorDeMercado, (err, data) => {
      if (err){
        res.send(err);
      }
      else if (data){
        res.send(data);
      }
    });
  }
  else {
    res.status(400).send('Bad request');
  }
});

app.get('/*', (req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(3002, () => {
  console.log('Server is up on port 3000');
});

```
En el codigo anteriror podemos ver como se ha desarrollado el servidor. En primer lugar se importan las librerias necesarias para el desarrollo del servidor. A continuación se definen las funciones que se van a utilizar para realizar las peticiones al servidor. Estas funciones se encargan de realizar las peticiones al servidor y de devolver la respuesta correspondiente a la petición realizada. Por último se definen las rutas que se van a utilizar para realizar las peticiones al servidor. En este caso se han definido las rutas para realizar las peticiones de tipo GET, POST, DELETE y PATCH. Además, se ha definido una ruta para cuando se realiza una petición a una ruta que no existe.

Las funciones que se han definido para realizar las peticiones al servidor son las siguientes:

 * listFunko: Esta función se encarga de realizar una petición al servidor para obtener la lista de funkos de un usuario. Para realizar esta petición se utiliza el método GET. Esta función recibe como parámetros el nombre del usuario y una función callback que se encarga de devolver la respuesta del servidor. En caso de que la petición se haya realizado correctamente se devuelve la lista de funkos del usuario. En caso contrario se devuelve un error.

  * getFunko: Esta función se encarga de realizar una petición al servidor para obtener un funko concreto de un usuario. Para realizar esta petición se utiliza el método GET. Esta función recibe como parámetros el nombre del usuario, el id del funko y una función callback que se encarga de devolver la respuesta del servidor. En caso de que la petición se haya realizado correctamente se devuelve el funko con el id indicado. En caso contrario se devuelve un error.

  * deleteFunko: Esta función se encarga de realizar una petición al servidor para eliminar un funko concreto de un usuario. Para realizar esta petición se utiliza el método DELETE. Esta función recibe como parámetros el nombre del usuario, el id del funko y una función callback que se encarga de devolver la respuesta del servidor. En caso de que la petición se haya realizado correctamente se devuelve el funko eliminado. En caso contrario se devuelve un error.

  * addFunko: Esta función se encarga de realizar una petición al servidor para añadir un funko a un usuario. Para realizar esta petición se utiliza el método POST. Esta función recibe como parámetros el nombre del usuario, el id del funko, el nombre del funko, la descripción del funko, el tipo del funko, el género del funko, la franquicia del funko, el número del funko, si es exclusivo o no, las características especiales del funko y el valor de mercado del funko y una función callback que se encarga de devolver la respuesta del servidor. En caso de que la petición se haya realizado correctamente se devuelve el funko añadido. En caso contrario se devuelve un error.

  * updateFunko: Esta función se encarga de realizar una petición al servidor para modificar un funko concreto de un usuario. Para realizar esta petición se utiliza el método PATCH. Esta función recibe como parámetros el nombre del usuario, el id del funko, el nombre del funko, la descripción del funko, el tipo del funko, el género del funko, la franquicia del funko, el número del funko, si es exclusivo o no, las características especiales del funko y el valor de mercado del funko y una función callback que se encarga de devolver la respuesta del servidor. En caso de que la petición se haya realizado correctamente se devuelve el funko modificado. En caso contrario se devuelve un error.

  Las funciones anteriores estan diseñadas mediante callbacks para poder realizar las peticiones al servidor de manera asincrona. Además, estas funciones se encargan de realizar las peticiones al servidor y de devolver la respuesta correspondiente a la petición realizada.

## Ejericio 2 PE102

Para la sesión de laboratorio se nos ha pedido desarrollar un servidor express que se encarge de recibir peticiones de ejecucion de comandos, devolviendo como respuesta la salida a ese comando.

``` typescript

const app = express();


/**
 * 
 * Gestion de la ruta /execmd
 * 
 */
app.get('/execmd', (req, res) => {

  //si los parametros son undefined 
  if (!req.query.cmd) {
    res.status(400).send('Bad request');
  }
  else {
  const cmd = req.query.cmd as string;
  const argVec: string[] = [];

  //dividir una string por espacios en blanco en un array
  const args = req.query.arg as string;
  if (args) {
    args.split(' ').forEach((arg) => {
      if (arg) {
        argVec.push(arg);
      }
    });
  }
    
    //ejecutar el comando
    const child = spawn(cmd, argVec);
    let childOutput = '';
    let childError = '';
    child.stdout.on('data', (piece) => {
      childOutput += piece;
    } );
    
    child.stderr.on('data', (error) => {
      childError += error;     
    });

    child.on('error', (error) => {
      childError += error;
    }
    )
    
    child.on('close', () => {
      if (childError) {
        res.status(500).send({
          error: 
            {
              title: 'Command Error',
              body: childError
            } 
        });
      }
      else {
        res.send({
        output: 
          {
            title: 'Command ',
            body: childOutput
          } 
      });
      }
      
    }
    );
  }
});

/**
 * 404 handler
 * 
 */
app.get('/*', (req, res) => {
  res.status(404).send('<h1>404</h1>');
});

/**
 * 
 * Server startup
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

```

El servidor se encarga de recibir peticiones GET a la ruta /execmd. En caso de que la petición no contenga el parametro cmd se devuelve un error 400. En caso contrario se ejecuta el comando recibido como parametro y se devuelve la salida del comando como respuesta.

En cuanto al manejador get del servidor en la ruta /execmd, se comprueba que el parametro cmd no sea undefined. En caso de que sea undefined se devuelve un error 400. En caso contrario se ejecuta el comando recibido como parametro y se devuelve la salida del comando como respuesta. Para ejecutar el comando se utiliza el modulo spawn de nodejs. Este modulo se encarga de ejecutar un comando y devolver la salida del comando como respuesta. Para ello se utiliza el metodo on del modulo spawn. Este metodo se encarga de ejecutar una funcion cuando se recibe un evento. En este caso se utiliza el metodo on para ejecutar una funcion cuando se recibe la salida del comando. En caso de que se reciba la salida del comando se devuelve la salida del comando como respuesta. En caso contrario se devuelve un error 500 gestionando dos tipos de errores: el error de ejecucion del comando y el error de salida del comando.


## Conclusiones

  Como conclusión podemos decir que hemos aprendido a realizar peticiones al servidor mediante el modulo express y a recibir las respuestas correspondientes al tipo de petición realizada con el Thunder Client. Además, hemos aprendido a desarrollar funciones asincronas mediante el patrón callback.

  Aunque destacar la dificultad de empezar a trabajar con codigo asíncrono, ya que es algo que  hemos trabajado en clase pero que nos ha costado un poco de trabajo entenderlo y aplicarlo. Aún así he intentado resolver los ejercicios propuestos de la mejor manera posible. 

  Destacar desde mi punto de vista que la mayor dificultad ha sido el desarrollo de la pruebas para el codigo desarrollado puesto que la complejidad que ha supuesto el trabajo con codigo asincrono ha hecho que las pruebas no funcionen correctamente.

  

