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
        
        # -> Scroll the page down to reveal the contact terminal and chatbot section so the chat input becomes visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll further down to reveal the contact terminal and chatbot section so the chat input becomes visible.
        await page.mouse.wheel(0, 300)
        
        # -> Type 'Who is Naitik?' into the 'Ask NAITIK.OS AI anything...' input and submit it (press Enter) to trigger the chatbot response.
        # Ask NAITIK.OS AI anything... text field
        elem = page.get_by_placeholder('Ask NAITIK.OS AI anything...', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Who is Naitik?")
        
        # --> Assertions to verify final state
        
        # --> The chatbot displayed a reply describing Naitik.
        # Assert-outcome: passed
        # Assert: Chatbot reply contains a description of Naitik.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[1]/div[2]/div").nth(0)).to_contain_text("Naitik Goyal is an AI/ML Student & Developer based in Bhilai, Chhattisgarh, India.", timeout=15000), "Chatbot reply contains a description of Naitik."
        
        # --> At least one follow-up action button (Open Revora) is visible under the reply.
        await page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'OPEN REVORA' follow-up action button is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/section[8]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/button[1]").nth(0)).to_be_visible(timeout=15000), "The 'OPEN REVORA' follow-up action button is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    