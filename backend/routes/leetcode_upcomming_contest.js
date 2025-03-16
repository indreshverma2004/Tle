const puppeteer = require("puppeteer");

async function extractLeetCodeContests(timeStrings) {
  // If timeStrings is not an array, convert it to one
  if (!Array.isArray(timeStrings)) {
    timeStrings = [timeStrings];
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  );

  await page.goto("https://leetcode.com/contest/", {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  await page.screenshot({ path: "debug.png", fullPage: true });
  await new Promise((resolve) => setTimeout(resolve, 8000));

  try {
    await page.waitForSelector("div", { timeout: 15000 });
  } catch (error) {
    console.log("Waiting for selector timed out, continuing anyway");
  }

  // Using an array to store results instead of an object
  const resultsArray = [];

  for (const timeString of timeStrings) {
    const contestData = await page.evaluate((searchTimeString) => {
      const contests = [];

      document.querySelectorAll("div").forEach((div) => {
        if (div.textContent.includes(searchTimeString)) {
          let timeDiv = div;
          let parent1 = timeDiv.parentElement;
          let parent2 = parent1?.parentElement;
          let siblingDiv = parent2?.previousElementSibling;
          let startsInDiv = Array.from(
            siblingDiv?.querySelectorAll("div") || []
          ).find((d) => d.textContent.includes("Starts in"));

          let contestAnchor = parent2?.closest("a");
          let contestNameSpan = parent2?.querySelector("span");

          contests.push({
            contestName: contestNameSpan?.innerText.trim() || "N/A",
            startsIn:
              startsInDiv?.textContent.replace("Starts in", "").trim() || "N/A",
            time: timeDiv.textContent.trim(),
            contestLink: contestAnchor?.href || "N/A",
          });
        }
      });
      return contests;
    }, timeString);

    // If contests were found, add the last one to the results array
    if (contestData.length > 0) {
      resultsArray.push(contestData[contestData.length - 1]);
    }
  }

  await browser.close();
  return resultsArray;
}

module.exports = extractLeetCodeContests;
