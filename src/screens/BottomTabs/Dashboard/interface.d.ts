/**
 * IMPORTS
 */

/**
 * ATENDIMENTO
 */
interface IResponseApiAtendimentos {
  data: {
    agendamentos_cancelados: number;
    agendamentos_concluidos: number;
    quantidade_agendamentos: number;
  };
}

interface IAtendimentosProps {
  agendamentos_cancelados: number;
  agendamentos_concluidos: number;
  quantidade_agendamentos: number;
}

/**
 * CONSULTAS
 */
interface ITerapeutasProps {
  endereco_completo: string;
  id: number;
  link_foto: string;
  link_foto_documento: string;
  nome: string;
  pivot: {
    categoria_id: number;
    descricao: number;
    tempo: number;
    usuario_id: number;
    valor: number;
  };
}

interface ICategoryProps {
  id: number;
  link_foto: string;
  nome: string;
  terapeutas: ITerapeutasProps[];
}

interface IResponseApiConsulta {
  data: {
    categorias: ICategoryProps[];
  };
}

interface IConsultaProps {
  categorias: ICategoryProps[];
}

/***
 * ESPAÇOS
 */
interface IResponseApiSpacos {
  data: {
    empresas: any[];
  };
}

interface ISpacosProps {
  empresas: any[];
}

/**
 * EXPORTS
 */
export {
  // tipagem resposta da api
  IResponseApiAtendimentos,
  // tipagem estado do react
  IAtendimentosProps,
  // tipagem resposta da api
  IResponseApiConsulta,
  // tipagem estado do react
  IConsultaProps,
  // tipagem resposta da api
  IResponseApiSpacos,
  // tipagem estado do react
  ISpacosProps
}