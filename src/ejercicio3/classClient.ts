import net from 'net';
import {  RequestType } from './tipos.js';
import { Funko, Tipo, Genero } from './Funko.js';
import chalk from 'chalk';

/**
 * Clase Cliente
 * 
 * Esta clase se encarga de establecer la conexión con el servidor y enviarle
 * las peticiones.
 * 
 */
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

