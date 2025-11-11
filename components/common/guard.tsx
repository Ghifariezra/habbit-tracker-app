import "@/app/global.css";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import { type PropsWithChildren } from "react";

export function RouteGuard({ children }: PropsWithChildren) {
  const { isLoadingUser} = useRouteGuard();

  return !isLoadingUser ? <>{children}</> : null;
}