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
        
        # -> Click the 'EXPLORE PROJECTS' button to open the Projects/Featured Projects section.
        # EXPLORE PROJECTS button
        elem = page.get_by_role('button', name='EXPLORE PROJECTS', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 01' card in the Project Index to visit its details.
        # PROJECT 01 EXPLORED REVORA AUTONOMOUS AI &... button
        elem = page.get_by_role('button', name='PROJECT 01 EXPLORED REVORA AUTONOMOUS AI & REVENUE RECOVERY PLATFORM', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 01' card in the Project Index to visit its details.
        # PROJECT 02 COMPLETED TREE PLANTATION FULL-STACK... button
        elem = page.get_by_role('button', name='PROJECT 02 COMPLETED TREE PLANTATION FULL-STACK WEB APPLICATION', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 01' card in the Project Index to visit its details.
        # PROJECT 03 COMPLETED EXPENSE TRACKER PERSONAL... button
        elem = page.get_by_role('button', name='PROJECT 03 COMPLETED EXPENSE TRACKER PERSONAL FINANCE APPLICATION', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 01' card in the Project Index to visit its details.
        # PROJECT 04 COMPLETED GOYAL TRADERS BUSINESS... button
        elem = page.get_by_role('button', name='PROJECT 04 COMPLETED GOYAL TRADERS BUSINESS WEBSITE', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Project exploration counter shows the featured projects are complete (4/4).
        # Assert-outcome: passed
        # Assert: Exploration counter displays "4 / 4" indicating completion.
        await expect(page.locator("xpath=/html/body/div/div/main/section[5]/div[1]/div[2]").nth(0)).to_contain_text("4 / 4", timeout=15000), "Exploration counter displays \"4 / 4\" indicating completion."
        
        # --> The Project Archivist reward label is shown in the projects header.
        # Assert-outcome: passed
        # Assert: Project Archivist reward label is visible in the projects header.
        await expect(page.locator("xpath=/html/body/div/div/main/section[5]/div[1]/div[2]").nth(0)).to_contain_text("PROJECT ARCHIVIST", timeout=15000), "Project Archivist reward label is visible in the projects header."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    