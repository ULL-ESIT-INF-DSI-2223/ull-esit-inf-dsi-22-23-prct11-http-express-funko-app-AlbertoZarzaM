import { expect } from 'chai';
import 'mocha';
import { Funko, Tipo, Genero } from '../../src/ejercicio1/Funko.js';
import { addFunko, readFunko, listFunko, deleteFunko, updateFunko } from '../../src/ejercicio1/funciones.js';
import { UserCollection } from '../../src/ejercicio1/UserCollection.js';

const funko = new Funko(
  2,
  "Funko Pop! - Rick and Morty - Rick",
  "Rick Sanchez es el protagonista de la serie de televisión de Adult Swim, Rick and Morty. Es el padre de Morty y Jerry Smith, y el abuelo de Summer Smith. Es un científico loco y alcohólico que vive con su nieto Morty en una casa móvil en el vecindario de los Smith. Rick es un personaje muy inteligente y sarcástico, que a menudo se burla de su familia y de sus amigos. Es un genio, pero también es un alcohólico, y a menudo se emborracha y se comporta de manera inapropiada. A pesar de sus defectos, Rick es un buen padre y abuelo, y es muy protector con su familia. Rick es un gran fanático de las aventuras espaciales, y suele viajar por el universo en su nave espacial, la nave espacial de Rick. Rick es un personaje muy inteligente y sarcástico, que a menudo se burla de su familia y de sus amigos. Es un genio, pero también es un alcohólico, y a menudo se emborracha y se comporta de manera inapropiada. A pesar de sus defectos, Rick es un buen padre y abuelo, y es muy protector con su familia. Rick es un gran fanático de las aventuras espaciales, y suele viajar por el universo en su nave espacial, la nave espacial de Rick.",
  Tipo.Pop,
  Genero.Animacion,
  "Rick and Morty",
  1,
  false,
  "Ninguna",
  100
)

const users = new UserCollection();

describe('expressServer asynchoronous functions test', () => {
  it ('should list a Funko', (done) => {
    listFunko('pepe', users, (_, data) => {
      if (data) {
        expect(data.success).to.be.equal(true);
        done();
      }
    });
  });
  it ('shouldn\'t list a Funko', (done) => {
    listFunko('test',users,(error, _) => {
      if (error) {
        expect(error.success).to.be.equal(false);
        done();
      }
    });
  });

  it ('should read a Funko', (done) => {
    readFunko('pepe', 1,users, (_, data) => {
      if (data) {
        expect(data.success).to.be.equal(true);
        done();
      }
    });
  });
  it ('shouldn\'t read a Funko', (done) => {
    readFunko('test', 1,users, (error, _) => {
      if (error) {
        expect(error.success).to.be.equal(false);
        done();
      }
    });
  });

  // it ('shouldnt delete a Funko', (done) => {
  //   deleteFunko('pepe', 10000, (error, _) => {
  //     if (error) {
  //       expect(error.success).to.be.equal(false);
  //       done();
  //     }
  //   }); 
  // });

  // it ('shouldnt update a Funko', (done) => {
  //   updateFunko('pepe', 10000, funko.nombre, funko.descripcion, funko.tipo, funko.genero, funko.franquicia, funko.numero, funko.exclusivo, funko.caracteristicasEspeciales, funko.valorDeMercado, (error, _) => {
  //     if (error) {
  //       expect(error.success).to.be.equal(false);
  //       done();
  //     }
  //   });
  // });

});
