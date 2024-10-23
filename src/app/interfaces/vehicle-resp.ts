export interface VehiclesReq {

    id:            number;
    no_inventario: number;

}


export interface VehicleReq {
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
    modelo:        number;
    nota?:          string;
    color:         string;
    revision?:      Revision[];
}

export interface Revision {
    vehiculoId?:       number;
    funcionarioId?:    number;
    funcionario?:      string;
    "fecha revision": Date;
    subcategorias?:    Subcategoria[];
}

export interface Subcategoria {
    subcategoriaId?: number;
    subcategoria?:   string;
    estado?:         number;
    detalles?:       Detalle[] | { [key: string]: Detalle };
}

export interface Detalle {
    estado:      number | null;
    observacion: null | string;
}

export interface vehicleResp {
    inventarioId:    number;
    funcionarioId:   number;
    userId:          number;
    fecha:           string;
    detallerevision: Detallerevision[];
}

export interface Detallerevision {
    subcategoriaId: number;
    subcategoria:   string;
    estado:         number | null;
    observacion:    null | string;
}

