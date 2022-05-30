const Redis = require('ioredis');

const REDIS_URL = '';

const publisher = new Redis(REDIS_URL, {
	maxRetriesPerRequest: 2,
	retryStrategy: function (times) {
		return Math.min(times * 10, 250);
	},
});

async function loop() {
    try {
    while(true) {
        const ts = new Date().toString();
        await publisher.publish('channel', ts).then(()=>console.log(`Message of ${ts} published at`, new Date().toString()));
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    } catch (err) {
        console.log(err);
    }
}

loop();
