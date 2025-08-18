import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { Problem } from "@/configurations/react-query/http-error.interface";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {},
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      showNotifications(error as Problem);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export interface Notification {
  id: string;
  duration?: number;
  message: string;
  type: NotificationType;
}

export type NotificationType = "success" | "error" | "info" | "warning";

const showNotifications = (problem: Problem) => {
  const notifications: Omit<Notification, "id">[] = [];
  if (problem?.errors) {
    Object.values(problem.errors).forEach((values) =>
      values.forEach((errorMessage) =>
        notifications.push({
          message: errorMessage,
          type: "error",
        })
      )
    );
  } else if (problem?.detail) {
    notifications.push({
      message: problem.detail,
      type: "error",
    });
  }
  //   showNotification(notifications);
};