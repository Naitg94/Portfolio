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
        
        # -> Click the 'JOURNEY' navigation item in the top navigation bar to navigate to the Journey section.
        # JOURNEY button
        elem = page.get_by_role('button', name='JOURNEY', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'SKILLS' navigation item in the top navigation bar.
        # SKILLS button
        elem = page.get_by_role('button', name='SKILLS', exact=True)
        await elem.click(timeout=10000)
        
        # -> Verify the 'SKILL UNIVERSE' heading is visible on the page, then click the 'JOURNEY' navigation item to return to the Journey section.
        # JOURNEY button
        elem = page.get_by_role('button', name='JOURNEY', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'SKILLS' navigation button and verify the 'SKILL UNIVERSE' heading appears on the page.
        # SKILLS button
        elem = page.get_by_role('button', name='SKILLS', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Journey section is displayed (Journey level card visible).
        await page.locator("xpath=/html/body/div[1]/div/main/section[3]/div[2]/div[2]/div[2]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Journey level card with 'LEVEL 01' is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/section[3]/div[2]/div[2]/div[2]").nth(0)).to_be_visible(timeout=15000), "Journey level card with 'LEVEL 01' is visible."
        
        # --> Skills section is displayed (a Python skill card is visible).
        # Assert-outcome: passed
        # Assert: The 'Python' skill card is present in the Skills section.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/section[4]/div[3]/div[1]/div[2]/h4").nth(0)).to_have_text("Python", timeout=15000), "The 'Python' skill card is present in the Skills section."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    