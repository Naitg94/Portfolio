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
        
        # -> Click the 'ACHIEVEMENTS' navigation button to reveal the Achievements section on the portfolio page.
        # ACHIEVEMENTS button
        elem = page.get_by_role('button', name='ACHIEVEMENTS', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'FULL STACK WEB DEVELOPMENT WITH AI' achievement card (the leftmost card) to inspect its badge.
        # CERTIFICATION FULL STACK WEB DEVELOPMENT WITH AI...
        elem = page.locator('xpath=/html/body/div/div/main/section[6]/div[2]/div/div')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Clicking the achievement card shows celebratory badge text in the Achievements section.
        # Assert-outcome: passed
        # Assert: Celebratory badge/feedback text 'CLICK TO INSPECT BADGE' is visible in the Achievements section.
        await expect(page.locator("xpath=/html/body/div/div/main/section[6]/div[2]/div[1]/div[2]").nth(0)).to_contain_text("CLICK TO INSPECT BADGE", timeout=15000), "Celebratory badge/feedback text 'CLICK TO INSPECT BADGE' is visible in the Achievements section."
        
        # --> The user remained on the portfolio page after clicking the achievement card (URL did not change).
        # Assert-outcome: passed
        # Assert: The page URL remains the portfolio root (http://localhost:4173/).
        await expect(page).to_have_url(re.compile("http://localhost:4173/"), timeout=15000), "The page URL remains the portfolio root (http://localhost:4173/)."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    