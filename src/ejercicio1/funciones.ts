import {  ResponseType } from './tipos.js';
import { UserCollection } from "./UserCollection.js";
import { User } from "./User.js";
import { Funko, Tipo, Genero } from "./Funko.js";
import chalk from "chalk";

function estaEnEnum(valor: string, enumObj: object): boolean {
  return Object.values(enumObj).includes(valor);
}


/**
 * 
 * Función callback que lista los funkos de un usuario
 * 
 * @param user  Nombre del usuario
 * @param callback   Función callback
 */
export const listFunko = (user: string, users: UserCollection,  callback: (
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




/**
 * 
 * Función  callback que lee un Funko  
 * 
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param callback  Función callback
 */
export const readFunko = (user: string, idfunko: number, users: UserCollection, callback: (
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

/**
 *  Función callback que elimina un Funko
 *  
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param callback  Función callback
 * 
 */
export const deleteFunko = (user: string, idfunko: number, users: UserCollection, callback: (
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

/**
 * 
 * Función callback que añade un Funko
 * 
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param nombre  Nombre del Funko
 * @param descripcion  Descripción del Funko
 * @param tipo  Tipo del Funko
 * @param genero  Género del Funko
 * @param franquicia  Franquicia del Funko
 * @param numero  Número del Funko
 * @param exclusivo  Exclusivo del Funko
 * @param caracteristicasEspeciales  Características especiales del Funko
 * @param valorDeMercado  Valor de mercado del Funko
 * @param callback  Función callback
 * 
 */
export const addFunko = (user: string, idfunko: number, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorDeMercado: number, users: UserCollection, callback: (
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


/**
 * 
 *  Función callback que actualiza un Funko
 * 
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param nombre  Nombre del Funko
 * @param descripcion  Descripción del Funko
 * @param tipo  Tipo del Funko
 * @param genero  Género del Funko
 * @param franquicia  Franquicia del Funko
 * @param numero  Número del Funko
 * @param exclusivo  Exclusivo del Funko
 * @param caracteristicasEspeciales  Características especiales del Funko
 * @param valorDeMercado  Valor de mercado del Funko
 * @param callback  Función callback
 */
export const updateFunko = (user: string, idfunko: number, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: string, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valorDeMercado: number, users: UserCollection, callback: (
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