"use client";

import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/ui/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/ui/EyeSlashFilledIcon";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const session = useSession();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/mylist");
    }
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      if (res?.url) {
        router.replace("/mylist");
      }
    } else {
      return "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col justify-center gap-4 min-h-screen font-SourceCodePro"
    >
      <h1 className="text-4xl font-extrabold">Sign In</h1>
      <p className="text-xs flex gap-x-2">
        <Link
          href="/signup"
          className="italic duration-300 hover:text-blue-500 active:text-blue-500"
        >
          Sign Up
        </Link>
        to create a new account
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
        Sign In
      </Button>
      <span className="text-[0.75rem]">OR</span>
      <button
        onClick={() => {
          signIn("github");
        }}
        type="button"
        className="text-white duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Github
      </button>
    </form>
  );
};

export default SignIn;
