import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref({});
  const isAuthenticated = ref(false);

  function setAuth(authUser) {
    isAuthenticated.value = true;
    console.log(authUser, isAuthenticated.value);
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
  }

  function setError(error) {
    if (typeof error === 'string') {
      errors.value = { general: [error] };
    } else {
      errors.value = { ...error };
    }  
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {};
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials) {
    return ApiService.post("http://localhost:8080/login/login", credentials)
      .then(({ data }) => {
        if (data) {
          setAuth(data);
        } else {
          return Promise.reject(new Error("Usuario no encontrado"));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Usuario no encontrado");
        } else if (error.response && error.response.data && error.response.data.errors) {
          setError(error.response.data.errors);
        } else {
          setError("Error de inicio de sesión");
        }
        return Promise.reject(error); // Rechazar la promesa con el error
      });
  }

  function logout() {
    purgeAuth();
    return ApiService.post("logout");
  }

  function register(credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});