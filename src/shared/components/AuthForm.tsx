import { useState } from "react";
import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  type AuthFormData,
  type User,
} from "../schemas/auth";
import { AuthFormMode, type ValidationErrors } from "../types/AuthForm";
import { LocalStorageKeys } from "../constants/localStorageKeys";
import { useNavigate } from "@tanstack/react-router";

export type AuthFormProps = {
  mode: AuthFormMode;
  onSubmit: ({
    username,
    password,
  }: AuthFormData) => Promise<{ token: string; user: User }>;
  isLoading?: boolean;
  error?: string;
};

export const AuthForm = ({
  mode,
  onSubmit,
  isLoading = false,
  error,
}: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const navigate = useNavigate({
    from: mode === AuthFormMode.REGISTER ? "/auth/register" : "/auth/login",
  });

  const navigateToRoot = () => navigate({ to: "/", reloadDocument: true });

  if (localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)) navigateToRoot();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDataValid = loginSchema.parse(formData);

    if (!isDataValid) {
      const errors: ValidationErrors = {};
      try {
        if (mode === AuthFormMode.LOGIN) {
          loginSchema.parse(formData);
        } else {
          registerSchema.parse(formData);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            errors[err.path[0] as keyof ValidationErrors] = err.message;
          });
        }
      }
      setValidationErrors(errors);
      return;
    }

    try {
      const res = await onSubmit(formData);

      localStorage.setItem(
        LocalStorageKeys.ACCESS_TOKEN,
        JSON.stringify(res.token)
      );

      localStorage.setItem(
        LocalStorageKeys.USER_ID,
        JSON.stringify(res.user._id)
      );
      console.log(res);
      navigateToRoot();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-full max-w-md space-y-4 pt-[24px]"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-[12px] px-[16px]"
          placeholder="Enter your username"
        />
        {validationErrors.username && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.username}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-[12px] px-[16px]"
          placeholder="Enter your password"
        />
        {validationErrors.password && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.password}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};
