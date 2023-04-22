import express from 'express';
import {  ResponseType } from './tipos.js';
import { UserCollection } from "./UserCollection.js";
import { User } from "./User.js";
import { Funko, Tipo, Genero } from "./Funko.js";
import chalk from "chalk";

const users = new UserCollection();

const app = express();

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


/**
 * 
 * Función  callback que lee un Funko  
 * 
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param callback  Función callback
 */
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

/**
 *  Función callback que elimina un Funko
 *  
 * @param user  Nombre del usuario
 * @param idfunko  Id del Funko
 * @param callback  Función callback
 * 
 */
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



/**
 * 
 * Gestion de la ruta /funko
 * 
 * @param req  Petición
 * @param res  Respuesta
 * 
 * 
 */
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

/**
 * 
 * Gestion de la ruta /funko
 * 
 * @param req  Petición
 * @param res  Respuesta
 * 
 */
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

/**
 * 
 * Gestion de la ruta /funko
 * 
 * @param req  Petición
 * @param res  Respuesta
 */
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

/**
 * 
 * Gestion de la ruta /funko
 * 
 * @param req  Petición
 * @param res  Respuesta
 * 
 */
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
app.listen(3002, () => {
  console.log('Server is up on port 3000');
});