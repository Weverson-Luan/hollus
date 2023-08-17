/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IProducts {
  id: string;
  name: string;
  image: string;
  pont: number;
  price: number;
  space: string;
  products: [
    {
      id: string;
      name: string;
      image: string;
      pont: number;
      price: number;
      space: string;
    },
  ];
}
