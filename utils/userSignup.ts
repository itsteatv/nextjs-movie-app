import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export type userSignupData = {
    email: string;
    password: string;
}

export const userSignup = async ({ email, password }: userSignupData, router: AppRouterInstance) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch("api/signup", requestOptions);

        if (response.status === 400) {
            toast.error("The email is already registered")
        }

        if (response.status === 200) {
            toast.success("You successfully signed up")
            router.push("/signin")
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}
