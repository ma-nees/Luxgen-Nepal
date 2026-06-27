import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  type UserCredential,
} from "firebase/auth";
import { UserCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, provider } from "@/firebase";
import { isAdminEmail, useGoogleAuth } from "@/lib/google-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Login - LuxGen Nepal" }],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { ready, user, loginWithUser, logout } = useGoogleAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const requested = new URLSearchParams(window.location.search).get("redirect") || "/";
    return requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  }, []);

  const finishLogin = useCallback(
    async (result: UserCredential) => {
      const email = result.user.email;

      if (!email) {
        throw new Error("Google did not return an email address.");
      }

      loginWithUser({
        email,
        name: result.user.displayName || email.split("@")[0],
      });

      await navigate({
        to: isAdminEmail(email) ? "/admin" : redirectTo,
        replace: true,
      });
    },
    [loginWithUser, navigate, redirectTo],
  );

  useEffect(() => {
    let active = true;

    const completeRedirectLogin = async () => {
      setIsLoading(true);

      try {
        const result = await getRedirectResult(auth);
        if (active && result) {
          await finishLogin(result);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Google login failed. Try again.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void completeRedirectLogin();

    return () => {
      active = false;
    };
  }, [finishLogin]);

  const continueWithGoogle = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      await finishLogin(result);
    } catch (err) {
      const errorCode = typeof err === "object" && err && "code" in err ? String(err.code) : "";

      if (
        errorCode === "auth/popup-blocked" ||
        errorCode === "auth/operation-not-supported-in-this-environment"
      ) {
        await signInWithRedirect(auth, provider);
        return;
      }

      setError(err instanceof Error ? err.message : "Google login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <Card className="w-full max-w-md border border-border bg-white shadow-2xl sm:rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner">
            <UserCircle className="h-9 w-9" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to continue to LuxGen Nepal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!ready ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 p-4 text-sm font-medium text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking login...
            </div>
          ) : user ? (
            <div className="rounded-xl border border-border bg-muted/30 p-4 transition-all hover:bg-muted/50">
              <p className="text-sm font-semibold text-foreground">
                Signed in as <span className="font-normal text-muted-foreground">{user.email}</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="flex-1">
                  <Link to={isAdminEmail(user.email) ? "/admin" : redirectTo}>Continue</Link>
                </Button>
                <Button type="button" variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="button"
                onClick={continueWithGoogle}
                disabled={isLoading}
                className="relative h-11 w-full gap-2 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-display text-sm font-bold text-blue-600 shadow-sm">
                    G
                  </span>
                )}
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="underline underline-offset-2 hover:text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
          <span className="w-full">
            © {new Date().getFullYear()} LuxGen Nepal. All rights reserved.
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
