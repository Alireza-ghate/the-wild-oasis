import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // sets some data manually into the cache
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: () => {
      // toast.error(err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLogin };
}
