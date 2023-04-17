import net from 'net';
import { spawn } from 'child_process';

export class Server {

  private server: net.Server;
  private port: number;
  private response_ = '';

  constructor(port: number) {
    this.port = port;
    this.server = net.createServer();
  }

  public start() {

    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });


    this.server.on('connection', (socket: net.Socket) => {
      let requestData = Buffer.from('');

      socket.on('data', (data: Buffer) => {
        
        // Acumula los datos recibidos en el búfer
        requestData = Buffer.concat([requestData, data]);
       
        // Busca el delimitador al final de la petición
        const delimiter = Buffer.from('\n');
        const delimiterIndex = requestData.indexOf(delimiter);
        
        // Se encontró el delimitador, procesa la petición
        if (delimiterIndex !== -1) {
          // Emitir evento 'request' para indicar que se ha recibido una petición completa
          const request = requestData.slice(0, delimiterIndex).toString();
          //La petición es un objeto JSON, por lo que se convierte a objeto
          const requestObj = JSON.parse(request);
          // Se procesa la petición en este caso el primer parámetro es el comando y el segundo es el array de parámetros
          console.log(`Petición recibida: ${requestObj.command} ${requestObj.params}`);
          //ejecutar el comando de manera sincrona sin metodos auxiliares
          const child = spawn(requestObj.command );
          let response = '';
          child.stdout.on('data', (data) => {
            // Almacenar la respuesta en la variable "response"
            response += data.toString();
            console.log(`Respuesta recibida: ${response}`);
          });
          child.on('close', (code) => {
            if (code !== 0) {
              console.log(`Comando fallido con código ${code}`);
            } else {

                   
                  // Construir el objeto JSON con la respuesta
                  const responseObj = {
                    text: response
                  };
                  // Enviar la respuesta al cliente
                  socket.write(JSON.stringify(responseObj) + '\n');
                  // Cerrar la conexión
                  
                  socket.end();


            }
          });
                  

        }
      });
    });

  }



  public getResponse(): string {
    return this.response_;
  }

  public stop() {
    this.server.close();
  }
}


const server = new Server(63004);

server.start();

