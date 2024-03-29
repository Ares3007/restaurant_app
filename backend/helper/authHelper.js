
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPass=async (myPlaintextPassword)=>{
    const hash=await bcrypt.hash(myPlaintextPassword, saltRounds)
    return (hash)
}

const comparePass=async (myPlaintextPassword, hash)=>{
   const compare= bcrypt.compareSync(myPlaintextPassword, hash);
   return(compare)
}

module.exports={
    hashPass,
    comparePass
}
