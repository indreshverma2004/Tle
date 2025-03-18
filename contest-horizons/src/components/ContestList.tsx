import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CodeForcesCard from "./cardcodeforces";
import CodeChefCard from "./codechefcard";
import LeetcodeUpcoming from "./leetcodeupcomming";
import PastContestCard from "./leetcodepast";
import ContestLoadingSkeleton from "../pages/contestloading";

interface ContestListProps {
  title: string;
  contests: any[];
  loading: boolean;
  platform: string;
  emptyMessage?: string;
}

const ContestList = ({
  title,
  contests,
  loading,
  platform,
  emptyMessage = "No contests found.",
}: ContestListProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Set token from local storage
  }, []);

  // Bookmark function
  const handleBookmark = async (contest: any) => {
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const auth = token.slice(1, token.length - 1);
      const response = await fetch("http://localhost:5000/api/auth/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ contest }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully bookmarked contest");
        console.log(`Successfully bookmarked contest:`, contest);
      } else {
        console.error("Failed to bookmark contest:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error while bookmarking contest:", error);
    }
  };

  // Enhanced UI for Contest Cards
  const renderContest = (contest: any, index: number) => (
    <div
      key={contest.id || index}
      className="relative p-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white transition-transform hover:scale-105 hover:shadow-2xl"
    >
      {platform === "codeforces" && <CodeForcesCard contest={contest} />}
      {platform === "codechef" && <CodeChefCard contest={contest} />}
      {platform === "leetcode" &&
        (contest.startsIn ? (
          <LeetcodeUpcoming contest={contest} />
        ) : (
          <PastContestCard {...contest} />
        ))}

      {/* Bookmark Button */}
      <button
        className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition-all"
        onClick={() => handleBookmark(contest)}
        disabled={!token}
      >
        Bookmark
      </button>
    </div>
  );

  return (
    <div className="mb-8 p-4 rounded-lg bg-gray-700">
      <h2 className="text-3xl font-extrabold mb-6 text-yellow-400">{title}</h2>
      {loading ? (
        <ContestLoadingSkeleton />
      ) : contests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => renderContest(contest, index))}
        </div>
      ) : (
        <Card className="p-8 text-center text-gray-400 bg-gray-800">
          {emptyMessage}
        </Card>
      )}
    </div>
  );
};

export default ContestList;
