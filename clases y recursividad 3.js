//Ejercicio 3
class Cliente {
    constructor(nombre, pais, numeroPersonas, mascota = false) {
        this.nombre = nombre;
        this.pais = pais;
        this.numeroPersonas = numeroPersonas;
        this.mascota = mascota;
    }
}

class Habitacion {
    constructor(tipo, fumador, capacidad) {
        this.tipo = tipo; // 'individual', 'doble', 'familiar'
        this.fumador = fumador; // true o false
        this.capacidad = capacidad; // 2, 4, 6
        this.disponible = true;
    }
}

class Reserva {
    constructor(cliente, habitacion, inicio, fin) {
        this.cliente = cliente;
        this.habitacion = habitacion;
        this.inicio = inicio;
        this.fin = fin;
    }
}

class Hotel {
    constructor() {
        this.habitaciones = {
            'individual': { fumadores: [], noFumadores: [] },
            'doble': { fumadores: [], noFumadores: [] },
            'familiar': { fumadores: [], noFumadores: [] }
        };
        this.reservas = [];
        this.inicializarHabitaciones();
    }

    inicializarHabitaciones() {
        // Agregar 3 habitaciones de cada tipo, tanto fumadores como no fumadores
        for (let i = 0; i < 3; i++) {
            this.habitaciones['individual'].fumadores.push(new Habitacion('individual', true, 2));
            this.habitaciones['individual'].noFumadores.push(new Habitacion('individual', false, 2));
            this.habitaciones['doble'].fumadores.push(new Habitacion('doble', true, 4));
            this.habitaciones['doble'].noFumadores.push(new Habitacion('doble', false, 4));
            this.habitaciones['familiar'].fumadores.push(new Habitacion('familiar', true, 6));
            this.habitaciones['familiar'].noFumadores.push(new Habitacion('familiar', false, 6));
        }
    }

    buscarHabitacion(tipo, fumador) {
        let habitaciones = this.habitaciones[tipo][fumador ? 'fumadores' : 'noFumadores'];
        for (let habitacion of habitaciones) {
            if (habitacion.disponible) {
                return habitacion;
            }
        }
        return null;
    }

    reservarHabitacion(cliente, tipo, fumador, inicio, fin) {
        if (cliente.numeroPersonas > this.maxPersonasPorTipo(tipo)) {
            console.log("Número de personas excede la capacidad de la habitación.");
            return null;
        }
        if (tipo === 'familiar' && cliente.mascota && fumador) {
            console.log("No se permiten mascotas en habitaciones familiares para fumadores.");
            return null;
        }
        let habitacion = this.buscarHabitacion(tipo, fumador);
        if (habitacion) {
            habitacion.disponible = false;
            let reserva = new Reserva(cliente, habitacion, inicio, fin);
            this.reservas.push(reserva);
            return reserva;
        } else {
            console.log("No hay habitaciones disponibles de este tipo.");
            return null;
        }
    }

    maxPersonasPorTipo(tipo) {
        switch (tipo) {
            case 'individual': return 2;
            case 'doble': return 4;
            case 'familiar': return 6;
            default: return 0;
        }
    }

    generarEstadisticas() {
        let estadisticas = {
            totalReservas: this.reservas.length,
            ocupacionTotal: 0,
            reservas: []
        };
        for (let reserva of this.reservas) {
            estadisticas.ocupacionTotal += reserva.cliente.numeroPersonas;
            estadisticas.reservas.push({
                nombre: reserva.cliente.nombre,
                pais: reserva.cliente.pais,
                numeroPersonas: reserva.cliente.numeroPersonas,
                periodoEstadia: `${reserva.inicio.toDateString()} - ${reserva.fin.toDateString()}`,
                mascota: reserva.cliente.mascota
            });
        }
        return estadisticas;
    }
}

// Ejemplo de uso
const hotel = new Hotel();

const cliente1 = new Cliente("Juan Pérez", "México", 2);
const cliente2 = new Cliente("Ana Gómez", "Argentina", 4, true);
const cliente3 = new Cliente("Luis Martínez", "España", 1);

hotel.reservarHabitacion(cliente1, 'individual', false, new Date('2023-05-01'), new Date('2023-05-07'));
hotel.reservarHabitacion(cliente2, 'familiar', false, new Date('2023-05-10'), new Date('2023-05-15'));
hotel.reservarHabitacion(cliente3, 'doble', true, new Date('2023-05-01'), new Date('2023-05-05'));

console.log(hotel.generarEstadisticas());