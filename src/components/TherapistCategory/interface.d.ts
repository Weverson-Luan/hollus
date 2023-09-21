/**
 * IMPORTS
 */

interface ITherapistCategoryProps {
  data: {
    categoria: {
      created_at: string;
      deleted_at: string;
      descricao: string;
      foto: string;
      id: number;
      link_foto: string;
      nome: string;
      updated_at: string;
    };
    terapeuta_categoria_id: any;
    categoria_id: number;
    created_at: string;
    descricao: string;
    horarios: {
      created_at: string;
      deleted_at: string;
      dia_semana: string;
      horario_fim: string;
      horario_inicio: string;
      id: number;
      terapeuta_categoria_id: number;
      updated_at: string;
    }[];
    id: number;
    tempo: number;
    updated_at: string;
    usuario_id: number;
    valor: number;
  };
  refresh: ()=> void;
  onPress: ()=> void;
}
/**
 * EXPORTS
 */
export {
  ITherapistCategoryProps
}