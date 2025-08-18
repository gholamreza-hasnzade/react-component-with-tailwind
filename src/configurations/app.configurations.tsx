import type { FC } from "react";
import type { IAppConfigurations } from "@/configurations/app.configurations.interface";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/configurations/react-query/react-query-provider";
import "@/configurations/i18next/locales/i18n";
import "@/assets/fonts/fonts.css";

export const AppConfigurations: FC<IAppConfigurations> = ({ children }) => {
  return (
    <QueryProvider>
      <Toaster />
      {children}
    </QueryProvider>
  );
};
