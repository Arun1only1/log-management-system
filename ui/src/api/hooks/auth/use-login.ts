import { ILoginResponse } from "@/interface";
import { LoginFormType } from "@/schema/login-user.schema";
import { loginUser } from "@/api/function/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { isPending, mutate } = useMutation<
    ILoginResponse,
    string,
    LoginFormType
  >({
    mutationFn: loginUser,
  });

  return { isPending, mutate };
};
