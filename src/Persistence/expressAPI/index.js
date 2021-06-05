const app = require('./app')

app.listen(5000, async () => {
    console.log("Listening on port 5000")
   await app.emit('listening')
});
