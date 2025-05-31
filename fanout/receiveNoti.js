const amqp = require('amqplib')

const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'

const receivePost = async () => {
    try {
        const conn = await amqp.connect(amqp_url_cloud)

        const chanel = await conn.createChannel()

        const nameExchange = 'post'

        await chanel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })

        const {
            queue
        } = await chanel.assertQueue('', {
            exclusive: true
        })

        console.log(`[x]:::queue -> ${queue}`);
        
        await chanel.bindQueue(queue, nameExchange, '')

        await chanel.consume(queue,(msg)=>{
            console.log(`[x]::: consume, msg:::${msg.content.toString()}`);            
        }, {
            noAck:true
        })
    } catch (error) {
        console.error(error);
    }
}

receivePost()