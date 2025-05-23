export interface AuthResponse {
  access_token: string;
  user: User;
  estudiantes: Estudiante[];
  person: Person;
}

export interface Estudiante {
  id: number;
  nombre_completo: string;
  grado: string;
  seccion: string;
  saldo: number;
  limite_uso_saldo: number;
}

export interface Person {
  id: number;
  direccion: string;
  email: string;
  telefonofijo: string;
  telefonomovil: string;
  imagen: string;
  nombres: string;
  apellidos: string;
  tipopersona: string;
  nrodoc: string;
  sexo: string;
  ubigeo: string;
  distrito: string;
  provincia: string;
  departamento: string;
  fecha: string;
  usuario_apoderado: string;
}

export interface User {
  id: number;
  username: string;
  email_verified_at: null;
  persona_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
