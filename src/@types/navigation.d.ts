import { StackParamsList } from "../routes/routes";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {
      ForgotPassword: undefined;
      Register: undefined;

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
    }
  }
}