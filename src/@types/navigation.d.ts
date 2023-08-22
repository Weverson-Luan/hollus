import { StackParamsList } from "../routes/routes";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {
      ForgotPassword: undefined;
      Register: undefined;
      RegisterSeptOne: any;
      RegisterTherapist: any

      FilterProducts: {};
      ShoppingCart: {};
      ProductSelected: {
        item: any
      };
      FormPayment: {
        consulta_id: number | string;
      }
      ScheduleAppointmentTwo: {
        terapeuta: any;
        categoria: any;
      }
      RegisterTherapistStep2: undefined;
      HomeAuth: undefined
    }
  }
}