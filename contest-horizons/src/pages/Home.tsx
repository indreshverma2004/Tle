import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppNavbar from "@/components/AppNavbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-black">
      <AppNavbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-800 to-gray-600">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-yellow-400">
            TLE Eliminators
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-blue-400">
            Track <span className="text-yellow-400">Your Coding</span> Contests
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with all programming contests from Codeforces, LeetCode, and CodeChef in one place.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg" className="px-8 bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              <Link to="/contests">Browse Contests</Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="px-8 border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:text-yellow-500">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: "Codeforces", description: "Regular competitive programming contests" },
              { title: "LeetCode", description: "Weekly contests and biweekly contests" },
              { title: "CodeChef", description: "Long challenges and cook-offs" }
            ].map((platform, index) => (
              <Card key={index} className="text-center bg-gray-800 text-white hover:bg-gray-700 transition-transform transform hover:scale-105">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-300">{platform.title}</h3>
                  <p className="text-gray-400">{platform.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-6 border-t border-white-700">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 TLE Eliminators - Your Programming Contest Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
