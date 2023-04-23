import { expect } from 'chai';
import 'mocha';
import { Funko, Genero, Tipo } from '../../src/ejercicio1/Funko.js';

describe('Funko', () => {

  it('should create a Funko', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    expect(funko.id).to.be.equal(1);
    expect(funko.nombre).to.be.equal("Funko");
    expect(funko.descripcion).to.be.equal("Funko de prueba");
    expect(funko.tipo).to.be.equal(Tipo.Pop);
    expect(funko.genero).to.be.equal(Genero.Animacion);
    expect(funko.franquicia).to.be.equal("Funko");
    expect(funko.numero).to.be.equal(1);
    expect(funko.exclusivo).to.be.equal(false);
    expect(funko.caracteristicasEspeciales).to.be.equal("nothing");
    expect(funko.valorDeMercado).to.be.equal(1);
  });

  it('should change the id', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setid(2);
    expect(funko.id).to.be.equal(2);
  });

  it('should change the nombre', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setnombre("Funko2");
    expect(funko.nombre).to.be.equal("Funko2");
  });

  it('should change the descripcion', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setdescripcion("Funko de prueba2");
    expect(funko.descripcion).to.be.equal("Funko de prueba2");
  });

  it('should change the tipo', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.settipo(Tipo.PopRides);
    expect(funko.tipo).to.be.equal(Tipo.PopRides);
  });

  it('should change the genero', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setgenero(Genero.PeliculasYTV);
    expect(funko.genero).to.be.equal(Genero.PeliculasYTV);
  });

  it('should change the franquicia', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setfranquicia("Funko2");
    expect(funko.franquicia).to.be.equal("Funko2");
  });

  it('should change the numero', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setnumero(2);
    expect(funko.numero).to.be.equal(2);
  });

  it('should change the exclusivo', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setexclusivo(true);
    expect(funko.exclusivo).to.be.equal(true);
  });

  it('should change the imagen', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setcaracteristicasEspeciales("nothing2");
    expect(funko.caracteristicasEspeciales).to.be.equal("nothing2");
  });

  it('should change the valorDeMercado', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    funko.setvalorDeMercado(2);
    expect(funko.valorDeMercado).to.be.equal(2);
  });

  it('should throw error the valorDeMercado', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    expect(() => funko.setvalorDeMercado(-1)).to.throw("El valor de mercado debe ser un valor numérico positivo");
  });

  it('should view the funko', () => {
    const funko = new Funko(1, "Funko", "Funko de prueba", Tipo.Pop, Genero.Animacion, "Funko", 1, false, "nothing", 1);
    expect(funko.mostrarFunko()).to.be.equal(undefined);
  });
});
