class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidadBodega = cantidadBodega;
        this.cantidadMinimaBodega = cantidadMinimaBodega;
        this.cantidadMaximaInventario = cantidadMaximaInventario;
        this.porcentajeDescuento = porcentajeDescuento;
    }

    solicitarPedido() {
        return this.cantidadBodega < this.cantidadMinimaBodega;
    }

    calcularTotalAPagar(cantidadUnidadesCompra) {
        let total = this.precioCompra * cantidadUnidadesCompra;
        total -= total * (this.porcentajeDescuento / 100);
        return total;
    }
}

class PrendaVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
        this.permitePlanchado = permitePlanchado;
    }
}

class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
    }
}

const prompt = require('prompt-sync')({sigint: true});

// Función para solicitar datos de productos y almacenarlos en un array
function gestionarProductos() {
    const prendasVestir = [];
    const calzados = [];

    // Consultar el número de productos de cada tipo
    const numPrendasVestir = parseInt(prompt("Ingrese el número de productos de tipo prendas de vestir a manejar: "));
    const numCalzados = parseInt(prompt("Ingrese el número de productos de tipo calzado a manejar: "));

    // Solicitar datos para las prendas de vestir
    for (let i = 0; i < numPrendasVestir; i++) {
        console.log(`\nIngresando datos para prenda de vestir ${i + 1}:`);
        const prenda = new PrendaVestir(
            prompt("Código: "),
            prompt("Descripción: "),
            parseFloat(prompt("Precio de compra: ")),
            parseFloat(prompt("Precio de venta: ")),
            parseInt(prompt("Cantidad en bodega: ")),
            parseInt(prompt("Cantidad mínima requerida en bodega: ")),
            parseInt(prompt("Cantidad máxima de inventario permitida: ")),
            parseFloat(prompt("Porcentaje de descuento: ")),
            prompt("Talla (S, M, L, etc.): "),
            prompt("Permite planchado (true/false): ") === 'true'
        );
        prendasVestir.push(prenda);
    }

    // Solicitar datos para los calzados
    for (let i = 0; i < numCalzados; i++) {
        console.log(`\nIngresando datos para calzado ${i + 1}:`);
        const calzado = new Calzado(
            prompt("Código: "),
            prompt("Descripción: "),
            parseFloat(prompt("Precio de compra: ")),
            parseFloat(prompt("Precio de venta: ")),
            parseInt(prompt("Cantidad en bodega: ")),
            parseInt(prompt("Cantidad mínima requerida en bodega: ")),
            parseInt(prompt("Cantidad máxima de inventario permitida: ")),
            parseFloat(prompt("Porcentaje de descuento: ")),
            parseInt(prompt("Talla (35, 36, 37, etc.): "))
        );
        calzados.push(calzado);
    }

    return { prendasVestir, calzados };
}

// Programa principal
const { prendasVestir, calzados } = gestionarProductos();

console.log("\nProductos de prendas de vestir:");
console.log(prendasVestir);

console.log("\nProductos de calzado:");
console.log(calzados);
