class Producto {
    constructor(id, nombre, fechaSubasta, precioInicial) {
        this.id = id;
        this.nombre = nombre;
        this.fechaSubasta = fechaSubasta;
        this.precioInicial = precioInicial;
        this.ofertas = [];
    }

    agregarOferta(oferta) {
        this.ofertas.push(oferta);
    }

    obtenerOfertas() {
        return this.ofertas;
    }

    seleccionarOfertaGanadora() {
        if (this.ofertas.length === 0) {
            return null;
        }
        let ofertaGanadora = this.ofertas[0];
        for (let oferta of this.ofertas) {
            if (oferta.valorOfrecido > ofertaGanadora.valorOfrecido) {
                ofertaGanadora = oferta;
            }
        }
        return ofertaGanadora;
    }
}

class Oferta {
    constructor(nombrePersona, fecha, valorOfrecido) {
        this.nombrePersona = nombrePersona;
        this.fecha = fecha;
        this.valorOfrecido = valorOfrecido;
    }
}

class Subasta {
    constructor() {
        this.productos = [];
    }

    registrarProducto(id, nombre, fechaSubasta, precioInicial) {
        const producto = new Producto(id, nombre, fechaSubasta, precioInicial);
        this.productos.push(producto);
    }

    pujar(idProducto, nombrePersona, fecha, valorOfrecido) {
        const producto = this.productos.find(prod => prod.id === idProducto);
        if (producto) {
            const oferta = new Oferta(nombrePersona, fecha, valorOfrecido);
            producto.agregarOferta(oferta);
        } else {
            console.log("Producto no encontrado.");
        }
    }

    verProductos() {
        return this.productos;
    }

    verOfertas(idProducto) {
        const producto = this.productos.find(prod => prod.id === idProducto);
        if (producto) {
            return producto.obtenerOfertas();
        } else {
            console.log("Producto no encontrado.");
            return [];
        }
    }

    seleccionarGanador(idProducto) {
        const producto = this.productos.find(prod => prod.id === idProducto);
        if (producto) {
            return producto.seleccionarOfertaGanadora();
        } else {
            console.log("Producto no encontrado.");
            return null;
        }
    }
}

// Ejemplo de uso
const subasta = new Subasta();

subasta.registrarProducto(1, "Pintura de Van Gogh", "2023-05-20", 5000);
subasta.registrarProducto(2, "Escultura de Rodin", "2023-06-15", 8000);

subasta.pujar(1, "Juan Pérez", "2023-05-18", 5500);
subasta.pujar(1, "María López", "2023-05-19", 6000);
subasta.pujar(2, "Carlos Gómez", "2023-06-14", 8500);

console.log("Lista de productos:");
console.log(subasta.verProductos());

console.log("\nOfertas para el producto con id 1:");
console.log(subasta.verOfertas(1));

console.log("\nOfertas para el producto con id 2:");
console.log(subasta.verOfertas(2));

console.log("\nSeleccionar oferta ganadora para el producto con id 1:");
console.log(subasta.seleccionarGanador(1));

console.log("\nSeleccionar oferta ganadora para el producto con id 2:");
console.log(subasta.seleccionarGanador(2));
