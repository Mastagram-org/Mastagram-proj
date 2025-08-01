import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    try {
      setLoading(true);
      
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3500/api';
      
      window.location.assign(`${backendUrl}/auth/session`);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Authentication Error",
        description: "Unable to start authentication process",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Continue with your Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-half flex items-center justify-center gap-2 border-border hover:bg-accent/50"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="mt-6 text-center w-full">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-accent transition-colors font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;