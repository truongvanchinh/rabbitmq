const amqp = require('amqplib')

const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'

const sendMail = async () => {
    try {
        const conn = await amqp.connect(amqp_url_cloud)

        const chanel = await conn.createChannel()
    
        const nameExchange = 'send_email'
    
        await chanel.assertExchange(nameExchange, 'topic', {
            durable: false
        })
    
        const arg = process.argv.slice(2)
        const msg = arg[1] || 'Hello send mail'
        const topic = arg[0]
    
        console.log(`msg::${msg} ::: topic::: ${topic}`);
        
        await chanel.publish(nameExchange, topic, Buffer.from(msg))
    
        console.log(`[x]:::senmail is ok::${msg}`);
    
        setTimeout(() => {
            conn.close()
            process.exit(0)
        }, 2000)    
    } catch (error) {
        console.error(error);
    }
}

sendMail()