import { loginUser } from "@/services/api/auth.service";
import { AuthForm } from "@/shared/components/AuthForm";
import { AuthFormMode } from "@/shared/types/AuthForm";

export const Login = () => (
  <div className="flex items-center justify-center grow-1">
    <AuthForm
      mode={AuthFormMode.LOGIN}
      onSubmit={async ({ username, password }) => {
        const token = await loginUser({ username, password });

        return token;
      }}
    />
  </div>
);
