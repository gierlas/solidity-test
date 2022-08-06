import { parse, ParseResult, ParseError } from "./parse"

interface ParseSuccessTestCase {
    title: string
    input: string
    expectedOutput: ParseResult
}

const successTestCases: ParseSuccessTestCase[] = [
    {
        title: "exercise example should pass",
        input: `
            import "VarysContractBase.sol";
            import "VarysContractExtras.sol";
            
            contract VarysContract {
                mapping (uint => address) public addresses;
            }
        `,
        expectedOutput: {
            imports: [
                "VarysContractBase.sol",
                "VarysContractExtras.sol"
            ],
            contracts: [
                "VarysContract"
            ]
        }
    },
    {
        title: "should not fail on empty input",
        input: ``,
        expectedOutput: {
            imports: [],
            contracts: []
        }
    }
]

describe("parse success test cases", () => {
    successTestCases.forEach((testCase) => {
        it(testCase.title, () => {
            const result = parse(testCase.input)
            expect(result.contracts.sort()).toEqual(testCase.expectedOutput.contracts.sort())
            expect(result.imports.sort()).toEqual(testCase.expectedOutput.imports.sort())
        })
    })
})

describe("parse fail test cases", () => {
    it("should throw parse error on syntax errors", () => {
        const input = `
            import "VarysContractBase.sol"
            import "VarysContractExtras.sol"
            
            contract VarysContract {
                mapping (uint => address) public addresses;
            }
        `

        expect(() => parse(input)).toThrowError(ParseError)
    })

    it("should fail", () => {
        const input = `import`

        expect(() => parse(input)).toThrowError(ParseError)
    })
})