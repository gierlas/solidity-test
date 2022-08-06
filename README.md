## Solidity Test 

There are two options to run the sample application

### In system node

To run the project you're required to have the Node 16 and yarn.

1. Unzip the package
2. Access the project using CLI
3. Execute `yarn install` in CLI
4. Execute `yarn run run` in CLI

### Docker

To run the project you're required to have Docker

1. Unzip the package
2. Access the project using CLI
3. Execute `docker build -t solidity-test .` in the CLI
4. Execute `docker run -dp 3001:3001 solidity-test` in the CLI

### Testing the app

There are unit tests. You can execute them in the CLI (if you have Node available in your system) using `yarn test` command.

To test the API you can use some some API Tester like Postman. 
You can perform requests to `http://localhost:3001`. 
The server accepts Json payload as well as x-www-form-urlencoded.

The server expects the `code` to be provided.

Example JSON payload:
```
{
    "code": "import \"VarysContractBase.sol\"; import \"VarysContractExtras.sol\"; contract VarysContract { mapping (uint => address) public addresses; }"
}
```
