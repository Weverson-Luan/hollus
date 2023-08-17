import { Alert } from "react-native";
import { IUserTherapists } from "../../../dtos/therepies-user-dto";
import { Api } from "../../../services/api";

export const makeAppointment = async (
  date: string,
  time: string,
  therapist: IUserTherapists,
  category_id: ICategories
) => {
  const dateTime = new Date(time);
  const [day, month, year] = date.split("/");
  const appointmentDate = new Date(
    +year,
    +month - 1,
    +day,
    dateTime.getHours() -3,
    dateTime.getMinutes()
  );
  const appointmentDateFormatted = appointmentDate
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "-")
    .replace("T", " ");



  const res = await Api.post("/v1/consulta/agendar", {
    data_hora: appointmentDateFormatted,
    usuario_terapeuta_id: therapist.id,
    categoria_id: category_id,
  });
  return res.data;
};

export const changeAppointment = async (
  date: Date,
  appointmentId: number,
  therapistId: number,
  categoryId: number
) => {
  const res = await Api.post("/v1/consulta/agendar", {
    data_hora: date,
    id: appointmentId,
    usuario_terapeuta_id: therapistId,
    categoria_id: categoryId,
  });
  // console.log(res.data);
  return res.data;
};

export const getAppointment = async (id: number) => {
  const res = await Api.get("/v1/consulta/info/" + id);
  return res.data;
};

export const cancelAppointment = async (id: number) => {
  const res = await Api.delete("/v1/consulta/cancelar/" + id);
  return res.data;
};

export const getAppointmentHistory = async () => {
  const res = await Api.get("/v1/consulta/historico/");
  // console.log(res.data);
  return res.data;
};
export const getNextAppointments = async () => {
  const res = await Api.get("/v1/consulta/proximas/");
  // console.log(res.data);
  return res.data;
};
