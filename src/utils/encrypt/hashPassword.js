const bcrypt = require('bcrypt');

/** 비밀번호 암호화 */
const hashPassword = async function(password) {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    } catch (err) {
        console.error(err);
        throw new Error('비밀번호 암호화 오류');
    }
}

/** 비밀번호, 비밀번호 확인 값 검사 */
const comparePassword = async function(password, passwordCheck) {
    try {
        // 입력값 검사
        if (password === "" || passwordCheck === "") {
            return res.status(400).json({
                resultCode: "400",
                message: "정보를 모두 입력하세요."
            });
        }

        if (password !== passwordCheck) {
            return {
                resultCode: "401",
                message: "비밀번호가 일치하지 않습니다.",
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error('비밀번호 검사 오류');
    }
}

/** 비밀번호 값 검사 */
const isPasswordValid = async function(password, findUserPassword) {
    try {
        const isPasswordValid = await bcrypt.compare(password, findUserPassword);
        if (!isPasswordValid) {
          return {
            resultCode: "400",
            message: "비밀번호가 맞지 않습니다."
          }
        }
    } catch (err) {
        console.error(err);
        throw new Error('비밀번호 비교 오류');
    }
}

module.exports = { hashPassword, comparePassword, isPasswordValid };