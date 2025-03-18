import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Lock, Phone, UserPlus, AlertCircle } from "lucide-react";

interface UserType {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

const saveContestsToStorage = (token: string) => {
  try {
    localStorage.setItem("token", JSON.stringify(token));
    return true;
  } catch (err) {
    console.error("Error saving contests to storage:", err);
    return false;
  }
};

const Signup = (props: { setToken: (token: string) => void }) => {
  const [formData, setFormData] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        props.setToken(data.authToken);
        saveContestsToStorage(data.authToken);
        navigate("/contests");
      } else {
        setError(data.message || "Signup failed. Please try again.");
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
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-yellow-400 text-gray-900">
              <UserPlus size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Join us and participate in coding contests!</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "password", "mobile"].map((field, idx) => (
              <div key={idx} className="space-y-2">
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <div className="relative">
                  {field === 'name' && <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />}
                  {field === 'email' && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />}
                  {field === 'password' && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />}
                  {field === 'mobile' && <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />}
                  <Input
                    id={field}
                    name={field}
                    value={formData[field as keyof UserType]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    required
                    className="pl-10 bg-gray-800 text-white border-gray-600 focus:border-yellow-400"
                    type={field === 'password' ? 'password' : 'text'}
                  />
                </div>
              </div>
            ))}
            <Button type="submit" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-yellow-400 hover:text-yellow-500">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
