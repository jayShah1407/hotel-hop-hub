import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}