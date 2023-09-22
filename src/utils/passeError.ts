/**
 * IMPORTS
 */

const handleParseErrors = (errors: any) => {
 if(errors){
  const errArr = Object.values(errors).map(err => err);
  //@ts-ignore
  return errArr[0][0];
 }else{
  return
 }
};

/**
 * EXPORTS
 */
export {
  handleParseErrors
}