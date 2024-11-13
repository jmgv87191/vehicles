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
    observaciones:string;
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
    observaciones:string;
    detallerevision?: Detallerevision[];
}

export interface Detallerevision {
    subcategoriaId: number;
    subcategoria:   string;
    observacion:    string;
    estado:number;
}

/* Enviar Post  al backend*/


/* para el monitor */

export interface TablaMonitor{

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
    factura:       null | string;
    observaciones: null;
    asignado:      null | string;
    asignadoId:    number | null;
    modelo:        number | null;
    nota:          null | string;
    color:         string;
    user:          string;
    userId:        number;
    revision:      RevisionTablaMonitor;
}

export interface RevisionTablaMonitor {
    fecha_revision: Date ;
}

export interface MonitorVehicle {
    id:             number;
    fecha:          Date;
    inventario_id:  number;
    funcionario_id: number;
    user_id:        number;
    created_at:     Date;
    updated_at:     Date;
    deleted_at:     Date;
}

export interface RevisionMonitor  {
    id:           number;
    estado:       number;
    observacion:  string;
    subcategoria: string;
}