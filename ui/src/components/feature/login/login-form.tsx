import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useLogin } from "@/api/hooks/auth/use-login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginFormSchema,
  type LoginFormType,
} from "@/schema/login-user.schema";
import { useAppDispatch } from "@/store/hooks";
import { setToken, setUserDetails } from "@/store/slices/auth-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutate } = useLogin();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // form
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form on submit
  const onSubmit = async (data: LoginFormType) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("Login successful.");
        const accessToken = res.accessTokenAndExpiry.token;
        const role = res.user.role;

        const user = res.user;

        dispatch(setToken(accessToken));
        dispatch(setUserDetails(user));

        navigate(
          role === "admin"
            ? ROUTES.DASHBOARD
            : role === "nginx"
            ? ROUTES.NGINX
            : ROUTES.APACHE
        );
      },
      onError: (error) => {
        console.log({ error });
        toast.error(error);
      },
    });
  };

  return (
    <Card className="w-full max-w-md border-violet-300 shadow-lg bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-violet-800 text-center">
          Welcome Back
        </CardTitle>
        <p className="text-center text-violet-600 text-sm mt-1">
          Sign in to access your account
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit as SubmitHandler<LoginFormType>
            )}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-violet-800 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-500" />
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        autoComplete="email"
                        className="border-violet-300 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-violet-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="text-violet-800 font-medium">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-500" />
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="border-violet-300 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-violet-600 hover:text-violet-800 hover:bg-violet-50"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-violet-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-violet-600 text-white hover:bg-violet-700 cursor-pointer focus:ring-violet-500 transition-colors duration-200"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-center text-sm">
          <p className="text-violet-600">
            {"Don't have an account?"}
            <a
              href="#"
              className="font-medium text-violet-600 hover:text-violet-800 hover:underline transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
