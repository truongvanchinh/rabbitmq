const amqp = require('amqplib')

const amqp_url_cloud = 'amqps://lqjluayr:aWxlT7Z4H38VgBOgCS_wurR8PwwpEWu4@fuji.lmq.cloudamqp.com/lqjluayr'

const post = async ({ msg }) => {
    try {
        const conn = await amqp.connect(amqp_url_cloud)

        const chanel = await conn.createChannel()

        const nameExchange = 'post'

        await chanel.assertExchange(nameExchange, 'fanout', {
            durable: false
        })

        await chanel.publish(nameExchange, '', Buffer.from(msg))

        console.log(`[msg]::: ${msg}`);

        setTimeout(()=>{
            conn.close()
            process.exit(0)
        }, 2000)
    } catch (error) {
        console.error(error);
    }
}

const msg = process.argv.slice(2).join(' ') || "HELLO <MAN>"
post({ msg })