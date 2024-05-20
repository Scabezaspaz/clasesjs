//Ejercicio 2
class Cuenta {
    constructor(numeroCuenta, tipo, saldo) {
        this.numeroCuenta = numeroCuenta;
        this.tipo = tipo; // 'Ahorros' o 'Corriente'
        this.saldo = saldo;
    }
}

class Cliente {
    constructor(id, pin) {
        this.id = id;
        this.pin = pin;
        this.cuentas = [];
    }

    agregarCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
}

class Banco {
    constructor() {
        this.clientes = [];
    }

    agregarCliente(cliente) {
        this.clientes.push(cliente);
    }

    validarCliente(id, pin) {
        const cliente = this.clientes.find(cli => cli.id === id && cli.pin === pin);
        return cliente ? cliente : null;
    }

    aprobarRetiro(cuenta, monto) {
        if (cuenta.saldo >= monto) {
            cuenta.saldo -= monto;
            return true;
        }
        return false;
    }

    aprobarDeposito(cuenta, monto) {
        cuenta.saldo += monto;
        return true;
    }

    aprobarTransferencia(cuentaOrigen, cuentaDestino, monto) {
        if (this.aprobarRetiro(cuentaOrigen, monto)) {
            this.aprobarDeposito(cuentaDestino, monto);
            return true;
        }
        return false;
    }

    consultarSaldo(cuenta) {
        return cuenta.saldo;
    }
}

class CajeroAutomatico {
    constructor(banco) {
        this.banco = banco;
        this.clienteActual = null;
        this.intentosPIN = 0;
        this.maxIntentosPIN = 3;
        this.encendido = false;
    }

    encender() {
        this.encendido = true;
        console.log("Cajero automático encendido.");
    }

    apagar() {
        this.encendido = false;
        console.log("Cajero automático apagado.");
    }

    iniciarSesion(id, pin) {
        if (!this.encendido) {
            console.log("El cajero automático está apagado.");
            return;
        }
        this.clienteActual = this.banco.validarCliente(id, pin);
        if (this.clienteActual) {
            console.log("Inicio de sesión exitoso.");
            this.intentosPIN = 0;
        } else {
            this.intentosPIN++;
            if (this.intentosPIN >= this.maxIntentosPIN) {
                console.log("Demasiados intentos fallidos. Sesión terminada.");
                this.clienteActual = null;
                this.intentosPIN = 0;
            } else {
                console.log("PIN incorrecto. Intente de nuevo.");
            }
        }
    }

    realizarTransaccion(tipo, cuenta, monto = 0, cuentaDestino = null) {
        if (!this.clienteActual) {
            console.log("No hay cliente autenticado.");
            return;
        }

        let cuentaCliente = this.clienteActual.cuentas.find(c => c.numeroCuenta === cuenta);
        if (!cuentaCliente) {
            console.log("Cuenta no encontrada.");
            return;
        }

        switch (tipo) {
            case 'retiro':
                if (monto % 50000 !== 0) {
                    console.log("El monto del retiro debe ser múltiplo de $50000.");
                    return;
                }
                if (this.banco.aprobarRetiro(cuentaCliente, monto)) {
                    console.log(`Retiro exitoso, puede tomar $${monto} de la bandeja principal.`);
                } else {
                    console.log("Fondos insuficientes.");
                }
                break;
            case 'deposito':
                this.banco.aprobarDeposito(cuentaCliente, monto);
                console.log(`Depósito exitoso de $${monto}.`);
                break;
            case 'transferencia':
                let cuentaDestinoCliente = this.clienteActual.cuentas.find(c => c.numeroCuenta === cuentaDestino);
                if (cuentaDestinoCliente) {
                    if (this.banco.aprobarTransferencia(cuentaCliente, cuentaDestinoCliente, monto)) {
                        console.log(`Transferencia exitosa de $${monto} a la cuenta ${cuentaDestino}.`);
                    } else {
                        console.log("Fondos insuficientes para la transferencia.");
                    }
                } else {
                    console.log("Cuenta destino no encontrada.");
                }
                break;
            case 'consultaSaldo':
                const saldo = this.banco.consultarSaldo(cuentaCliente);
                console.log(`El saldo de la cuenta ${cuenta} es $${saldo}.`);
                break;
            default:
                console.log("Tipo de transacción no válido.");
        }
    }

    cerrarSesion() {
        this.clienteActual = null;
        console.log("Sesión cerrada.");
    }
}

// Ejemplo de uso
const banco = new Banco();

// Crear cuentas y cliente
const cuenta1 = new Cuenta("123456", "Ahorros", 1000000);
const cuenta2 = new Cuenta("654321", "Corriente", 500000);
const cliente = new Cliente("001", "1234");
cliente.agregarCuenta(cuenta1);
cliente.agregarCuenta(cuenta2);
banco.agregarCliente(cliente);

const atm = new CajeroAutomatico(banco);
atm.encender();
atm.iniciarSesion("001", "1234");
atm.realizarTransaccion('consultaSaldo', "123456");
atm.realizarTransaccion('retiro', "123456", 100000);
atm.realizarTransaccion('deposito', "654321", 200000);
atm.realizarTransaccion('transferencia', "654321", 150000, "123456");
atm.cerrarSesion();
atm.apagar();