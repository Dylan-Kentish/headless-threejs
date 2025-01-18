import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const OUTPUT_FOLDER = "output";

async function renderInBrowser() {
  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl"],
  });

  const page = await browser.newPage();

  await page.exposeFunction("readFile", async (name) => {
    console.log(`Reading file: ${name}`);
    const data = fs.readFileSync(path.resolve(name));
    const base64Data = data.toString("base64");
    return base64Data;
  });

  await page.exposeFunction("saveFile", async (name, base64Data) => {
    console.log(`Saving image: ${name}`);
    const buffer = Buffer.from(base64Data, "base64");

    if (!fs.existsSync(OUTPUT_FOLDER)) {
      fs.mkdirSync(OUTPUT_FOLDER);
    }

    fs.writeFileSync(path.join(OUTPUT_FOLDER, name), buffer);
  });

  // Helper to allow running from package.json as well as Docker
  const isDocker = fs.existsSync("/.dockerenv"); 
  const htmlPath = isDocker ? "render.html" : "src/render.html";

  await page.goto(`file://${path.resolve(htmlPath)}`, {
    waitUntil: "load",
  });

  await page.evaluate(async () => {
    await window.renderImage();
  });

  console.log("Rendering complete!");

  await browser.close();
}

renderInBrowser();
