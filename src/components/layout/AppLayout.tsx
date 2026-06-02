import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[720px] px-3 pb-[clamp(96px,19.7vw,142px)] pt-6">{children}</main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;