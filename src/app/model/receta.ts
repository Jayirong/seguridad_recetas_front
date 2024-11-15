export interface Receta {
    id_recipe : number,
    nombre : string,
    fecha_creacion : string,
    descripcion : string,
    autor : number | undefined,
    tipo_cocina : number,
    pais_origen : number,
    dificultad : string,
    img_ruta : string,
    idUser:number,
    comments:[]
    // {
    //     "id_recipe": 2,
    //     "nombre": "Rasdasdsad",
    //     "fecha_creacion": "15-11-2024",
    //     "descripcion": "Esta es una receta de ejemplo.",
    //     "tipo_cocina": 1,
    //     "pais_origen": 1,
    //     "dificultad": 2,
    //     "img_ruta": "ruta/a/imagen.jpg",
    //     "idUser": 1,
    //     "comments": []
    // }
}
