const fs   = require('fs')
const path = require('path')

module.exports = (ctx) => {
    const register = () => {
        ctx.helper.uploader.register('moon-txom', {
            handle,
            name: 'moon-txom玄兔图床',
            config: config
        })
    }

    const postOptions = (args) => {
        return {
            method: 'POST',
            url: args.api,
            headers: {
                contentType: 'multipart/form-data',
                Cookie: args.cookie
            },
            formData: {
                file: args.image,
                Filename: args.fileName
            }
        }
    }

    const handle = async (ctx) => {
        let userConfig = ctx.getConfig('picBed.moon-txom')
        if (!userConfig.api) {
            ctx.emit('notification', {
                title: '请配置API地址',
                body: '打开浏览器查看API地址',
                text: 'https://zhuanlan.zhihu.com/p/597017126'
            })
            return
        }
        if (!userConfig.cookie) {
            ctx.emit('notification', {
                title: '请配置cookie',
                body: '打开浏览器查看cookie的获取',
                text: 'https://zhuanlan.zhihu.com/p/597017126'
            })
            return
        }
        const api     = userConfig.api
        const cookie  = userConfig.cookie
        const imgList = ctx.output
        for (let i in imgList) {
            let image = imgList[i].buffer
            if (!image && imgList[i].base64Image) {
                image = Buffer.from(imgList[i].base64Image, 'base64')
            }
            const data     = new Uint8Array(image)
            const fileName = imgList[i].fileName
            const filePath = path.join(__dirname, fileName)

            await fs.writeFileSync(filePath, data)

            let args      = {}
            args.api      = api
            args.cookie   = cookie
            args.fileName = fileName
            args.image    = fs.createReadStream(filePath)

            const postConfig = postOptions(args)
            let body         = await ctx.Request.request(postConfig)
            fs.unlink(filePath, () => {})
            body = JSON.parse(body)
            if (body.response.code === 0) {
                delete imgList[i].base64Image
                delete imgList[i].buffer

                let url           = body.data.url.url.replace('http', 'https')

                imgList[i].imgUrl = url+"/640"
                imgList[i].url    = url+"/0"
            } else {
                ctx.emit('notification', {
                    title: '上传失败',
                    body: body.response.msg
                })
                throw new Error(body.response.msg)
            }
        }
        return ctx
    }

    const config = ctx => {
        let userConfig = ctx.getConfig('picBed.moon-txom')
        if (!userConfig) {
            userConfig = {}
        }
        return [
            {
                name: 'api',
                type: 'input',
                default: userConfig.api,
                required: true,
                message: 'api',
                alias: 'api'
            },
            {
                name: 'cookie',
                type: 'input',
                default: userConfig.cookie,
                required: true,
                message: 'cookie',
                alias: 'cookie'
            }
        ]
    }

    return {
        uploader: 'moon-txom',
        config: config,
        register
    }
}