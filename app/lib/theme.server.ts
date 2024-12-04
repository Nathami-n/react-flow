
import { commitSession, getCurrentSession } from "./sessions.server";

const THEME_PREFERENCE_KEY = "theme";

export const createThemeCookie = async (request: Request, theme: string) => {
  const session = await getCurrentSession(request);
  session.set(THEME_PREFERENCE_KEY, theme);
  const headers = new Headers({
    "Set-Cookie": await commitSession(session),
  });
  return Response.json(
    { theme },
    {
      headers,
    }
  );
};

export const getThemeFromCookie = async (request: Request) => {
  const session = await getCurrentSession(request);
  const theme = session.get(THEME_PREFERENCE_KEY) || "system";
  return theme;
};
