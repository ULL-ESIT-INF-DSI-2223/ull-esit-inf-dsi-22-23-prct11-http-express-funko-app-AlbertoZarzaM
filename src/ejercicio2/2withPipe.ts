
import {spawn} from 'child_process';
import yargs from "yargs";
import * as fs from "fs";
import { hideBin } from "yargs/helpers";


/**
 * Ejercicio 2
 */
yargs(hideBin(process.argv))
    .command('read', 'Reads a file', {
      file: {
        description: 'File path',
        type: 'string',
        demandOption: true,
      },
      lines: {
        description: 'File lines',
        type: 'boolean',
        demandOption: true,
      },
      words: {
        description: 'File words',
        type: 'boolean',
        demandOption: true,
      },
      chars: {
        description: 'File chars',
        type: 'boolean',
        demandOption: true,
      }
    } , (argv) => {
      //si el ficher existe
      if (fs.existsSync(argv.file)) {
        //si el ficher es un archivo
        if (fs.lstatSync(argv.file).isFile()) {
          
          
          const cat = spawn('cat', [argv.file]);
          /**
           * Si se ha pasado la opción lines
           */
          if (argv.lines) {
            const wc = spawn('wc', ['-l']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              
              process.stdout.write(wcOutput);
            });
          } 
          /**
           * Si se ha pasado la opción words
           */
          if (argv.words) {
            const wc = spawn('wc', ['-w']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              process.stdout.write(wcOutput);
            });
          }
          /**
           * Si se ha pasado la opción chars
           */
          if (argv.chars) {
            const wc = spawn('wc', ['-c']);
            cat.stdout.pipe(wc.stdin);
            
            let wcOutput = '';
            wc.stdout.on('data', (piece) => {
              wcOutput += piece;
            });
            
            wc.on('close', () => {
              process.stdout.write(wcOutput);
            });
          }
    
        }
      } else {
        console.log("El fichero no existe");
      }
    })
  .help()
  .argv;

