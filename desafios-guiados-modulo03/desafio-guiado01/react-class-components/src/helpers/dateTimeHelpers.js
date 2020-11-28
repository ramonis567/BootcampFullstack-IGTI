function leftPad(value, count = 2, char = "0"){
  const valueString = value.toString();
  let newValue = valueString;
  
  if(valueString.length < count){
    for (let i = 0; i < count - valueString.length; i++) {
      newValue = char + value;
    }
  }

  return newValue;
}

function getNewTimestamp(){
  const now = new Date();
  let result = '';

  result += leftPad(now.getDate());
  result += "/";
  result += leftPad(now.getMonth() + 1);
  result += "/";
  result += now.getFullYear();
  result += " ";
  result += leftPad(now.getHours());
  result += ":";
  result += leftPad(now.getMinutes());
  result += ":";
  result += leftPad(now.getSeconds());
  result += ".";
  result += leftPad(now.getMilliseconds(), 3);

  return result;
}

export { getNewTimestamp }