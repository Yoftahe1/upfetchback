import scraper from "../scraper/index.js"

export default class Service {
    
    async subscribe(URL) {
        try {
            const jobs = await scraper(URL)
            return { status: 200, message: "subscribed for notification.", jobs }
        } catch (error) {
            console.log(error)
            return { status: 500, message: "something went wrong" }
        }
    }

}