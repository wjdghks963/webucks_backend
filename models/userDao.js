const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 바꿀 떄 암호화 해줘야함
const updateUserPassword = async (email, hashPassword) => {
  await prisma.$queryRaw`
    UPDATE users SET password=${hashPassword} WHERE email=${email};
    `;
};

const allUserInfo = async () => {
  const users = await prisma.$queryRaw`
    SELECT * FROM users;
    `;
  return users;
};

const createUser = async (email, hashPassword) => {
  await prisma.$queryRaw`
    INSERT INTO users(email, password) VALUES (${email}, ${hashPassword});
    `;
};

const findEmail = async (email) => {
  const [existEmail] = await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email};
    `;
  return existEmail;
};

const findPassword = async (userEmail) => {
  const [dbPassword] = await prisma.$queryRaw`
    SELECT password FROM users WHERE email=${userEmail};
    `;
  return dbPassword;
};

const findUserId = async (userEmail) => {
  const [userId] = await prisma.$queryRaw`
    select id from users where email=${userEmail};
    `;
  return userId.id;
};

module.exports = {
  updateUserPassword,
  allUserInfo,
  createUser,
  findEmail,
  findPassword,
  findUserId,
};
