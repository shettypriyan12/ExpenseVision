
import "./globals.css";
import Providers from "./utils/provider";


export const metadata = {
  title: {
    default: "Expense Vision"
  },
  description: "Track your expenses smartly",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fredoka:wght@300..700&display=swap" rel="stylesheet"></link>
        </head>
        <body>
          <Providers>
            {children}
          </Providers>

        </body>
      </html>
    </>
  );
}
