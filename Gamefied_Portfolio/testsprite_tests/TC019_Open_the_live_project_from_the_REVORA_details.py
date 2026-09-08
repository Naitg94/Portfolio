import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:4173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'EXPLORE PROJECTS' button to open the Projects section.
        # EXPLORE PROJECTS button
        elem = page.get_by_role('button', name='EXPLORE PROJECTS', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the '▶ VIEW LIVE PROJECT' button to open the REVORA live deployment and verify it goes to https://revora-fawn.vercel.app/.
        # ▶ VIEW LIVE PROJECT button
        elem = page.get_by_role('button', name='▶ VIEW LIVE PROJECT', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Clicking the project's 'VIEW LIVE PROJECT' action opened the live REVORA site.
        # Assert-outcome: passed
        # Assert: The live REVORA deployment URL was opened.
        await expect(page).to_have_url(re.compile("revora\\-fawn\\.vercel\\.app"), timeout=15000), "The live REVORA deployment URL was opened."
        
        # --> The opened page displays the REVORA dashboard branding.
        # Assert-outcome: passed
        # Assert: The page shows the 'REVORA' branding text.
        await expect(page.locator("xpath=/html/body/div/div[2]/div/div").nth(0)).to_have_text("REVORA", timeout=15000), "The page shows the 'REVORA' branding text."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    