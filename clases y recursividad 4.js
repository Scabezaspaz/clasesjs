class Cliente {
    constructor(tipo, tipoAtencion, operacion = null) {
        this.tipo = tipo; // 'preferencial', 'general', 'sinCuenta'
        this.tipoAtencion = tipoAtencion; // 'caja', 'asesoria'
        this.operacion = operacion; // 'deposito' o 'retiro' (solo para 'caja')
    }
}

class Caja {
    constructor(id, tipo = 'caja') {
        this.id = id;
        this.tipo = tipo; // 'caja' o 'asesoria'
        this.libre = true;
    }

    asignarCliente(cliente) {
        if (this.libre) {
            this.libre = false;
            this.cliente = cliente;
            console.log(`Cliente ${cliente.tipo} asignado a la caja ${this.id} (${this.tipo}).`);
        } else {
            console.log(`La caja ${this.id} no está disponible.`);
        }
    }

    liberar() {
        this.libre = true;
        console.log(`La caja ${this.id} ha sido liberada.`);
    }
}

class Banco {
    constructor() {
        this.cajas = [
            new Caja(1), new Caja(2), new Caja(3), new Caja(4),
            new Caja(5, 'asesoria')
        ];
        this.colaPreferencial = [];
        this.colaGeneral = [];
        this.colaSinCuenta = [];
    }

    agregarCliente(cliente) {
        switch (cliente.tipo) {
            case 'preferencial':
                this.colaPreferencial.push(cliente);
                break;
            case 'general':
                this.colaGeneral.push(cliente);
                break;
            case 'sinCuenta':
                this.colaSinCuenta.push(cliente);
                break;
            default:
                console.log("Tipo de cliente no válido.");
        }
        this.asignarCliente();
    }

    asignarCliente() {
        for (let caja of this.cajas) {
            if (caja.libre) {
                let cliente;
                if (caja.id === 5 && this.colaPreferencial.length > 0) {
                    cliente = this.colaPreferencial.shift();
                } else if (caja.id <= 4 && caja.id >= 1 && caja.id <= 2) {
                    cliente = this.colaPreferencial.find(c => c.tipoAtencion === 'caja' && c.operacion === 'retiro') ||
                              this.colaGeneral.find(c => c.tipoAtencion === 'caja' && c.operacion === 'retiro') ||
                              this.colaSinCuenta.find(c => c.tipoAtencion === 'caja' && c.operacion === 'retiro');
                } else if (caja.id <= 4) {
                    cliente = this.colaPreferencial.shift() ||
                              this.colaGeneral.shift() ||
                              this.colaSinCuenta.shift();
                }

                if (cliente) {
                    caja.asignarCliente(cliente);
                }
            }
        }
    }

    liberarCaja(id) {
        const caja = this.cajas.find(c => c.id === id);
        if (caja) {
            caja.liberar();
            this.asignarCliente();
        } else {
            console.log("ID de caja no válido.");
        }
    }
}

// Ejemplo de uso
const banco = new Banco();

// Agregar clientes
banco.agregarCliente(new Cliente('preferencial', 'caja', 'retiro'));
banco.agregarCliente(new Cliente('general', 'caja', 'deposito'));
banco.agregarCliente(new Cliente('sinCuenta', 'asesoria'));
banco.agregarCliente(new Cliente('preferencial', 'caja', 'retiro'));
banco.agregarCliente(new Cliente('general', 'asesoria'));

// Liberar cajas y reasignar clientes
setTimeout(() => banco.liberarCaja(1), 5000);
setTimeout(() => banco.liberarCaja(2), 10000);
setTimeout(() => banco.liberarCaja(3), 15000);
