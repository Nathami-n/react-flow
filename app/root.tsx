import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

import {
  getThemeFromCookie
} from "~/lib/theme.server"
import { ThemeProvider } from "~/components/theme-provider"


import { LinksFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import styles from "./tailwind.css?url"
import { useEffect } from "react";
import { Toaster } from "sonner";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },

]


export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const theme = await getThemeFromCookie(request);
  return Response.json({
    theme,
  });
};

export default function App() {
  const { theme = "system" } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const onThemeChange = (theme: string) => {
    fetcher.submit(
      { theme },
      {
        method: "post",
        encType: "application/json",
        action: "/api/toggleTheme",
      }
    )
  }
  return (
    <ThemeProvider defaultTheme={theme} onThemeChange={onThemeChange}>
      <html lang="en" className={theme ?? "theme"}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Toaster richColors/>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    if (isRouteErrorResponse(error) && error.status === 404) {
      navigate("not-found")
    }
  }, [])


  return (
    <div>
      {error instanceof Error ? (
        error.message
      ) : isRouteErrorResponse(error) ? error.statusText : "An unkwown error has occcurred"}
    </div>

  )
}

