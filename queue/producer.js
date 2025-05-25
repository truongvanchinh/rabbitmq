const amqplib = require('amqplib')

//.env
const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'
const amqp_url_docker = 'amqp://localhost:5672'

const sendQueue = async ({ msg }) => {
    try {
        //1. create Connect
        const conn = await amqplib.connect(amqp_url_docker)
        
        //2. create channel
        const channel = await conn.createChannel()

        //3. create name queue
        const nameQueue = 'q2'

        //4. create queue
        await channel.assertQueue(nameQueue, {
            durable: true // khi lỡ tay restart server thì message sẽ không biến mất
        })

        //5. send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg), {
            expiration: '20000', //TTL -> time to live
            persistent: true
        })

        //6. close conn and chanel


    } catch (error) {
        console.error(`Error::`, error.message)
        
    }
}

const msg = process.argv.slice(2).join(' ') || 'Hello'
sendQueue({ msg })