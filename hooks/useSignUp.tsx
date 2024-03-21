import { useMutation } from "@tanstack/react-query";
import { userSignup } from "@/utils/userSignup";
import { userSignupData } from "@/utils/userSignup";
import { useRouter } from "next/navigation";

export function useSignup() {
  const router = useRouter();

  const { isPending, mutate: userSignupFn } = useMutation({
    mutationFn: ({ email, password }: userSignupData) =>
      userSignup({ email, password }, router),

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (data) => {
      console.log(data);
    },
  });

  return { isPending, userSignupFn };
}
