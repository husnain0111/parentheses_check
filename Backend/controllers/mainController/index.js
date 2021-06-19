let controller = {};

controller.checkBrackets = async function (req, res) {
  // let str = "{return(({bar: 'hello'{};})";
  
  let str = req.body.code;
  // console.log("value",str);
  // console.log("length",str.length)
  let stack = [];
  let map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let i = 0; i < str.length; i++) {
    // If character is an opening brace add it to a stack
    if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
      stack.push(str[i]);
    }
    //  If that character is a closing brace, pop from the stack, which will also reduce the length of the stack each time a closing bracket is encountered.
    else if (str[i] === ")" || str[i] === "}" || str[i] === "]") {
      let last = stack.pop();

      //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the map, then return false
      if (str[i] !== map[last]) {
        await res.status(200).json({
          valid: false,
          errorMsg: "Bracket " + stack + " is not being closed properly",
        });
      }
    }
  }
  // By the completion of the for loop after checking all the brackets of the str, at the end, if the stack is not empty then fail
  if (stack.length !== 0) {
     await res.status(200).json({
       valid: false,
       errorMsg: "Bracket " + stack + " is not being closed properly",
     });
  }else{
    await res.status(200).json({
      valid: true,
    });
  }

   
};


module.exports = controller;
