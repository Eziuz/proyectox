export interface bloodModel{
    id: number;
    fechaRecoleccion: Date;
    fechaVencimiento: Date;
    cantidad: number;
    precio: number; // Verificar tipo de dato
    idHemocomponente: number;
    tipoHemocomponente: string;
    idNovedad: number;
    novedad: string;
    idEntrada: number;
    idSangre: number;
    tipoSangre: string;
    rutaImg: string;
}