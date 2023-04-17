import net from 'net';

export class Client {

  private client: net.Socket;
  private port: number;

  constructor(port : number) {
    this.port = port    
  }

  public start(peticion: string[]) {

    this.client = net.createConnection({ port: this.port }, () => {
      console.log('Conexión establecida con el servidor');
      
      // contruir el objeto JSON
      const request = {
        command: peticion[0],
        params: [...peticion]
      };
      // Enviar la petición al servidor
      this.client.write(JSON.stringify(request) + '\n');
            
    });
    this.client.on('data', (dataJSON) => {
      // Procesa la respuesta recibida
      const response = JSON.parse(dataJSON.toString());
      console.log(`Respuesta recibida: `);
      console.log(response.text);
    });

    this.client.on('end', () => {
      console.log('Conexión cerrada con el servidor');
    });
  }

}


const args = process.argv.slice(2);
console.log(args);


const client = new Client(63004);
client.start(args);

