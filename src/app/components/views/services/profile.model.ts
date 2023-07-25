export interface Banners {
    id: number;
    vendedor: string;
    id_imagem: string;
    titulo: string;
    subtitulo: string;
}

export class CorModel {
  id: number;
  vendedor: string;
  primary_color: string;
  secondary: string;
}


export interface Anuncio {
  id: number;
  vendedor: string;
  id_imagem: string;
  titulo: string;
  subtitulo: string;
}