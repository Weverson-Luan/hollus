// /* eslint-disable import/no-extraneous-dependencies */
// import { createServer } from 'miragejs';

// export default createServer({
//   routes() {
//     this.namespace = 'api';

//     this.get('/therapies', () => {
//       return {
//         therapies: [
//           {
//             id: ' 1',
//             name_therapies: 'Massagem Ayurverdica',
//             image_therapies: 'https://vittaespa.com.br/wp-content/uploads/2021/01/2-1-842x480.jpg',
//             data_created: '10/08/2022',
//           },
//           {
//             id: '2',
//             name_therapies: 'Massagem Shiatsu',
//             image_therapies:
//               'https://www.amita.com.br/media/product/e58/massagem-relaxante-classica-826.jpg',
//             data_created: '10/08/2022',
//           },
//           {
//             id: '3',
//             name_therapies: 'Massagem Terapia tântrica',
//             image_therapies:
//               'https://img-21.ccm2.net/h1qT7eGwGEAEV54bCRNaop9YTSc=/07ff0b87a3c8480cb50b68b3738d3848/ccm-faq/1522050.jpg',
//             data_created: '10/08/2022',
//           },
//           {
//             id: '4',
//             name_therapies: 'Massagem Massagem relaxante',
//             image_therapies:
//               'https://champi.com.br/wp-content/uploads/2020/04/2020-com-massagem-600x377-1.jpeg',
//             data_created: '10/08/2022',
//           },
//           {
//             id: '5',
//             name_therapies: 'Massagem Drenagem linfàtica',
//             image_therapies:
//               'https://image.winudf.com/v2/image1/Y3Vyc29kZW1hc2FqZXMuYXByZW5kZXJtYXNhamVzLm1hc2FqZXNfc2NyZWVuXzFfMTU4MDI1NjY5MF8wODU/screen-1.jpg?fakeurl=1&type=.jpg',
//             data_created: '10/08/2022',
//           },
//           {
//             id: '6',
//             name_therapies: 'Massagem Ayurveda',
//             image_therapies: 'http://www.belladona.pt/files/blp_53_g.jpg',
//             data_created: '10/08/2022',
//           },
//         ],
//       };
//     });

//     this.get('/therapists-users', () => {
//       return {
//         therapists: [
//           {
//             id: '1',
//             name: 'Gustavo Costa',
//             image_therapies: 'https://fbtc.org.br/assets/images/membros/Leandro-Feix.jpg',
//             date_scheduling: '10/08/2022',
//             hors: '18h',
//             pont: 5.1,
//             space: 'Espaço Terapeuta solar',
//           },
//           {
//             id: '2',
//             name: 'Marcos Luiz',
//             image_therapies:
//               'https://fbtc.org.br/assets/images/membros/Cristiano-Nabuco-de-Abreu.jpg',
//             date_scheduling: '21/05/2022',
//             hors: '16h',
//             pont: 4.1,
//             space: 'HighFive Terapeutas',
//           },
//           {
//             id: '4',
//             name: 'Marilia  Dolores',
//             image_therapies:
//               'https://fbtc.org.br/assets/images/membros/Neuraci-Gon%C3%A7alves-de-Araujo.jpg',
//             date_scheduling: '16/06/2022',
//             hors: '14h',
//             pont: 4.6,
//             space: 'Skynet Terapeutas',
//           },
//         ],
//         therapists_spotlight: [
//           {
//             id: '1',
//             name: 'Gustavo Costa',
//             image_therapies:
//               'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b0235e104821563.5f6b65f3ec12f.png',
//             date_scheduling: '10/08/2022',
//             hors: '18h',
//             pont: 5.1,
//             space: 'Espaço Terapeuta solar',
//           },
//           {
//             id: '2',
//             name: 'Espaço Instuito',
//             image_therapies:
//               'https://pbs.twimg.com/profile_images/1126225772119842818/ogJn0bXd_400x400.jpg',
//             date_scheduling: '21/05/2022',
//             hors: '16h',
//             pont: 4.1,
//             space: 'HighFive Terapeutas',
//           },
//         ],
//       };
//     });

//     this.get('/products', () => {
//       return {
//         products: [
//           {
//             id: 1,
//             image:
//               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p07TXw1Bt2rrjTF7_IdVwKIKG_3ZuBm9Bmso-YVGpmsOt_Jw-bMHOY8YZEagsN9CN_8&usqp=CAU',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 2,
//             image:
//               'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 3,
//             image:
//               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p07TXw1Bt2rrjTF7_IdVwKIKG_3ZuBm9Bmso-YVGpmsOt_Jw-bMHOY8YZEagsN9CN_8&usqp=CAU',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 4,
//             image:
//               'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 5,
//             image:
//               'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 6,
//             image:
//               'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//           {
//             id: 7,
//             image:
//               'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
//             space: 'Espaço Terapeuta Soluar',
//             name: 'Óleo Floral 50ml',
//             pont: 5.0,
//             price: 60,
//           },
//         ],
//       };
//     });
//   },
// });
