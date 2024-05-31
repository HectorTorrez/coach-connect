import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes";

export default function AuthProvider({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: dark,
        elements: {
          footer: "dark:bg-[#030711]",
        },
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
