import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export default async (URL) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL);

    // Extract data from the page
    const scrapedData = await page.evaluate(() => {

        // Select all article with the data-ev-label attribute equal to 'search_results_impression'
        const jobElements = document.querySelectorAll('article[data-ev-label=search_results_impression]');

        // Extract the job titles from these elements
        return Array.from(jobElements).map(element => {

            const title = element.querySelector('h2');
            const link = title.querySelector('a');
            const description = element.querySelector('p');
            const feedback = element.querySelector('.air3-popper-content');
            const location = element.querySelector('li[data-test=location]');
            const type = element.querySelector('li[data-test=job-type-label]');
            const duration = element.querySelector('li[data-test=duration-label]');
            const payment = element.querySelector('li[data-test=payment-verified]');
            const experience = element.querySelector('[data-test=experience-level]');
            const spent = element.querySelector('li[data-test=total-spent] > div > strong');
            const publishedDate = element.querySelector('small[data-test=job-pubilshed-date]');
            const noProposals = element.querySelector('li[data-test=proposals-tier] > strong');
            const noFreelancers = element.querySelector('li[data-test=freelancers-to-hire] > strong');

            const tokenElements = element.querySelectorAll('span[data-test=token]');
            const tokens = Array.from(tokenElements).map(element => element.innerText)

            return {
                tokens,
                type: type ? type.innerText.trim() : "",
                title: title ? title.innerText.trim() : "",
                link: link ? link.getAttribute('href') : "",
                spent: spent ? spent.innerText.trim() : "",
                payment: payment ? payment.innerText.trim() : "",
                feedback: feedback ? feedback.innerText.trim() : "",
                duration: duration ? duration.innerText.trim() : "",
                location: location ? location.innerText.trim() : "",
                experience: experience ? experience.innerText.trim() : "",
                description: description ? description.innerText.trim() : "",
                noProposals: noProposals ? noProposals.innerText.trim() : "",
                noFreelancers: noFreelancers ? noFreelancers.innerText.trim() : "1",
                publishedDate: publishedDate ? publishedDate.innerText.slice(6).trim() : "",
            };
        })

    });

    await browser.close();
    return scrapedData;
};