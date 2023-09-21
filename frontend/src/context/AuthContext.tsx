// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";
import toast from "react-hot-toast";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

// ** Auth Imports
import { createClient } from "@supabase/supabase-js";
import { isUndefined } from "util";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
      if (user && storedToken) {
        setLoading(true);
        var userInfo = {
          id: user?.id || "",
          role: "",
          email: user?.email || "aa@gmail.com",
          avatar: null,
        };
        if (userInfo.email === "agbangera_b20@ce.vjti.ac.in") {
          userInfo.role = "admin";
        } else {
          userInfo.role = "client";
        }
        setUser(userInfo);
        setLoading(false);
      } else if (!storedToken) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (!data) {
      toast.error("Invalid Credentials", { position: "top-right" });
    } else {
      const returnUrl = router.query.returnUrl;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      var userInfo = {
        id: user?.id || "",
        role: "",
        email: user?.email || "aa@gmail.com",
        avatar: null,
      };
      if (userInfo.email !== "aa@gmail.com") {
        if (userInfo.email === "agbangera_b20@ce.vjti.ac.in") {
          userInfo.role = "admin";
        } else {
          userInfo.role = "client";
        }
        setUser(userInfo);
        console.log(userInfo);
        params.rememberMe
          ? window.localStorage.setItem("userData", JSON.stringify(userInfo))
          : null;
        console.log(error);
        console.log("***************************");
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
      } else {
        if (router.asPath != "/register") {
          toast.error("Invalid Credentials", { position: "top-right" });
        } else {
          router.replace("/login");
        }
        if (errorCallback) errorCallback(error.message);
      }
    }
  };

  const handleLogout = async () => {
    setUser(null);
    
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    let { error } = await supabase.auth.signOut();
    router.push("/login");
  };

  const handleRegister = async (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    // console.log(data);

    let { data2, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    console.log();
    console.log("********************");
    if (error) {
      if (errorCallback) errorCallback(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      toast.success("Please check your email to verify your account");
      
    }
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
