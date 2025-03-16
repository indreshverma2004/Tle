const puppeteer = require("puppeteer");

async function upcommingcontest() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.codechef.com/contests", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  const contests = await page.evaluate(() => {
    let contestData = [];

    // Find the "Upcoming Contests" <p> element
    let upcomingContestHeader = Array.from(document.querySelectorAll("p")).find(
      (p) => p.innerText.trim() === "Upcoming Contests"
    );

    if (!upcomingContestHeader) return []; // If not found, return empty array

    // Move to the parent <div> that contains contests
    let parentDiv = upcomingContestHeader.closest("div")?.nextElementSibling;

    if (!parentDiv) return []; // If no contest list found, return empty array

    // Select all contest entries inside this div (direct child <div>s)
    let contestElements = Array.from(parentDiv.children);

    contestElements.forEach((element) => {
      let nameElement = element.querySelector("a span");
      let linkElement = element.querySelector("a");

      let name = nameElement?.innerText.trim() || "N/A";
      let link = linkElement?.href || "#";

      // Extracting time (Days & Hours)
      let timeElements = element.querySelectorAll("p");
      let days = timeElements[0]?.innerText || "0 Days";
      let hours = timeElements[1]?.innerText || "0 Hrs";

      contestData.push({ name, link, startsIn: `${days} ${hours}` });
    });

    return contestData;
  });

  await browser.close();
  return contests; // Return extracted data
}

module.exports = upcommingcontest;
