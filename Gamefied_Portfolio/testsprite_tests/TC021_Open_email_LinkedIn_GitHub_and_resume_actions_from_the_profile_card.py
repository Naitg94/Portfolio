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
        
        # -> Click the "PLAYER PROFILE" button to open the player profile quick actions.
        # button
        elem = page.locator('xpath=/html/body/div/div/main/section/button')
        await elem.click(timeout=10000)
        
        # -> Click the 'DOWNLOAD RESUME (PDF)' quick action to verify the resume download target.
        # Download: DOWNLOAD RESUME (PDF) link
        elem = page.get_by_text('PLAYER CHARACTER DATAONLINE', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='DOWNLOAD RESUME (PDF)', exact=True)
        async with page.expect_download(timeout=30000) as dl_info:
            await elem.click(timeout=10000)
        download = await dl_info.value
        assert download.suggested_filename  # verify file was downloaded
        await download.save_as(f"./downloads/{download.suggested_filename}")
        
        # -> Click the 'DOWNLOAD RESUME (PDF)' quick action and verify that the resume download or navigation to the resume file is initiated.
        # Download: DOWNLOAD RESUME (PDF) link
        elem = page.get_by_text('PLAYER CHARACTER DATAONLINE', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='DOWNLOAD RESUME (PDF)', exact=True)
        async with page.expect_download(timeout=30000) as dl_info:
            await elem.click(timeout=10000)
        download = await dl_info.value
        assert download.suggested_filename  # verify file was downloaded
        await download.save_as(f"./downloads/{download.suggested_filename}")
        
        # -> Click the top navigation link labeled 'RESUME' to verify whether the resume download or navigation is initiated.
        # Download: RESUME link
        elem = page.get_by_role('link', name='RESUME', exact=True)
        async with page.expect_download(timeout=30000) as dl_info:
            await elem.click(timeout=10000)
        download = await dl_info.value
        assert download.suggested_filename  # verify file was downloaded
        await download.save_as(f"./downloads/{download.suggested_filename}")
        
        # -> Scroll down to reveal more page content, then list all visible links on the page to find mailto, LinkedIn, GitHub, and the resume PDF link.
        await page.mouse.wheel(0, 300)
        
        # -> Open the resume PDF by navigating to /Naitik_Goyal_Resume.pdf in a new tab to verify the resume download target.
        # Open URL in new tab
        page = await context.new_page()
        await page.goto("http://localhost:4173/Naitik_Goyal_Resume.pdf")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Switch to the SPA main tab titled 'NAITIK.OS — Interactive Futuri' so the Player Profile quick actions can be interacted with.
        # Switch to tab CFE5
        page = context.pages[-1]  # switch to most recently active tab
        
        # --> Assertions to verify final state
        
        # --> The resume download was initiated and the RESUME link targets /Naitik_Goyal_Resume.pdf.
        # Assert-outcome: passed
        # Assert: RESUME link targets the resume PDF at /Naitik_Goyal_Resume.pdf.
        await expect(page.locator("xpath=/html/body/div/div/header/nav/div[2]/a").nth(0)).to_have_attribute("href", "/Naitik_Goyal_Resume.pdf", timeout=15000), "RESUME link targets the resume PDF at /Naitik_Goyal_Resume.pdf."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    