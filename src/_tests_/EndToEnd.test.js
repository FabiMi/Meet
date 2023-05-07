import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        jest.setTimeout(60000); // set timeout to 60 seconds
        console.log('Launching browser...');
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        console.log('Opening new page...');
        page = await browser.newPage();
        console.log('Navigating to URL...');
        await page.goto('http://localhost:3000/meet');
        console.log('Waiting for event selector...');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .event-details-btn');
        await page.waitForTimeout(5000); // add a delay of 500 ms
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .event-details-btn');
        await page.waitForTimeout(5000); // add a delay of 500 ms
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });
});
