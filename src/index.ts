import express from 'express'
import {parse, ParseError} from './parse'

const port = 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use((err: any, req: express.Request, res: express.Response, next: (err: Error) => void) => {
    if (res.headersSent) {
        return next(err)
    }

    if (err.hasOwnProperty("type") && err.type === "entity.parse.failed") {
        res.status(400)
        res.json({error: `Bad request: ${err.message}`})
        return
    }

    console.error(err)
    res.status(500)
    res.json({error: "Internal error"})
})

app.post("/", (req, res) => {
    const code = req.body.code
    if (code == "" || code === undefined) {
        res.status(400)
        res.send(JSON.stringify({error: "Missing code"}))
        return
    }

    try {
        const result = parse(code)
        res.json(result)
    } catch (err) {
        if (err instanceof ParseError) {
            res.status(400)    
            res.json({error: err.message, syntaxErrors: err.syntaxErrors})
            return
        }
        
        console.error(err)
        res.status(500)
        res.json({error: "Something went wrong. Check logs."})
    }
})

app.listen(port, () => {
    console.log(`Application listening on http://localhost:${port}/`)
})