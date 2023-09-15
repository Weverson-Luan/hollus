const navigationListClient = [
  {
    id: "1",
    name: "Editar perfil",
    name_Icon: "pencil",
    route: 'EditProfile'
  },
  {
    id: "7",
    name: "Chat",
    name_Icon: "comment",
    route: 'ChatList'
  },
  // {
  //   id: "2",
  //   name: "Meus pedidos",
  //   name_Icon: "shopping-bag",
  // },
  // {
  //   id: "3",
  //   name: "Favoritos",
  //   name_Icon: "heart",
  // },
  {
    id: "4",
    name: "Endereços",
    name_Icon: "home",
    route: 'Enderecos'
  },
  {
    id: "5",
    name: "Formas de pagamento",
    name_Icon: "credit-card",
    route: 'PaymentInfo',
  },
  {
    id: "6",
    name: "Histórico de consultas",
    name_Icon: "history",
    route: 'Consultas'
  },
  {
    id: "8",
    name: "Fale conosco",
    name_Icon: "wechat",
    route: 'FaleConosco'
  },
];
const navigationListTherapist = [
  {
    id: "1",
    name: "Editar perfil",
    name_Icon: "pencil",
    route: 'EditProfile'
  },
  {
    id: "3",
    name: "Gerenciar horários",
    name_Icon: "calendar",
    route: 'GerenciarConsultas'
  },
  {
    id: "4",
    name: "Histórico de consultas",
    name_Icon: "history",
    route: 'Consultas'
  },
  {
    id: "7",
    name: "Fale conosco",
    name_Icon: "wechat",
    route: 'FaleConosco'
  },
];
/**
 * EXPORTS
 */
export { navigationListClient, navigationListTherapist };
