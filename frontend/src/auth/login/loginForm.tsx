import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type userFormData } from "@/constants/userTemplates";
import { useLoginHook } from "@/hooks/queryHooks/auth/loginHook";
import { useAuth } from "@/context/AuthContext/useAuth";
import { toast } from "sonner";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const loginMutate = useLoginHook();
  const form = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: userFormData) => {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);

    loginMutate.mutate(formData, {
      onSuccess: (data) => {
        login(data.access_token);
      },
      onError: () => {
        toast("Wrong credentials", {
          description: "User does not exist or password does not match",
        });
      },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 max-w-xl m-auto translate-y-1/2",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormField<userFormData>
                name="username"
                control={form.control}
                label="username"
                placeholder="your username"
                type="text"
              />
              <FormField<userFormData>
                name="password"
                control={form.control}
                label="password"
                placeholder="password"
                type="password"
              />
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
