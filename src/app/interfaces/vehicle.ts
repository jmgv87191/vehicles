export interface Vehicle {
}

export interface LoginReq{
    email: string;
    password: string;
}

export interface LoginRes {
    status:  boolean;
    message: string;
    data:    Data;
    token:   string;
}

export interface Data {
    id:                number;
    name:              string;
    email:             string;
    username:          string;
    email_verified_at: string;
    created_at:        Date;
    updated_at:        Date;
}

export interface VehiclesRes {

    id:            number;
    no_inventario: number;

}

export interface VehicleRes {
    id:            number;
    noeconomico:   number;
    noinventario:  number;
    area:          string;
    bien:          string;
    descripcion:   string;
    marca:         string;
    serie:         string;
    estado:        string;
    ubicacion:     string;
    factura:       string;
    observaciones?: string;
    asignado:      string;
    asignadoId:      number;
    modelo:        number;
    nota:          string;
    color:         string;
    userId: number;
    revision:      Revision[];
}

export interface Revision {
    vehiculoId:       number;
    funcionarioId:    string;
    funcionario:      string;
    "fecha revision": Date;
    detalles:    Subcategoria[];
    
}

export interface Subcategoria {
    subcategoriaId: number;
    subcategoria:   string;
    estado:      number ;
    observacion: string;
}


/* Enviar Post  al backend*/
export interface vehicleResp {
    inventarioId:    number;
    funcionarioId:   number;
    userId:          number;
    fecha:           string;
    detallerevision?: Detallerevision[];
}

export interface Detallerevision {
    subcategoriaId: number;
    subcategoria:   string;
    observacion:    string;
    estado:number;
}

/* Enviar Post  al backend*/
