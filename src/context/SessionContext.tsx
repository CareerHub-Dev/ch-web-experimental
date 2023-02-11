import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { type SessionData } from "@/services/account/account-schemas";
import { useLocalStorage } from "usehooks-ts";
import {
  authenticate,
  refreshToken as requestRefreshToken,
} from "@/services/account/account-service";

type SessionContextState =
  | {
      status: "loading";
      data: null;
    }
  | {
      status: "unauthenticated";
      data: null;
    }
  | {
      status: "authenticated";
      data: SessionData;
    };

type SessionContextAction =
  | { type: "UPDATE"; data: SessionData }
  | { type: "RESET" };

type SessionContextData = SessionContextState & {
  logout: () => void;
  login: (session: SessionData) => void;
  refreshToken: () => void;
  refreshTokenAsync: () => Promise<SessionData>;
};

const sessionContextInitialState: SessionContextState = {
  status: "loading",
  data: null,
};

export const SessionContext = createContext<SessionContextData>({
  ...sessionContextInitialState,
  logout: () => {},
  login: () => {},
  refreshToken: () => {},
  refreshTokenAsync: () => new Promise(() => {}),
});

function sessionStateReducer(
  state: SessionContextState,
  action: SessionContextAction,
): SessionContextState {
  switch (action.type) {
    case "UPDATE":
      return {
        status: "authenticated",
        data: action.data,
      };
    case "RESET":
      return {
        status: "unauthenticated",
        data: null,
      };
    default:
      return { ...state };
  }
}

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    sessionStateReducer,
    sessionContextInitialState,
  );

  const [storedSessionData, setStoredSessionData] =
    useLocalStorage<SessionData | null>("ch-session", null);

  const refreshTokenMutation = useMutation(
    ["refresh-token"],
    requestRefreshToken,
    {
      onSuccess(data) {
        setStoredSessionData(data);
        dispatch({ type: "UPDATE", data });
      },
      onError() {
        setStoredSessionData(null);
        dispatch({ type: "RESET" });
      },
    },
  );

  const logout = () => {
    setStoredSessionData(null);
    dispatch({ type: "RESET" });
  };

  const refreshToken = () => {
    if (state.data?.refreshToken) {
      refreshTokenMutation.mutate(state.data.refreshToken);
    }
  };

  const refreshTokenAsync = () => {
    return refreshTokenMutation.mutateAsync(state.data?.refreshToken ?? "");
  };

  const login = (data: SessionData) => {
    dispatch({ type: "UPDATE", data });
  };

  const contextValue: SessionContextData = {
    ...state,
    logout,
    login,
    refreshToken,
    refreshTokenAsync,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
