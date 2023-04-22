import * as fs from "fs";
import { Funko, Genero, Tipo } from "./Funko.js";

export class FunkoCollection {
  private _funkos: Funko[];
  private owner: string;

  constructor(owner: string, funko?: Funko) {
    this._funkos = [];
    this.owner = owner;
    if (owner === "prueba") {
      this._funkos.push(
        new Funko(
          1,
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
      );
    }
    else {
      let archivos: string[] = [];

      fs.readdir(`./data/${this.owner}/`, { withFileTypes: true }, (err, dirents) => {
        if (err) {
          if (err.code === "ENOENT") {
            console.log(`El directorio no existe. Creando directorio...`);
            fs.mkdir(`./data/${this.owner}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(`Directorio creado exitosamente.`);
              this._funkos.push(funko as Funko);
              this.addFunko(funko as Funko);              
            });
          } else {
            throw err;
          }
        } else {
          archivos = dirents.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
  
          for (let i = 0; i < archivos.length; i++) {
            const funko = new Funko(
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
  
            fs.readFile(
              `./data/${this.owner}/${archivos[i]}`,
              "utf-8",
              (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
  
                const funkoLeido = JSON.parse(data);
                Object.assign(funko, funkoLeido);
                this._funkos.push(funko);
              }
            ); 
          }
          
        }
        
      });
   
    }
  }
  
  /**
   * Devuelve el nombre del dueño de la colección
   * @returns {string} Nombre del dueño de la colección
   * 
   */
  get Owner(): string {
    return this.owner;
  }

  /**
   * Devuelve el arreglo de Funkos
   *
   * @returns {Funko[]} Arreglo de Funkos
   */
  get funkos(): Funko[] {
    return this._funkos;
  }

  /**
   *  Asigna el arreglo de Funkos
   *
   * @param funkos
   */
  setfunkos(funkos: Funko[]) {
    this._funkos = funkos;
  }

  /**
   * Agrega un Funko al arreglo de Funkos
   *
   * @param funko
   */
  addFunko(funko: Funko): void {

    if (this.owner === "prueba") {
      this._funkos.push(funko);
      return;
    }
    const funkoJSON = JSON.stringify(funko);
    fs.writeFile(
      "./data/" + this.owner + "/funko" + funko.id + ".json",
      funkoJSON,
      (err) => {
        if (err) {
          throw err;
        } else {
          this._funkos.push(funko);
        }
      }
    );
  }

  /**
   *  Elimina un Funko del arreglo de Funkos
   * @param id  Id del Funko a eliminar
   */
  removeFunko(id: number): void {

    if (this.owner === "prueba") {
      this._funkos = this._funkos.filter((funko) => funko.id !== id);
      return;
    }
    const funko = this.getFunko(id);
    fs.unlink("./data/" + this.owner + "/funko" + funko.id + ".json", (err) => {
      if (err) {
        throw err;
      } else {
        this._funkos = this._funkos.filter((f) => f.id !== id);
      }
    });
  }

  /**
   *  Busca un Funko en el arreglo de Funkos
   * @param id  Id del Funko a buscar
   * @returns  El Funko con el id especificado
   */
  getFunko(id: number): Funko {
    return this._funkos.find((funko) => funko.id === id) as Funko;
  }
}
