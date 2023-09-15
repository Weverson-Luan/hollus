/**
 * IMPORTS
 */

type IAssestsProps = {
  fileName: string;
  fileSize: number;
  width: number;
  height: number;
  type: string;
  uri: string;
};
type IResponseImageSelected = {
  assets: IAssestsProps[];
  didCancel: boolean;
};


/**
 * EXPORTS
 */
export {
  IAssestsProps,
  IResponseImageSelected
}