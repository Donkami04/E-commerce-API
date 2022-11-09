const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = 'julantito#123';
  const hash = '$2b$10$nZMt/p7q.jLVMk1xO5G9rukWALtJeiiOihFG5Xb.9UQVO0MTeYKUi';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
};

verifyPassword();
