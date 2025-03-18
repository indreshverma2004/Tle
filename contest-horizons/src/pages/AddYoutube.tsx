import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Youtube, Search, Link as LinkIcon } from "lucide-react";

export default function AddYoutube() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContest, setSelectedContest] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    loadContestsFromStorage();
  }, []);

  const loadContestsFromStorage = () => {
    try {
      const saved = localStorage.getItem("contestData");
      if (saved) {
        const parsedData = JSON.parse(saved);
        setData(parsedData);
      }
    } catch (err) {
      console.error("Error loading contests from storage:", err);
    }
  };

  const handleSelectContest = (contest) => {
    setSelectedContest(contest);
    setSearchTerm(contest.name || contest.contestName || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedContest || !youtubeLink) {
      alert("Please select a contest and enter a YouTube link.");
      return;
    }

    const contestName = selectedContest.name || selectedContest.contestName;
    if (!contestName) {
      alert("Selected contest has no name. Please select a valid contest.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/addyoutube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contestName, link: youtubeLink })
      });

      if (response.ok) {
        alert("YouTube link submitted successfully!");
        setSelectedContest(null);
        setSearchTerm("");
        setYoutubeLink("");
      } else {
        alert("Failed to submit the link.");
      }
    } catch (error) {
      alert("An error occurred while submitting.");
    }
  };

  const filteredContests = data ?
    Object.values(data).flatMap((platform) =>
      [...(platform.past || []), ...(platform.upcoming || [])]
    ).filter(contest =>
      contest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contest.contestName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-600" /> Add YouTube Solution
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Share your video solutions for coding contests</CardDescription>
          <Separator className="my-2" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-contest">Search Contest</Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500" />
                <Input
                  id="search-contest"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type contest name..."
                  className="pl-10"
                />
              </div>
              {searchTerm && filteredContests.length > 0 && (
                <ul className="mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                  {filteredContests.map((contest, index) => (
                    <li key={index} className="cursor-pointer py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSelectContest(contest)}>
                      {contest.name || contest.contestName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube-link">YouTube Link</Label>
              <Input
                id="youtube-link"
                type="text"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <Button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Submit Solution</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
