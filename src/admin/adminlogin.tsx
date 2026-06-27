import { signInWithPopup } from "firebase/auth";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_EMAIL } from "@/lib/google-auth";
import { auth, provider } from "../firebase";

export function AdminLogin() {
  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email?.toLowerCase();

    if (email === ADMIN_EMAIL) {
      window.localStorage.setItem("admin", "true");
      window.alert("Admin login successful");
      return;
    }

    window.alert("You are not admin");
    await auth.signOut();
  };

  return (
    <Button type="button" onClick={login}>
      <LogIn className="h-4 w-4" />
      Admin login
    </Button>
  );
}
