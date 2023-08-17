/**
 * IMPORTS
 */
interface ITherapies {
    id: string;
    name_therapies: string;
    image_therapies: string;
    data_created: string;
    therapies: [
      {
        name_therapies: string;
        image_therapies: string;
        data_created: string;
      },
 
    ]
}

/**
 * EXPORTS
 */
export { ITherapies };
