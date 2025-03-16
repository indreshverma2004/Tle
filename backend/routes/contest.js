const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const axios = require("axios");
const codechefupcomming=require('./codchefupcooming');
const leetcode_upcomming_contest=require('./leetcode_upcomming_contest');
const codechefpastcontest = require("./codechefpast"); 
const leetcodepast=require('./leetcodepast');
// Fetch Codeforces contests
router.get("/codeforces", async (req, res) => {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    const data = response.data;

    if (data.status === "OK") {
      // Filter upcoming contests
      const upcomingContests = data.result
        .filter((contest) => contest.phase === "BEFORE")
        .map((contest) => {
          const startDate = new Date(contest.startTimeSeconds * 1000);
          const hours = Math.floor(contest.durationSeconds / 3600);
          const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
          const daysUntil = Math.abs(
            Math.ceil(contest.relativeTimeSeconds / 86400)
          );

          return {
            name: contest.name,
            link: `https://codeforces.com/contest/${contest.id}`,
            formattedStartTime: startDate.toLocaleString(),
            formattedDuration: `${hours}h ${minutes}m`,
            daysUntil: daysUntil,
          };
        });

      // Filter past contests (Completed) and limit to 20
      const pastContests = data.result
        .filter((contest) => contest.phase === "FINISHED")
        .slice(0, 50) // Limit to 20 contests
        .map((contest) => {
          const startDate = new Date(contest.startTimeSeconds * 1000);
          const hours = Math.floor(contest.durationSeconds / 3600);
          const minutes = Math.floor((contest.durationSeconds % 3600) / 60);

          return {
            name: contest.name,
            link: `https://codeforces.com/contest/${contest.id}`,
            formattedStartTime: startDate.toLocaleString(),
            formattedDuration: `${hours}h ${minutes}m`,
          };
        });

      res.status(200).json({
        success: true,
        pastContests,
        upcomingContests,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to fetch Codeforces contests",
      });
    }
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/leetcode", async (req, res) => {
  try {
    // Define upcoming contest times
    const timeStrings = [
      "Sunday 8:00 AM GMT+5:30",
      "Saturday 8:00 PM GMT+5:30",
    ];

    // Fetch both past and upcoming contests concurrently
    const [pastContests, upcomingContests] = await Promise.all([
      leetcodepast(),
      leetcode_upcomming_contest(timeStrings),
    ]);

    // Send the response with both categories
    res.status(200).json({
      success: true,
      pastContests,
      upcomingContests, // This is now an array instead of an object
    });
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// Fetch CodeChef contests using Puppeteer scraper
router.get("/codechef", async (req, res) => {
  try {
    // Fetch both past and upcoming contests concurrently
    const [pastContests, upcomingContests] = await Promise.all([
      codechefpastcontest(),
      codechefupcomming(),
    ]);

    // Send the response with both categories
    res.status(200).json({
      success: true,
      pastContests,
      upcomingContests,
    });
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
