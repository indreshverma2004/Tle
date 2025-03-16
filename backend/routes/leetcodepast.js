const puppeteer = require("puppeteer");

async function extractLeetCodeContestLinks() {
  // Launch browser with settings that help avoid detection
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--window-size=1920,1080",
    ],
  });

  try {
    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );

    console.log("Navigating to LeetCode contests page...");
    await page.goto("https://leetcode.com/contest/", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Extracting contest data...");

    // Execute the same selector logic inside the page context
    const contestData = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        "div[class*='flex'][class*='h-[86px]'][class*='items-center'] a"
      );

      return Array.from(elements)
        .map((aTag) => {
          let link = aTag.getAttribute("href"); // Get href link
          if (link && link.startsWith("/")) {
            link = "https://leetcode.com" + link;
          }

          let secondDiv = aTag.querySelectorAll("div")[1]; // Select second div inside <a>
          let contestName =
            secondDiv?.querySelector("span")?.innerText.trim() || null;
          let timeInfo =
            secondDiv?.querySelector("div")?.innerText.trim() || null;

          // Return only valid contests
          if (!contestName || !timeInfo) return null;
          return { link, contestName, timeInfo };
        })
        .filter(Boolean); // Remove null values
    });

    console.log(`Found ${contestData.length} valid contests`);
    return contestData;
  } catch (error) {
    console.error("Error extracting contest data:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Execute if run directly
if (require.main === module) {
  extractLeetCodeContestLinks()
    .then((data) => {
      console.log("Valid Contest Data:");
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      console.error("Failed to extract data:", err);
      process.exit(1);
    });
}

module.exports = extractLeetCodeContestLinks;
