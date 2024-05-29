import type {Metadata} from "next";

import "./globals.css";
import AuthProvider from "@/auth/provider";
import {ThemeProvider} from "@/components/theme-provider";
import {Header} from "@/components/header/header";
import {SideNavMobile} from "@/components/side-nav/side-nav-mobile";
import {SideNav} from "@/components/side-nav/side-nav";
import ReactQueryProvider from "@/components/ReactQueryClientProvider";
import {MetricProvider} from "@/context/metric-context";

export const metadata: Metadata = {
  title: "coach-connect",
  description: "App for fitness trainers to manage clients and routines",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            <MetricProvider>
              <ThemeProvider
                disableTransitionOnChange
                enableSystem
                attribute="class"
                defaultTheme="system"
              >
                <main className="flex flex-col  lg:grid lg:grid-cols-[280px_1fr]">
                  <section className="flex ">
                    <section className="flex flex-col">
                      <div className="hidden lg:block">
                        <SideNav />
                      </div>
                    </section>
                  </section>

                  <section className="">
                    <section className="flex items-center ">
                      <div className="block  h-[60px] border-b lg:hidden">
                        <SideNavMobile />
                      </div>
                      <section className="w-full">
                        <Header />
                      </section>
                    </section>
                    <section className="px-4">{children}</section>
                  </section>
                </main>
              </ThemeProvider>
            </MetricProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
