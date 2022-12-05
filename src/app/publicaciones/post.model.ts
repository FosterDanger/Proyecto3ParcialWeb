export interface datosCliente {
  id: string;
  nombre: string;
  estado: string;
  ciudad: string;
  sucursal: string;
  servicio: string;
  calificacionServicio: string;
  recomendacion: string;
}

export interface cliente{
  nombre: string;
  estado: string;
  ciudad: string;
  sucursal: string;
}

export interface recomendacion{
  recomendacion: string;
}

export interface servicio{
  servicio: string;
  calificacionServicio: string;
}

export interface usuario{
  id: string;
  usuario: String;
  contraseña: string;
}

