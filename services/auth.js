
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcrypt-nodejs'

export const createTokens = async(user, secret, secret2) => {
  const createToken = await jwt.sign(
    {
      user: _.pick(user, ['id', 'isAdmin']),
    },
    secret,
    {
      expiresIn: '1m'
    },
  )
  const createRefreshToken = await jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d'
    },
  )
  return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
  let userId = 0
  try {
    const { user: { id } } = jwt.decode(refreshToken)
    userId = id
  } catch (e) {
    console.log('erro decode refreshToken....', e)
    return {}
  }
  if (!userId) {
    return {}
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true })

  // console.log('user on refreshToken.............................................', user)
  if (!user) {
    console.log('!user on refreshToken.............................................', user)
    return {
      ok: false, erros: [{path: 'email', message: 'Email incorreto...'}]
    }
  }
  const refreshSecret = user.password + SECRET2
  try {
    // console.log('refreshSecret + SECRET2......', refreshSecret)
    const refresh = jwt.verify(refreshToken, refreshSecret)
    // jwt.verify(refreshToken, user.refreshSecret)
    console.log('verify refreshToken user on refreshToken.............................................', refresh)
  } catch (e) {
    console.log('erro verify refreshToken user on refreshToken.............................................', e)
    return {}
  }

  // const [newToken, newRefreshToken] = createTokens(user, SECRET, user.refreshSecret)
  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret)
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  }
}

export const tryLogin = async(email, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({ where: { email }, raw: true })
  if (!user) {
    console.log('user not found............')
    return {
      ok: false,
      errors: [{ path: 'email', message: 'nenhuma conta cadastrada neste Email!'}]
    }
  }

  console.log('validate user............')
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Senha incorreta!'}]
    }
    throw new Error('Invalid Login!')
  }

  const refreshTokenSecret = user.password + SECRET2
  const [ token, refreshToken ] = await createTokens(user, SECRET, refreshTokenSecret)

  return {
    ok: true,
    user,
    token,
    refreshToken,
  }
}
