import * as solidity from "@solidity-parser/parser"
import {SyntaxError} from "./solidity"

export interface ParseResult {
    imports: string[]
    contracts: string[]
}

export const parse = (code: string): ParseResult => {
    const parsedCode = solidityParse(code)

    const result: ParseResult = {
        imports: [],
        contracts: []
    }

    solidity.visit(parsedCode, {
        ImportDirective: (node) => {
            result.imports.push(node.path)
        },
        ContractDefinition: (node) => {
            result.contracts.push(node.name)
        }
    })

    return result
}

const solidityParse = (code: string) => {
    try {
        const parsedCode = solidity.parse(code, {
            tolerant: true
        })
    
        if (parsedCode.errors != undefined) {
            throw new ParseError("syntax errors", parsedCode.errors)
        }

        return parsedCode
    } catch (err) {
        if (err instanceof ParseError) {
            throw err
        }

        if (err instanceof Error) {
            throw new ParseError(err.message, [])
        }

        console.error(err)
        throw new ParseError("unknown syntax error", [])
    }
}

export class ParseError extends Error {
    public readonly syntaxErrors: string[]

    constructor(error: string, syntaxErrors: SyntaxError[]) {
        super(error)
        Object.setPrototypeOf(this, ParseError.prototype);

        this.syntaxErrors = syntaxErrors.map((error) => `${error.line}:${error.column} - ${error.message}`)
    }
}