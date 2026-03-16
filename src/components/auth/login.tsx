import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";


// Optional: if you have sonner installed → better than alert
// import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      // toast.error("Please enter email and password") or:
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login DATA:", data);
      console.log("Login ERROR:", error);

      if (error) {
        throw error;
      }

      // Success
      // toast.success("Login successful!") or:
      alert("Login Successful!");

      // Redirect to dashboard or home
      navigate("/", { replace: true });

    } catch (error: any) {
      console.error("Login failed:", error);
      // toast.error(error.message || "Login failed") or:
      alert(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      alert(error.message || "Google login failed");
      console.error("Google OAuth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      alert(error.message || "GitHub login failed");
      console.error("GitHub OAuth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          {/* Header */}
          <CardHeader className="space-y-4 pb-6 items-center">
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="Sarkari Runner Logo"
                className="w-28 h-28 object-contain mx-auto"
              />
            </div>

            <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>

            <p className="text-center text-sm text-gray-600">
              Enter your credentials to continue
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@sarkarirunner.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    disabled={loading}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>

                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  Google
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGithubLogin}
                  disabled={loading}
                >
                  GitHub
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Privacy */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}