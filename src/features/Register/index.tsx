import { registerUser } from "@/services/api/auth.service";
import { AuthForm } from "@/shared/components/AuthForm";
import { AuthFormMode } from "@/shared/types/AuthForm";

export const Register = () => (
  <div className="flex items-center justify-center grow-1">
    <AuthForm
      mode={AuthFormMode.REGISTER}
      onSubmit={async ({ username, password }) => {
        const token = await registerUser({ username, password });

        return token;
      }}
    />
  </div>
);
