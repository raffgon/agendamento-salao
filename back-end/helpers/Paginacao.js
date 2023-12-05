module.exports = {
 paginar: function(dados, pagina, limite) {
    const totalRegistros = dados.length;
    const totalPaginas = Math.ceil(totalRegistros / limite);
  
    // Verifica se a página solicitada é válida
    if (pagina < 1 || pagina > totalPaginas) {
      throw new Error('Página inválida');
    }
  
    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite;
  
    const registrosPagina = dados.slice(inicio, fim);
  
    return {
      paginaAtual: pagina,
      totalPaginas,
      totalRegistros,
      registrosPagina,
    };
}
  
}