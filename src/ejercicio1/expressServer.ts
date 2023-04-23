import express from 'express';
import { UserCollection } from "./UserCollection.js";
import {  Tipo, Genero } from "./Funko.js";
import {  listFunko, readFunko, addFunko, deleteFunko, updateFunko } from "./funciones.js";

const users = new UserCollection();

const app = express();

/**
 * Servidor Express que gestiona las peticiones
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
    readFunko(nameUser, idFunko, users, (err, data) => {
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
    listFunko(nameUser, users, (err, data) => {

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
    
    deleteFunko(nameUser, idFunko, users, (err, data) => {
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

    addFunko (nameUser, idFunko, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorDeMercado, users, (err, data) => {
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

    updateFunko (nameUser, idFunko, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorDeMercado, users, (err, data) => {
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
  console.log('Server is up on port 3002');
});