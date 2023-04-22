
import { Funko } from "./Funko.js";


export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  nameuser?: string;
  namefunko?: number;
  funkoPop?: Funko;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkopops?: Funko[];
}