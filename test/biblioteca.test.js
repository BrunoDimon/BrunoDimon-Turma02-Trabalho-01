const Biblioteca = require('../src/biblioteca');  

describe('Testes para a classe Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense'});
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense'});
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.adicionarMembro({id: 2, nome: 'José'});

    });

    test('Adicionar livro', () => {
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal' });
        expect(biblioteca.livros).toHaveLength(3);
    });

    test('Remover livro', () => {
        biblioteca.removerLivro(1);
        expect(biblioteca.livros).toHaveLength(1);
    });

    test('Buscar livro por ID', () => {
        const livroEncontrado = biblioteca.buscarLivroPorId(2);
        expect(livroEncontrado).toEqual({ id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense'});
    });

    test('Buscar livro por título', () => {
        const livroEncontrado = biblioteca.buscarLivroPorTitulo('O Código Da Vinci');
        expect(livroEncontrado).toEqual([{id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense'}]);
    });

    test('Buscar todos os livros', () => {
        expect(biblioteca.listarLivros()).toHaveLength(2);
    });

    test('Adicionando membros', () => {
        expect(biblioteca.membros).toHaveLength(2);
    });
    
    test('Removendo membros', () => {
        biblioteca.removerMembro(2)
        expect(biblioteca.membros).toHaveLength(1);
    });

    test('Buscando membro por ID', () => {
        const membroEncontrado = biblioteca.buscarMembroPorId(1);
        expect(membroEncontrado).toEqual({id: 1, nome: 'Bruno'});
    });

    test('Buscar todos os membros', () => {
        expect(biblioteca.listarMembros()).toHaveLength(2);
    });

    test('Emprestando um livro', () => {
        biblioteca.emprestarLivro(1, 1);
    });

    test('Emprestando um livro', () => {
        expect(biblioteca.emprestarLivro(1,1)).toBe(true);
        expect(biblioteca.emprestarLivro(3,3)).toBe(false);
    });

    test('Devolver livro', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.devolverLivro(1)).toBe(true);
        expect(biblioteca.devolverLivro(2)).toBe(false);
        
    });

    test('Listar livros emprestados', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosEmprestados()).toEqual([{ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense', emprestado: true, idMembro: 1}]);
    });

    test('Listar livros disponíveis', () => {
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosDisponiveis()).toEqual([{ id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense' }]);
    });

    test('Contar livros', () => {
        expect(biblioteca.contarLivros()).toBe(2);
    });

    test('Contar membros', () => {
        expect(biblioteca.contarMembros()).toBe(2);
    });

    test('Listar livros por autor', () => {
        expect(biblioteca.listarLivrosPorAutor('Dan Brown')).toEqual([
            { id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense' },
            { id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense' }
        ]);
    });

    test('Listar livros por gênero', () => {
        expect(biblioteca.listarLivrosPorGenero('Suspense')).toEqual([
            { id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense' },
            { id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown', genero: 'Suspense'}
        ]);
    });

    test('Atualizar informação do livro', () => {
        biblioteca.atualizarInformacaoLivro(1, { autor: 'Dan Brown', ano: 1998 });
        const livroAtualizado = biblioteca.buscarLivroPorId(1);
        expect(livroAtualizado).toEqual({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense', ano: 1998 });
    });
    
    test('Atualizar informação de um livro que não existe', () => {
        expect(biblioteca.atualizarInformacaoLivro(2, { autor: 'Dan Brown', ano: 2000 })).toBeUndefined();
    });

    test('Listar livros por ano', () => {
        biblioteca.atualizarInformacaoLivro(1, { ano: 1998 });
        biblioteca.atualizarInformacaoLivro(2, { ano: 2003 });
        expect(biblioteca.listarLivrosPorAno(1998)).toEqual([{ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', genero: 'Suspense', ano: 1998 }]);
    });


});