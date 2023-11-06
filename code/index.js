async function aNotSoRandomFunctionName() {
      return "hello from a function";
}

exports.lambda_handler = async function (event, context) {
    const returnFromFuncton = await aNotSoRandomFunctionName()
    try {
        // Your Lambda function logic here
    
        // If the operation is successful, you can return a successful response
        return {
          statusCode: 200, // HTTP status code
            body: event['body'] ,
        };
      } catch (error) {
        // If there's an error, you can return an error response
        return {
          statusCode: 500, // Appropriate HTTP status code for an error
          body: JSON.stringify({ error: 'An error occurred' }),
        };
      }
    };
    
