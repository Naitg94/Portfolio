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
        
        # -> Click the 'PROFILE' button in the top navigation to open the profile quick actions.
        # PROFILE button
        elem = page.get_by_role('button', name='PROFILE', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'LinkedIn' quick action in the profile panel (locate the LinkedIn link first).
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'CONNECT ON LINKEDIN' link in the profile panel to open the LinkedIn quick action.
        # [ CONNECT ON LINKEDIN ] link
        elem = page.get_by_role('link', name='[ CONNECT ON LINKEDIN ]', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the portfolio tab titled 'NAITIK.OS — Interactive Futuri' so the 'SKILLS' navigation link can be clicked.
        # Switch to tab 442E
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Click the 'SKILLS' navigation link in the top navigation to go to the Skills section.
        # SKILLS button
        elem = page.get_by_role('button', name='SKILLS', exact=True)
        await elem.click(timeout=10000)
        
        # -> Verify the 'SKILL UNIVERSE' heading is visible, then click the 'PROJECTS' navigation link to confirm portfolio navigation remains usable.
        # PROJECTS button
        elem = page.get_by_role('button', name='PROJECTS', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The Skills section is visible — a 'Python' skills card is displayed.
        await page.locator("xpath=/html/body/div[1]/div/main/section[4]/div[3]/div[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: A skills card with the text 'Python\nBUILDING WITH' is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/section[4]/div[3]/div[1]").nth(0)).to_be_visible(timeout=15000), "A skills card with the text 'Python\\nBUILDING WITH' is visible."
        
        # --> After returning from the external link, clicking PROJECTS shows the Projects content (project 'REVORA').
        # Assert-outcome: passed
        # Assert: The Projects list contains the project name 'REVORA'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/section[5]/div[2]/div[1]/button[1]").nth(0)).to_contain_text("REVORA", timeout=15000), "The Projects list contains the project name 'REVORA'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    