import puppeteer from 'puppeteer';
import { mockData } from "../mock-data";


describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(1000000);
    browser = await puppeteer.launch({
      headless: false,
     slowMo: 250, // slow down by 250ms
     ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
 
  });
    test('An event element is collapsed by default', async () => {
      jest.setTimeout(1000000);
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    
        await page.waitForSelector('.event');
    
        const eventDetails = await page.$('.event .event-info');
        expect(eventDetails).toBeNull();
      });

      test('User can expand an event to see its details', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    
        await page.waitForSelector('.event');
        await page.click('.event .details-btn');
    
        const eventDetails = await page.$('.event .event-info');
        expect(eventDetails).toBeDefined();
      });

      test('User can collapse an event to hide its details', async () => {
        await page.click('.event .event-details-btn');
        const eventDetails = await page.$('.event .event-info');
        expect(eventDetails).toBeNull();
      });

     
});