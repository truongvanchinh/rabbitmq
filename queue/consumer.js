const amqplib = require('amqplib')

//.env
const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'
const amqp_url_docker = 'amqp://localhost:5672'

const receiveQueue = async () => {
    try {
        //1. create Connect
        const conn = await amqplib.connect(amqp_url_docker)
        
        //2. create channel
        const channel = await conn.createChannel()

        //3. create name queue
        const nameQueue = 'q2'

        //4. create queue
        await channel.assertQueue(nameQueue, {
            durable: true
        })

        //5. receive to queue
        await channel.consume(nameQueue, msg => {
            console.log(`MSG::::`, msg.content.toString())
        }, {
            noAck: true
        })

        //6. close conn and chanel


    } catch (error) {
        console.error(`Error::`, error.message)
        
    }
}

receiveQueue()