import axiosInstance from "@/services/axios";
import { ILoginResponse } from "@/interface";
import { LoginFormType } from "@/schema/login-user.schema";
import { loginUrl } from "@/api/url/auth";

export const loginUser = async (
  data: LoginFormType
): Promise<ILoginResponse> => {
  const res = await axiosInstance.post(loginUrl, data);

  return res.data;
};
