import { io } from "../app.js";
import scraper from "../scraper/index.js";

export default () => {
    io.on('connection', (socket) => {

        let intervalId;

        socket.on('subscribe', (URL) => {
            let oldJobs = []

            intervalId = setInterval(() => {

                scraper(URL).then((newJobs) => {

                    const onlyInNewJobs = newJobs.filter(newJob => !oldJobs.some(oldJob => oldJob.title === newJob.title));
                    oldJobs = newJobs

                    socket.emit('jobs', onlyInNewJobs)
                    
                }).catch((error) => console.log(error))

            }, 60000);

        })

        socket.on('unsubscribe', () => {
            clearInterval(intervalId);
        });

        socket.on('disconnect', () => {
            clearInterval(intervalId);
        });

    });
}



