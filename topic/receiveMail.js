const amqp = require('amqplib')

const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'

const receiveMail = async () => {
    const conn = await amqp.connect(amqp_url_cloud)

    const chanel = await conn.createChannel()

    const nameExchange = 'send_email'

    await chanel.assertExchange(nameExchange, 'topic', {
        durable:false
    })

    const { queue } = await chanel.assertQueue('', { exclusive: true })


    const arg = process.argv.slice(2)
    if (!arg.length) {
        process.exit(0)
    }

    console.log(`waiting queue:::${queue}, arg:::${arg}`);

    arg.forEach(async key => {
        await chanel.bindQueue(queue, nameExchange, key)
    })

    await chanel.consume(queue, msg => {
        console.log(`[x]::: consume ::: ${msg.fields.routingKey}:::msg :::${msg.content.toString()}`);
    })
}

receiveMail()