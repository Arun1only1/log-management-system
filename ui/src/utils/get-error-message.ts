import { AxiosError } from "axios";
import { IError } from "@/interface";
import { RES_MSG } from "@/constants";

export const extractErrorMessage = (error: AxiosError<IError>): string => {
  return (
    error.response?.data?.errors?.[0]?.message ||
    error.response?.data?.message ||
    error.message ||
    RES_MSG.SOMETHING_WENT_WRONG
  );
};
