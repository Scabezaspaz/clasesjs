//EJERCICIO1
class Usuario {
    constructor(id, tipo) {
        this.id = id;
        this.tipo = tipo; // 'Estudiante' o 'Docente'
    }
}

class Atencion {
    constructor(usuario, fecha, modulo) {
        this.usuario = usuario;
        this.fecha = fecha;
        this.modulo = modulo;
    }
}

class Modulo {
    constructor(nombre) {
        this.nombre = nombre;
        this.atenciones = [];
        this.transferencias = [];
    }

    registrarAtencion(usuario) {
        const fecha = new Date();
        const atencion = new Atencion(usuario, fecha, this.nombre);
        this.atenciones.push(atencion);
    }

    transferirAtencion(atencion, moduloDestino) {
        const fecha = new Date();
        const transferencia = {
            usuario: atencion.usuario,
            fecha: fecha,
            origen: this.nombre,
            destino: moduloDestino.nombre
        };
        this.transferencias.push(transferencia);
        moduloDestino.registrarAtencion(atencion.usuario);
    }
}

class SistemaEstadisticas {
    constructor() {
        this.modulos = {
            'Terminal': new Modulo('Terminal'),
            'Oficina': new Modulo('Oficina')
        };
    }

    registrarAtencion(moduloNombre, usuario) {
        this.modulos[moduloNombre].registrarAtencion(usuario);
    }

    transferirAtencion(atencion, moduloOrigen, moduloDestino) {
        this.modulos[moduloOrigen].transferirAtencion(atencion, this.modulos[moduloDestino]);
    }

    generarEstadisticas() {
        const estadisticas = {
            totalUsuariosAtendidos: 0,
            atencionesPorDia: {},
            atencionesPorSegmento: {
                'Estudiante': { 'Terminal': 0, 'Oficina': 0 },
                'Docente': { 'Terminal': 0, 'Oficina': 0 }
            },
            transferencias: []
        };

        for (const moduloNombre in this.modulos) {
            const modulo = this.modulos[moduloNombre];
            modulo.atenciones.forEach(atencion => {
                estadisticas.totalUsuariosAtendidos++;
                const fechaStr = atencion.fecha.toISOString().split('T')[0];

                if (!estadisticas.atencionesPorDia[fechaStr]) {
                    estadisticas.atencionesPorDia[fechaStr] = { 'Terminal': 0, 'Oficina': 0 };
                }

                estadisticas.atencionesPorDia[fechaStr][moduloNombre]++;
                estadisticas.atencionesPorSegmento[atencion.usuario.tipo][moduloNombre]++;
            });

            modulo.transferencias.forEach(transferencia => {
                estadisticas.transferencias.push(transferencia);
            });
        }

        return estadisticas;
    }
}

// Ejemplo de uso
const sistema = new SistemaEstadisticas();
const usuario1 = new Usuario(1, 'Estudiante');
const usuario2 = new Usuario(2, 'Docente');

// Registrar atenciones
sistema.registrarAtencion('Terminal', usuario1);
sistema.registrarAtencion('Oficina', usuario2);

// Transferir atenciones
const atencionTransferida = sistema.modulos['Terminal'].atenciones[0];
sistema.transferirAtencion(atencionTransferida, 'Terminal', 'Oficina');

// Generar estadísticas
const estadisticas = sistema.generarEstadisticas();
console.log(estadisticas);






