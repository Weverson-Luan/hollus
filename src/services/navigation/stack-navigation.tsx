import { AuthenticateBottomTabsNavigation } from "../../routes/routes.BottomTabs";
import { DrawerNavigation } from "../../routes/routes.Drawer";
import { ChatList } from "../../screens/BottomTabs/ChatList";
import { Addresses } from "../../screens/StackNavigation/Addresses";
import { AppointmentClient } from "../../screens/StackNavigation/Appointment/Client";
import { Cart } from "../../screens/StackNavigation/Cart";
import { EditProfileClient } from "../../screens/StackNavigation/EditProfile/Client";
import { FaleConosco } from "../../screens/StackNavigation/FaleConosco";
import { Filter } from "../../screens/StackNavigation/Filter";
import { FilterProducts } from "../../screens/StackNavigation/FilterProducts";
import { FormPayment } from "../../screens/StackNavigation/FormPayment";
import { PaymentInfo } from "../../screens/StackNavigation/PaymentInfo";
import { ProductSelected } from "../../screens/StackNavigation/ProductSelected";
import { Register } from "../../screens/StackNavigation/Register";
import { ResumeRequest } from "../../screens/StackNavigation/ResumeRequest";
import {
  ScheduleAppointment1,
  ScheduleAppointment2,
  ScheduleAppointment3,
  ScheduleAppointment4,
} from "../../screens/StackNavigation/ScheduleAppointment";
import { ScheduleConsultation } from "../../screens/StackNavigation/ScheduleConsultation";
import { SignIn } from "../../screens/StackNavigation/SignIn";
import { Therapist } from "../../screens/StackNavigation/Therapist";

export const stackNavigationList = [
  // {
  //   id: 5,
  //   name: "ChatList",
  //   component: ChatList,
  //   header: "Chat",
  // },
  // {
  //   id: 11,
  //   name: "Enderecos",
  //   component: Addresses,
  //   header: "Meus Endereços",
  // },
  // {
  //   id: 12,
  //   name: "PaymentInfo",
  //   component: PaymentInfo,
  //   header: "Info. de Pagamento",
  // },
  // {
  //   id: 14,
  //   name: "FormPayment",
  //   component: FormPayment,
  //   header: "Pagamento",
  // },
  // {
  //   id: 17,
  //   name: "EditProfile",
  //   component: EditProfileClient,
  //   header: "Editar Perfil",
  // },
  {
    id: 18,
    name: "Therapist",
    component: Therapist,
    header: "Terapeuta",
  },
  {
    id: 19,
    name: "Appointment",
    component: AppointmentClient,
    header: "Consulta",
  },
  {
    id: 20,
    name: "ScheduleConsultation",
    component: ScheduleConsultation,
    header: "Agendar Consulta",
  },
  {
    id: 21,
    name: "ProductSelected",
    component: ProductSelected,
    header: "Loja",
  },
  // {
  //   id: 22,
  //   name: "SignIn",
  //   component: SignIn,
  //   header: "",
  // },
  // {
  //   id: 25,
  //   name: "Register",
  //   component: Register,
  //   header: "Cadastro",
  // },
  // {
  //   id: 26,
  //   name: "AuthenticateBottomTabsNavigation",
  //   component: AuthenticateBottomTabsNavigation,
  //   header: "",
  // },
  {
    id: 27,
    name: "Filter",
    component: Filter,
    header: "Filtros de busca",
  },
  {
    id: 28,
    name: "FilterProducts",
    component: FilterProducts,
    header: "Filtros",
  },
  {
    id: 29,
    name: "ShoppingCart",
    component: Cart,
    header: "Cesta de Compras",
  },
  {
    id: 30,
    name: "ResumeRequest",
    component: ResumeRequest,
    header: "Cesta de Compras",
  },
  {
    id: 31,
    name: "FaleConosco",
    component: FaleConosco,
    header: "",
  },
  {
    id: 32,
    name: "ScheduleAppointment1",
    component: ScheduleAppointment1,
    header: "Agendar Consulta",
  },
  {
    id: 33,
    name: "ScheduleAppointment2",
    component: ScheduleAppointment2,
    header: "Agendar Consulta",
  },
  {
    id: 34,
    name: "ScheduleAppointment3",
    component: ScheduleAppointment3,
    header: "Agendar Consulta",
  },
  {
    id: 35,
    name: "ScheduleAppointment4",
    component: ScheduleAppointment4,
    header: "Confirmar Consulta",
  },
];
