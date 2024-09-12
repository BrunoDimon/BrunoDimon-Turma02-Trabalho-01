const Biblioteca = require('../src/biblioteca');  

describe('Testes para a classe Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    test('Adicionar livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci'});
        expect(biblioteca.livros).toHaveLength(2);
    });

    test('Remover livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital'});
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci'});
        biblioteca.removerLivro(1);
        expect(biblioteca.livros).toHaveLength(1);
    });

    test('Buscar livro por ID', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        const livroEncontrado = biblioteca.buscarLivroPorId(2);
        expect(livroEncontrado).toEqual({ id: 2, titulo: 'O Código Da Vinci' });
    });

    test('Buscar livro por título', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal' });
        const livroEncontrado = biblioteca.buscarLivroPorTitulo('O Código Da Vinci');
        expect(livroEncontrado).toEqual([{id: 2, titulo: 'O Código Da Vinci'}]);
    });

    test('Buscar todos os livros', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal' });
        expect(biblioteca.listarLivros()).toHaveLength(3);
    });

    test('Adicionando membros', () => {
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.adicionarMembro({id: 2, nome: 'José'});
        expect(biblioteca.membros).toHaveLength(2);
    });
    
    test('Removendo membros', () => {
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.adicionarMembro({id: 2, nome: 'José'});
        biblioteca.removerMembro(2)
        expect(biblioteca.membros).toHaveLength(1);
    });

    test('Buscando membro por ID', () => {
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.adicionarMembro({id: 2, nome: 'José'});
        const membroEncontrado = biblioteca.buscarMembroPorId(1);
        expect(membroEncontrado).toEqual({id: 1, nome: 'Bruno'});
    });

    test('Buscar todos os membros', () => {
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.adicionarMembro({id: 2, nome: 'José'});
        expect(biblioteca.listarMembros()).toHaveLength(2);
    });

    test('Emprestando um livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.emprestarLivro(1, 1);
    });

    test('Emprestando um livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        expect(biblioteca.emprestarLivro(1,1)).toBe(true);
        expect(biblioteca.emprestarLivro(2,2)).toBe(false);
    });

    test('Devolver livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarMembro({id: 1, nome: 'Bruno'});
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.devolverLivro(1)).toBe(true);
        expect(biblioteca.devolverLivro(2)).toBe(false);
        
    });

    test('Listar livros emprestados', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        biblioteca.adicionarMembro({ id: 1, nome: 'Bruno' });
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosEmprestados()).toEqual([{ id: 1, titulo: 'Fortaleza Digital', emprestado: true, idMembro: 1}]);
    });

    test('Listar livros disponíveis', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        biblioteca.adicionarMembro({ id: 1, nome: 'Bruno' });
        biblioteca.emprestarLivro(1, 1);
        expect(biblioteca.listarLivrosDisponiveis()).toEqual([{ id: 2, titulo: 'O Código Da Vinci' }]);
    });

    test('Contar livros', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci' });
        expect(biblioteca.contarLivros()).toBe(2);
    });

    test('Contar membros', () => {
        biblioteca.adicionarMembro({ id: 1, nome: 'Bruno' });
        biblioteca.adicionarMembro({ id: 2, nome: 'José' });
        expect(biblioteca.contarMembros()).toBe(2);
    });

    test('Listar livros por autor', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' });
        expect(biblioteca.listarLivrosPorAutor('Dan Brown')).toEqual([
            { id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown' },
            { id: 2, titulo: 'O Código Da Vinci', autor: 'Dan Brown' }
        ]);
    });

    test('Listar livros por gênero', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', genero: 'Suspense' });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci', genero: 'Suspense' });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal', genero: 'Fantasia' });
        expect(biblioteca.listarLivrosPorGenero('Suspense')).toEqual([
            { id: 1, titulo: 'Fortaleza Digital', genero: 'Suspense' },
            { id: 2, titulo: 'O Código Da Vinci', genero: 'Suspense' }
        ]);
    });

    test('Atualizar informação do livro', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown' });
        biblioteca.atualizarInformacaoLivro(1, { autor: 'Dan Brown', ano: 1998 });
        const livroAtualizado = biblioteca.buscarLivroPorId(1);
        expect(livroAtualizado).toEqual({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown', ano: 1998 });
    });
    
    test('Atualizar informação de um livro que não existe', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', autor: 'Dan Brown' });
        expect(biblioteca.atualizarInformacaoLivro(2, { autor: 'Dan Brown', ano: 2000 })).toBeUndefined();
    });

    test('Listar livros por ano', () => {
        biblioteca.adicionarLivro({ id: 1, titulo: 'Fortaleza Digital', ano: 1998 });
        biblioteca.adicionarLivro({ id: 2, titulo: 'O Código Da Vinci', ano: 2003 });
        biblioteca.adicionarLivro({ id: 3, titulo: 'Harry Potter e a Pedra Filosofal', ano: 1997 });
        expect(biblioteca.listarLivrosPorAno(1998)).toEqual([{ id: 1, titulo: 'Fortaleza Digital', ano: 1998 }]);
    });


});