import express from 'express';
import {spawn} from 'child_process';


const app = express();


/**
 * 
 * Gestion de la ruta /execmd
 * 
 */
app.get('/execmd', (req, res) => {

  //si los parametros son undefined 
  if (!req.query.cmd) {
    res.status(400).send('Bad request');
  }
  else {
  const cmd = req.query.cmd as string;
  const argVec: string[] = [];

  //dividir una string por espacios en blanco en un array
  const args = req.query.arg as string;
  if (args) {
    args.split(' ').forEach((arg) => {
      if (arg) {
        argVec.push(arg);
      }
    });
  }
    
    //ejecutar el comando
    const child = spawn(cmd, argVec);
    let childOutput = '';
    let childError = '';
    child.stdout.on('data', (piece) => {
      childOutput += piece;
    } );
    
    child.stderr.on('data', (error) => {
      childError += error;     
    });

    child.on('error', (error) => {
      childError += error;
    }
    )
    
    child.on('close', () => {
      if (childError) {
        res.status(500).send({
          error: 
            {
              title: 'Command Error',
              body: childError
            } 
        });
      }
      else {
        res.send({
        output: 
          {
            title: 'Command ',
            body: childOutput
          } 
      });
      }
      
    }
    );
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
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});