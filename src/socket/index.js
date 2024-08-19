import { io } from "../app.js";

export default () => {
    io.on('connection', (socket) => {
  
        let intervalId;

        socket.on('subscribe', (URL) => {
            let oldJobs=[]

            console.log('User subscribed', URL);

            intervalId = setInterval(() => {
                socket.emit('jobs', URL);
            }, 10000);

        })

        socket.on('disconnect', () => {
            console.log('User disconnected');
            clearInterval(intervalId); // Clean up interval when user disconnects
          });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}



