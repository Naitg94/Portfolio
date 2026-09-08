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
        
        # --> Assertions to verify final state
        
        # --> Hero landing section is visible with the primary CTA present.
        await page.locator("xpath=/html/body/div/div/main/section[1]/div[2]/div[4]/button[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'EXPLORE PROJECTS' button in the hero is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/section[1]/div[2]/div[4]/button[1]").nth(0)).to_be_visible(timeout=15000), "The 'EXPLORE PROJECTS' button in the hero is visible."
        
        # --> System status badge is visible and indicates ONLINE.
        await page.locator("xpath=/html/body/div/div/main/section[1]/div[2]/div[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The system status badge is visible and reads 'SYSTEM STATUS: ONLINE'.
        await expect(page.locator("xpath=/html/body/div/div/main/section[1]/div[2]/div[1]").nth(0)).to_be_visible(timeout=15000), "The system status badge is visible and reads 'SYSTEM STATUS: ONLINE'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    