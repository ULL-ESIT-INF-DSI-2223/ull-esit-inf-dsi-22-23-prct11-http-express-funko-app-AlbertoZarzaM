import { FunkoCollection } from "./FunkoCollection.js";
import { Funko } from "./Funko.js";

export class User {
  private _nombre: string;
  private _ownerOf: FunkoCollection;

  constructor(nombre: string, funko?: Funko) {
    this._nombre = nombre;
    if (nombre !== "prueba") {
      this._ownerOf = new FunkoCollection(this.nombre, funko);
    }
    else {
      this._ownerOf = new FunkoCollection("prueba");
    }
  }

  /**
   * Muestra por consola los datos del usuario
   * @returns string
   *
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   *  Modifica el nombre del usuario
   * @param nombre  Nombre del usuario
   */
  setnombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * Devuelve la colección de Funkos del usuario
   * @returns FunkoCollection
   */
  get ownerOf(): FunkoCollection {
    return this._ownerOf;
  }

  /**
   *
   * @param ownerOf Colección de Funkos del usuario
   *
   */
  setownerOf(ownerOf: FunkoCollection) {
    this._ownerOf = ownerOf;
  }
}
