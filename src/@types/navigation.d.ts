import { StackParamsList } from "../routes/routes";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {
      Home: undefined
      SignIn: undefined;
      ForgotPassword: undefined;
      Register: undefined;
      RegisterSeptOne: any;
      RegisterTherapist: any
      ConsultasTherapist: any;
      GerenciarConsultas: any;

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
      HomeAuth: undefined;
      Consultas: undefined;
      HomeTherapist: undefined;
    }
  }
}