"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/ui/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/ui/EyeSlashFilledIcon";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSignUp } from "@/hooks/useSignUp";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isPending, userSignUpFn } = useSignUp();
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/mylist");
    }
  }, [sessionStatus, router]);

  const isValidEmail = function (email: string) {
    const allowedEmailDomains = ["gmail.com", "yahoo.mail.com", "outlook.com"];
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return false;
    }

    const [, domain] = email.split("@");

    return allowedEmailDomains.some(
      (allowedDomain) => domain === allowedDomain
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      toast.error("Please enter both email and password", {
        icon: "🙄",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error(
        "Please use a valid email address from Gmail, Yahoo Mail, or Outlook",
        {
          icon: "🤔",
          duration: 10000,
        }
      );
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", { icon: "🧐" });
      return;
    }

    userSignUpFn({ email, password });
  };

  if (sessionStatus === "authenticated") {
    return (
      <Spinner
        className="flex items-center justify-center min-h-screen"
        size="lg"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col justify-center gap-4 min-h-screen font-SourceCodePro"
    >
      <h1 className="text-4xl font-extrabold">Sign Up</h1>
      <p className="text-[0.75rem] flex gap-x-2 text-gray-300">
        <Link
          href="/signin"
          className="italic duration-300 hover:text-blue-500 active:text-blue-500"
        >
          Sign In
        </Link>
        with an existing account
      </p>
      <div className="w-full max-w-[20rem]">
        <Input
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
        />
      </div>
      <div className="w-full max-w-[20rem]">
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </div>
      <Button type="submit" color="primary" variant="bordered">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
