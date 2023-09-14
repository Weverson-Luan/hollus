
import { ChatList } from "../../screens/BottomTabs/ChatList"
import { Addresses } from "../../screens/StackNavigation/Addresses"
import { EditProfileClient } from "../../screens/StackNavigation/EditProfile/Client"
import { Filter } from "../../screens/StackNavigation/Filter"
import { FormPayment } from "../../screens/StackNavigation/FormPayment"
import { PaymentInfo } from "../../screens/StackNavigation/PaymentInfo"
export const drawerNavigationList = [
    {
      id: 5,
      name: "ChatList",
      component: ChatList,
      header: "Chat"
    },
    // {
    //   id: 6,
    //   name: "Chat",
    //   component: Chat,
    //   header: "Chat"
    // },
    {
      id: 11,
      name: "Enderecos",
      component: Addresses,
      header: "Meus Endereços"
    },
    {
      id: 12,
      name: "PaymentInfo",
      component: PaymentInfo,
      header: "Info. de Pagamento"
    },
    {
      id: 14,
      name: "FormPayment",
      component: FormPayment,
      header: "Pagamento"
    },
    {
      id: 17,
      name: "EditProfile",
      component: EditProfileClient,
      header: "Editar Perfil"
    },
]