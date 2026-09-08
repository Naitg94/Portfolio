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
        
        # -> Click the 'PROJECT 02' button (label: PROJECT 02 — TREE PLANTATION) to view its details and count it as explored.
        # PROJECT 02 COMPLETED TREE PLANTATION FULL-STACK... button
        elem = page.get_by_role('button', name='PROJECT 02 COMPLETED TREE PLANTATION FULL-STACK WEB APPLICATION', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 02' button (label: PROJECT 02 — TREE PLANTATION) to view its details and count it as explored.
        # PROJECT 03 COMPLETED EXPENSE TRACKER PERSONAL... button
        elem = page.get_by_role('button', name='PROJECT 03 COMPLETED EXPENSE TRACKER PERSONAL FINANCE APPLICATION', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'PROJECT 02' button (label: PROJECT 02 — TREE PLANTATION) to view its details and count it as explored.
        # PROJECT 04 COMPLETED GOYAL TRADERS BUSINESS... button
        elem = page.get_by_role('button', name='PROJECT 04 COMPLETED GOYAL TRADERS BUSINESS WEBSITE', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The projects header shows the archive badge indicating all projects are archived.
        # Assert-outcome: passed
        # Assert: Project header contains the 'PROJECT ARCHIVIST' label.
        await expect(page.locator("xpath=/html/body/div/div/main/section[5]/div[1]/div[2]").nth(0)).to_contain_text("[PROJECT ARCHIVIST]", timeout=15000), "Project header contains the 'PROJECT ARCHIVIST' label."
        
        # --> An achievement badge displays unlock feedback.
        # Assert-outcome: passed
        # Assert: An achievement badge displays an unlock label '#UNLOCK_0'.
        await expect(page.locator("xpath=/html/body/div/div/main/section[6]/div[2]/div[1]/div[2]/span[2]").nth(0)).to_contain_text("#UNLOCK_0", timeout=15000), "An achievement badge displays an unlock label '#UNLOCK_0'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    