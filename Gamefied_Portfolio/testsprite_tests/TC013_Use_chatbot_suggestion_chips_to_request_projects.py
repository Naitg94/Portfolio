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
        
        # -> Scroll the page to reveal the contact terminal and chatbot section so suggestion chips are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the page down to reveal the contact terminal and chatbot section (the 'CONTACT' area) so suggestion chips become visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the contact terminal and chatbot section so the 'NAITIK.OS AI CHATBOT' area and suggestion chips are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'Show me his projects' suggestion chip in the chatbot area.
        # [ Show me his projects ] button
        elem = page.get_by_role('button', name='[ Show me his projects ]', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The visitor prompt "Show me his projects" was submitted via the suggestion chip.
        await page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[2]/div/button[3]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'Show me his projects' suggestion chip is present on the page.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[2]/div/button[3]").nth(0)).to_be_visible(timeout=15000), "The 'Show me his projects' suggestion chip is present on the page."
        await page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: A project follow-up button ('OPEN REVORA') is visible, showing the chip submission produced a reply.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0)).to_be_visible(timeout=15000), "A project follow-up button ('OPEN REVORA') is visible, showing the chip submission produced a reply."
        
        # --> A project-oriented assistant reply is displayed and shows follow-up action buttons for the listed projects.
        await page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The assistant's project reply includes the 'OPEN REVORA' follow-up button, indicating a project-oriented reply was shown.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0)).to_be_visible(timeout=15000), "The assistant's project reply includes the 'OPEN REVORA' follow-up button, indicating a project-oriented reply was shown."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    