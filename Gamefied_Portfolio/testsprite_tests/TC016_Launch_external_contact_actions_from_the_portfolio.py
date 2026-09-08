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
        
        # -> Scroll to the contact terminal and chatbot section so the contact action buttons (email, LinkedIn, GitHub, resume) become visible.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'SEND EMAIL' button in the contact panel to open the email target.
        # [ SEND EMAIL ] link
        elem = page.get_by_role('link', name='[ SEND EMAIL ]', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'CONNECT ON LINKEDIN' button in the contact panel.
        # [ CONNECT ON LINKEDIN ] link
        elem = page.get_by_role('link', name='[ CONNECT ON LINKEDIN ]', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the portfolio tab titled 'NAITIK.OS — Interactive Futuri' to locate and click the 'GITHUB' and 'DOWNLOAD RESUME' contact buttons and verify their targets.
        # Switch to tab 3B98
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Click the 'OPEN GITHUB' button and verify it opens github.com/Naitg94.
        # [ OPEN GITHUB ] link
        elem = page.get_by_role('link', name='[ OPEN GITHUB ]', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the portfolio tab titled 'NAITIK.OS — Interactive Futuri' so the contact panel (email, LinkedIn, GitHub, Download Resume) can be interacted with.
        # Switch to tab 3B98
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Check the contact anchors' targets (email, GitHub, LinkedIn, resume) then click the 'DOWNLOAD RESUME (PDF)' button.
        # Download: DOWNLOAD RESUME (PDF) link
        elem = page.get_by_text('HAVE AN IDEA, PROJECT OR OPPORTUNITY?', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='DOWNLOAD RESUME (PDF)', exact=True)
        async with page.expect_download(timeout=30000) as dl_info:
            await elem.click(timeout=10000)
        download = await dl_info.value
        assert download.suggested_filename  # verify file was downloaded
        await download.save_as(f"./downloads/{download.suggested_filename}")
        
        # --> Assertions to verify final state
        
        # --> Contact panel shows direct email, GitHub, and LinkedIn actions.
        # Assert-outcome: passed
        # Assert: Email link displays '[ SEND EMAIL ]'.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[1]/div/div[2]/div[1]/a").nth(0)).to_have_text("[ SEND EMAIL ]", timeout=15000), "Email link displays '[ SEND EMAIL ]'."
        # Assert-outcome: passed
        # Assert: GitHub link displays '[ OPEN GITHUB ]'.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[1]/div/div[2]/div[2]/a").nth(0)).to_have_text("[ OPEN GITHUB ]", timeout=15000), "GitHub link displays '[ OPEN GITHUB ]'."
        
        # --> Download Resume action is available in the contact panel.
        # Assert-outcome: passed
        # Assert: Resume download link displays 'DOWNLOAD RESUME (PDF)'.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[1]/div/div[3]/a").nth(0)).to_have_text("DOWNLOAD RESUME (PDF)", timeout=15000), "Resume download link displays 'DOWNLOAD RESUME (PDF)'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    