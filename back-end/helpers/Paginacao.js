module.exports = {
paginar: function(dados, pagina, limite) {
  const totalRegistros = dados.length;
  const totalPaginas = Math.ceil(totalRegistros / limite);

  if (totalPaginas === 0) {
    throw new Error('Não há registros');
  } 
  
  if (pagina < 1 || pagina > totalPaginas) {
    throw new Error('Pagina inexistente');
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