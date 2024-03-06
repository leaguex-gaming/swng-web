//provider.js
"use client";

import { WEB_CLIENT_ID } from "@/constants/StaticData";
import store from "@/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={WEB_CLIENT_ID}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  );
}
