const Banco = require("../src/banco");

describe("Testes para a classe Banco", () => {
    let conta;

    beforeEach(() => {
        conta = new Banco("Bruno", 1000);
    });

    test("Depositar dinheiro", () => {
        expect(conta.depositar(1000)).toBe(2000);
    });

    test("Sacar dinheiro", () => {
        expect(conta.sacar(500)).toBe(500);
        expect(() => conta.sacar(2000).toThrow("Saldo insuficiente"));
    });

    test("Transferir dinheiro para outra conta", () => {
        const contaDestino = new Banco("Douglas", 0);
        conta.transferir(500, contaDestino);
        expect(conta.obterSaldo()).toBe(500);
        expect(contaDestino.obterSaldo()).toBe(500);
    });

    test("Obter saldo atual", () => {
        expect(conta.obterSaldo()).toBe(1000);
    });

    test("Obter histórico de transações", () => {
        conta.depositar(1000);
        conta.sacar(500);
        conta.transferir(600, new Banco("Douglas", 0));
        expect(conta.obterHistorico()).toEqual([
            { tipo: "Depósito", valor: 1000 },
            { tipo: "Saque", valor: 500 },
            { tipo: "Saque", valor: 600 },
            { tipo: "Transferência", valor: 600, destino: "Douglas" }
        ]);
    });

    test("Definir limite de saque", () => {
        conta.definirLimiteDeSaque(500);
        expect(conta.limiteDeSaque).toBe(500);
    });

    test("Verificar se saque está dentro do limite", () => {
        conta.definirLimiteDeSaque(500);
        expect(conta.verificarLimiteDeSaque(400)).toBe(true);
        expect(() => conta.verificarLimiteDeSaque(600)).toThrowError("Saque acima do limite permitido");
    });

    test("Aplicar juros ao saldo", () => {
        expect(conta.aplicarJuros(10)).toBe(1100);
    });

    test("Pagar conta", () => {
        expect(conta.pagarConta(100)).toBe(900);
    });

    test("Obter total depositado", () => {
        conta.depositar(1000);
        conta.depositar(1000);
        expect(conta.obterTotalDepositado()).toBe(2000);
    });
    
});

describe('Testes da classe Banco', () => {
    let conta;

    beforeEach(() => {
        conta = new Banco('Conta Ugioni', 2);
    });

    test('Deve depositar dinheiro corretamente', () => {
        conta.depositar(7.7);
        expect(conta.obterSaldo()).toBe(9.7);
    });
});

