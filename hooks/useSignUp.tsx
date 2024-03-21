import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "@/utils/userSignup";
import { userSignUpData } from "@/utils/userSignup";
import { useRouter } from "next/navigation";

export function useSignUp() {
  const router = useRouter();

  const { isPending, mutate: userSignUpFn } = useMutation({
    mutationFn: ({ email, password }: userSignUpData) =>
    userSignUp({ email, password }, router),

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (data) => {
      console.log(data);
    },
  });

  return { isPending, userSignUpFn };
}
