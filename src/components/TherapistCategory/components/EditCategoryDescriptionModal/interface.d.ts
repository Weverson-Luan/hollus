/**
 * IMPORTS
 */
import React from "react";


interface IDescriptionModalProps {
  /**
   * Propiedade que abre o modal para editar a descrição.
   */
  setOpenDescriptionModal: (value: boolean) => void;

  /**
   * Propiedade que diz se o  modal estar aberto ou fechado.
   */
  openDescriptionModal: boolean;

  data: any;

  setCategoriaDescricao: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Propiedade que informa a descrção
   */
  categoriaDescricao: string;
}

/**
 * EXPORTS
 */
export {
  IDescriptionModalProps
}