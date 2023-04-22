import 'mocha';
import {expect} from 'chai';
import {User} from '../../src/ejercicio1/User.js'
import { FunkoCollection } from '../../src/ejercicio1/FunkoCollection.js';

describe('User', () => {

  it ('should create a User', () => {
    const user = new User("prueba");
    expect(user.nombre).to.be.equal("prueba");
  });

  it ('should change the name', () => {
    const user = new User("prueba");
    user.setnombre("prueba2");
    expect(user.nombre).to.be.equal("prueba2");
  });

  it ('should get the Funkos', () => {
    const user = new User("prueba");
    expect(user.ownerOf).to.be.equal(user.ownerOf);
  });

  it ('should change a Funkos', () => {
    const user = new User("prueba");
    const funkoCollection = new FunkoCollection("prueba");
    user.setownerOf(funkoCollection);
    expect(user.ownerOf).to.be.equal(funkoCollection);
  });

});


