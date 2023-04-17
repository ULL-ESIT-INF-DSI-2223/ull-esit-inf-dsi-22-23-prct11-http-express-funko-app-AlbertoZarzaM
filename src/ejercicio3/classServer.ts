import net from 'net';
import {  ResponseType } from './tipos.js';
import { UserCollection } from "./UserCollection.js";
import { User } from "./User.js";
import { Funko, Tipo, Genero } from "./Funko.js";
import chalk from "chalk";

const users = new UserCollection();

/**
 * 
 * Función que comprueba si un valor está en un enum
 * 
 * @param valor  Valor a buscar en el enum
 * @param enumObj  Enum donde buscar
 * @returns 
 */
function estaEnEnum(valor: string, enumObj: object): boolean {
  return Object.values(enumObj).includes(valor);
}

/**
 * Clase que representa el servidor
 * 
 * Esta clase se encarga de establecer la conexión con el cliente y procesar
 * las peticiones que recibe.
 * 
 */
export class Server {

  private server: net.Server;
  private port: number;
  private response_ = '';

  /**
   * Constructor de la clase
   * @param port Puerto en el que escuchará el servidor
   * 
   */
  constructor(port: number) {
    this.port = port;
    this.server = net.createServer();
  }

  /**
   * Método que inicia el servidor
   * 
   * Este método se encarga de iniciar el servidor y establecer el manejador
   * de eventos para las conexiones entrantes.
   * 
   */
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




  public getResponse(): string {
    return this.response_;
  }

  public stop() {
    this.server.close();
  }
}


const server = new Server(63007);

server.start();

