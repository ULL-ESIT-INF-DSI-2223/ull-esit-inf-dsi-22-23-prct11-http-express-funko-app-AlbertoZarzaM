import chalk from "chalk";

/**
 * @enum Tipo
 * @description Enumerado que contiene los tipos de Funkos
 */
export enum Tipo {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold",
}
/**
 * @enum Genero
 * @description Enumerado que contiene los géneros de Funkos
 */
export enum Genero {
  Animacion = "Animación",
  PeliculasYTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Ánime",
}

export class Funko {
  private _id: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: Tipo;
  private _genero: Genero;
  private _franquicia: string;
  private _numero: number;
  private _exclusivo: boolean;
  private _caracteristicasEspeciales: string;
  private _valorDeMercado: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: Tipo,
    genero: Genero,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    caracteristicasEspeciales: string,
    valorDeMercado: number
  ) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._tipo = tipo;
    this._genero = genero;
    this._franquicia = franquicia;
    this._numero = numero;
    this._exclusivo = exclusivo;
    this._caracteristicasEspeciales = caracteristicasEspeciales;
    this._valorDeMercado = valorDeMercado;
  }

  mostrarFunko(): void {
    console.log(chalk.green(`ID: ${this._id}`));
    console.log(chalk.green(`Nombre: ${this._nombre}`));
    console.log(chalk.green(`Descripción: ${this._descripcion}`));
    console.log(chalk.green(`Tipo: ${this._tipo}`));
    console.log(chalk.green(`Género: ${this._genero}`));
    console.log(chalk.green(`Franquicia: ${this._franquicia}`));
    console.log(chalk.green(`Número: ${this._numero}`));
    console.log(chalk.green(`Exclusivo: ${this._exclusivo}`));
    console.log(
      chalk.green(
        `Características especiales: ${this._caracteristicasEspeciales}`
      )
    );
    if (this._valorDeMercado < 10) {
      console.log(chalk.green(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 10 && this._valorDeMercado < 30) {
      console.log(chalk.blue(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 30 && this._valorDeMercado < 50) {
      console.log(chalk.bgYellow(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 50 && this._valorDeMercado < 80) {
      console.log(chalk.red(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else if (this._valorDeMercado >= 80 && this._valorDeMercado < 100) {
      console.log(chalk.cyan(`Valor de mercado: ${this._valorDeMercado}`));
    }
    else {
      console.log(chalk.magenta(`Valor de mercado: ${this._valorDeMercado}`));
    }

  }

  /**
   * @returns Debe ser un identificador único del Funko.
   */
  get id(): number {
    return this._id;
  }

  /**
   *
   * @param id Debe ser un identificador único del Funko.
   */
  setid(id: number) {
    this._id = id;
  }

  /**
   * @returns Debe ser una cadena de caracteres.
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   *
   * @param nombre Debe ser una cadena de caracteres.
   */
  setnombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * @returns Debe ser una cadena de caracteres.
   *
   */
  get descripcion(): string {
    return this._descripcion;
  }

  /**
   *
   * @param descripcion Debe ser una cadena de caracteres.
   */
  setdescripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * @returns Debe ser un enumerado con valores como, por ejemplo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros.
   */
  get tipo(): Tipo {
    return this._tipo;
  }

  /**
   *
   * @param tipo Debe ser un enumerado con valores como, por ejemplo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros.
   */
  settipo(tipo: Tipo) {
    this._tipo = tipo;
  }

  /**
   * @returns Debe ser un enumerado con valores como, por ejemplo, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras.
   */
  get genero(): Genero {
    return this._genero;
  }

  /**
   *
   * @param genero Debe ser un enumerado con valores como, por ejemplo, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras.
   */
  setgenero(genero: Genero) {
    this._genero = genero;
  }

  /**
   * @returns Debe ser una cadena de caracteres como, por ejemplo, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the Galaxy, entre otras.
   */
  get franquicia(): string {
    return this._franquicia;
  }

  /**
   *
   * @param franquicia Debe ser una cadena de caracteres como, por ejemplo, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the Galaxy, entre otras.
   */
  setfranquicia(franquicia: string) {
    this._franquicia = franquicia;
  }

  /**
   * Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
   * @returns Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
   *
   */
  get numero(): number {
    return this._numero;
  }

  /**
   *  Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
   * @param numero  Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
   */
  setnumero(numero: number) {
    this._numero = numero;
  }

  /**
   * Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
   * @returns Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
   */
  get exclusivo(): boolean {
    return this._exclusivo;
  }

  /**
   *  Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
   * @param exclusivo Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
   */
  setexclusivo(exclusivo: boolean) {
    this._exclusivo = exclusivo;
  }

  /**
   *  Debe ser una cadena de caracteres que indique las característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea.
   *  @returns  Debe ser una cadena de caracteres que indique las característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea.
   */
  get caracteristicasEspeciales(): string {
    return this._caracteristicasEspeciales;
  }

  /**
   *
   * @param caracteristicasEspeciales  Debe ser una cadena de caracteres que indique las característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea.
   */
  setcaracteristicasEspeciales(caracteristicasEspeciales: string) {
    this._caracteristicasEspeciales = caracteristicasEspeciales;
  }

  /**
   * El valor de mercado debe ser un valor numérico positivo
   * @returns Valor numérico positivo
   *
   */
  get valorDeMercado(): number {
    return this._valorDeMercado;
  }

  /**
   *  El valor de mercado debe ser un valor numérico positivo
   * @param valorDeMercado Valor numérico positivo
   */
  setvalorDeMercado(valorDeMercado: number) {
    if (valorDeMercado < 0) {
      throw new Error(
        "El valor de mercado debe ser un valor numérico positivo"
      );
    }
    this._valorDeMercado = valorDeMercado;
  }
}
