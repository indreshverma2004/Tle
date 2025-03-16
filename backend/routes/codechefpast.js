const puppeteer = require("puppeteer");

async function scrapePastCodeChefContests() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.codechef.com/contests", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  const contests = await page.evaluate(() => {
    let contestData = [];

    // Find the "Past Contests" <p> element
    let pastContestHeader = Array.from(document.querySelectorAll("p")).find(
      (p) => p.innerText.trim() === "Past Contests"
    );

    if (!pastContestHeader) return []; // Return empty array if not found

    // Get the parent div of "Past Contests"
    let parentDiv = pastContestHeader.closest("div");

    if (!parentDiv) return []; // If no parent div, return empty array

    // Find the next div (which contains past contests)
    let contestListDiv = parentDiv.nextElementSibling;

    if (!contestListDiv) return []; // If no contest list div, return empty array

    // Select all contest entries inside this div
    let contestElements = contestListDiv.querySelectorAll("a");

    contestElements.forEach((element) => {
      let name = element.innerText.trim();
      let link = element.href;

      contestData.push({ name, link });
    });

    return contestData;
  });

  await browser.close();
  return contests; // Return extracted data
}

module.exports = scrapePastCodeChefContests;
