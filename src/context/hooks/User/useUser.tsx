import { Api } from "../../../services/api";

export const getMyInfo = async () => {
  const res = await Api.get("v1/user/my-info");
  return res.data;
};
export const saveMyInfo = async (
  userId: string,
  name?: string,
  email?: string,
  password?: string,
  rg?: string,
  cpf?: any,
  celular?: any
) => {
  const data = new FormData();
  data.append("nome", name);
  data.append("email", email);
  data.append("password", password);
  data.append("celular", celular);
  data.append("cpf", cpf);
  data.append("rg", rg);
  const res = await Api.post("v1/user/my-info", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res.data;
};
