/**
 * IMPORTS
 */

const handleReturnString = (value: string | number ) => {
  if(value){
    return value;
  }else{
    return "Sem informação"
  }
}

/**
 * EXPORTS
 */
export {
  handleReturnString
}