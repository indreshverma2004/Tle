import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import AddYoutube from '../pages/AddYoutube.tsx';

interface LoginFormData {
  email: string;
  password: string;
}

const saveContestsToStorage = (token) => {
  try {
    localStorage.setItem("token", JSON.stringify(token));
    return true;
  } catch (err) {
    console.error("Error saving contests to storage:", err);
    return false;
  }
};

const Login = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      navigate("/addyoutube");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        props.setToken(data.authToken);
        saveContestsToStorage(data.authToken);
        navigate("/contests");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600 p-4 text-white">
      <Card className="w-full max-w-md animate-fade-in shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-2 rounded-full bg-yellow-400 text-gray-900">
              <LogIn size={28} />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="pl-10 bg-gray-800 text-white border-gray-600 focus:border-yellow-400" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="pl-10 bg-gray-800 text-white border-gray-600 focus:border-yellow-400" />
            </div>
            <Button type="submit" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            Don't have an account? <Link to="/signup" className="text-yellow-400 hover:text-yellow-500">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
