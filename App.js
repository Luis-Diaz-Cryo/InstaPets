import React from "react";
import { AuthProvider } from "./src/context/AuthsContext.tsx";
import AppNavigation from "./src/routes/AppNavigation";

export default function App() {
  return (
      <AuthProvider>
          <AppNavigation />
      </AuthProvider>
  );
}
