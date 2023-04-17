import 'mocha';
import {expect} from 'chai';
import { FunkoCollection } from '../../src/ejercicio3/FunkoCollection.js';
import { Funko, Tipo, Genero} from '../../src/ejercicio3/Funko.js';

describe('FunkoCollection', () => {

  it ('should create a FunkoCollection', () => {
    const funkoCollection = new FunkoCollection("prueba");
    expect(funkoCollection.Owner).to.be.equal("prueba");
  });

  it ('should add a Funko', () => {
    const funkoCollection = new FunkoCollection("prueba");
    const funko = new Funko(2, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funkoCollection.addFunko(funko);
    expect(funkoCollection.getFunko(2)).to.be.equal(funko);
  });

  it ('should remove a Funko', () => {
    const funkoCollection = new FunkoCollection("prueba");
    const funko = new Funko(2, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funkoCollection.addFunko(funko);
    funkoCollection.removeFunko(2);
    expect(funkoCollection.getFunko(2)).to.be.equal(undefined);
  });

  it ('should get a Funko', () => {
    const funkoCollection = new FunkoCollection("prueba");
    const funko = new Funko(2, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funkoCollection.addFunko(funko);
    expect(funkoCollection.getFunko(2)).to.be.equal(funko);
  });

  it ('should get all Funkos', () => {
    const funkoCollection = new FunkoCollection("prueba");
    const funko = new Funko(2, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funkoCollection.addFunko(funko);
    expect(funkoCollection.funkos).to.be.equal(funkoCollection.funkos);
  });

  it ('should change all Funkos', () => {
    const funkoCollection = new FunkoCollection("prueba");
    const funko = new Funko(2, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    const funko2 = new Funko(3, "Funko2", "Funko de prueba2", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funkoCollection.addFunko(funko);
    funkoCollection.addFunko(funko2);
    const funkos = [funko, funko2];
    funkoCollection.setfunkos(funkos);
    expect(funkoCollection.funkos).to.be.equal(funkos);
  });

  it ('should get the Owner', () => {
    const funkoCollection = new FunkoCollection("prueba");
    expect(funkoCollection.Owner).to.be.equal("prueba");
  });


});
