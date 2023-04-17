import { UserCollection } from "./UserCollection.js";
import { User } from "./User.js";
import { Funko, Tipo, Genero } from "./Funko.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";


import { Client } from "./classClient.js"; 
import {  RequestType } from "./tipos.js";
import { FunkoCollection } from "./FunkoCollection.js";


function estaEnEnum(valor: string, enumObj: object): boolean {
  return Object.values(enumObj).includes(valor);
}

const port = 63007;


yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko Name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko Description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko Type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "Funko Gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Funko Franchise",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Funko Number",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Funko Exclusive",
        type: "boolean",
        demandOption: true,
      },
      specialFeatures: {
        description: "Funko Special Features",
        type: "string",
        demandOption: true,
      },
      marketValue: {
        description: "Funko Market Value",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const tipo = argv.type;
      const gender = argv.gender;

      if (estaEnEnum(tipo, Tipo)) {
        console.log(chalk.green("Tipo correcto"));
      } else {
        console.error(chalk.red("Tipo incorrecto"));
        process.exit(1);
      }

      if (estaEnEnum(gender, Genero)) {
        console.log(chalk.green("Género correcto"));
      } else {
        console.error(chalk.red("Género incorrecto"));
        process.exit(1);
      }

      const cliente = new Client (port);

      const funkotoadd = new Funko(
        argv.id,
        argv.name,
        argv.description,
        tipo as Tipo,
        gender as Genero,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures,
        argv.marketValue
      );

      const peticion: RequestType = {
        type: "add",
        nameuser: argv.user,
        namefunko: argv.id,
        funkoPop: funkotoadd
      };
      cliente.start(peticion);   
    
    }
  )
  .command(
    "read",
    "read a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const cliente = new Client (port);

      const peticion: RequestType = {
        type: "read",
        nameuser: argv.user,
        namefunko: argv.id
      };
      cliente.start(peticion);  
    }
  )
  .command(
    "list",
    "list a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      
      const cliente = new Client (port);

      const peticion: RequestType = {
        type: "list", 
        nameuser: argv.user
      };
      cliente.start(peticion);  
    }
  )
  .command(
    "update",
    "Update a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko Name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko Description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko Type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "Funko Gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Funko Franchise",
        type: "string",
        demandOption: true,
      },
      number: {
        description: "Funko Number",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Funko Exclusive",
        type: "boolean",
        demandOption: true,
      },
      specialFeatures: {
        description: "Funko Special Features",
        type: "string",
        demandOption: true,
      },
      marketValue: {
        description: "Funko Market Value",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {

      const tipo = argv.type;
      const gender = argv.gender;

      if (estaEnEnum(tipo, Tipo)) {
        console.log(chalk.green("Tipo correcto"));
      } else {
        console.error(chalk.red("Tipo incorrecto"));
        process.exit(1);
      }

      if (estaEnEnum(gender, Genero)) {
        console.log(chalk.green("Género correcto"));
      } else {
        console.error(chalk.red("Género incorrecto"));
        process.exit(1);
      }

      const cliente = new Client (port);

      const funkotoadd = new Funko(
        argv.id,
        argv.name,
        argv.description,
        tipo as Tipo,
        gender as Genero,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures,
        argv.marketValue
      );

      const peticion: RequestType = {
        type: "update",
        nameuser: argv.user,
        namefunko: argv.id,
        funkoPop: funkotoadd
      };
      cliente.start(peticion);   
      


    }
  )
  .command(
    "remove",
    "Delete a funko",
    {
      user: {
        description: "User Name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {

      const cliente = new Client (port);

      const peticion: RequestType = {
        type: "remove",
        nameuser: argv.user,
        namefunko: argv.id
      };
      cliente.start(peticion);
      
    }
  )
  .help().argv;
