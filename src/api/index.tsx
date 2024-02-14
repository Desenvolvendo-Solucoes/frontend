import { CUser, Data, RequestCreateEpi } from '@/types'
import axios, { AxiosRequestConfig } from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { headers } from 'next/headers'
import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
})

export const ValidaToken = () => {
  return new Promise((resolve, reject) => {
    const token = getCookie('access_token')
    const Token = {
      headers: { Authorization: `Bearer ${token}` },
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    if (token === undefined) reject({ error: 'token undefined' })

    instance
      .get('', Token)
      .then((response) => {
        resolve(true)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const signin = (email: string, senha: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    instance
      .post('/auth/login', null, {
        params: {
          email,
          senha,
        },
      })
      .then((response) => {
        setCookie('access_token', response.data.access_token)
        toast.success('logado com sucesso')
        resolve(true)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error('Email ou senha incorreto, favor verificar!')
          reject(err)
        }
      })
  })
}

export const getEpiSolicitados = (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const Token = tokenHeader()

    instance
      .get('/epi/solicitacoes', Token)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getEquipSolicitados = (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const header = tokenHeader()
    instance
      .get('/equip/solicitacoes', header)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getEpiCadastrado = (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const Token = tokenHeader()

    instance
      .get('/epi/cadastrados', Token)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getEquipCadastrado = (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const headers = tokenHeader()
    instance
      .get('/equip/cadastrados', headers)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getAllUsers = (): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const header = tokenHeader()
    instance
      .get('/user/getAll', header)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const updateEpiStatus = (id: string, status: string, rejectText?: string): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const token = tokenHeader()

    instance
      .post(`/epi/updatestatus?status=${status}&id=${id}&rejectText=${rejectText == undefined ? '-' : rejectText}`,
        {},
        token
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const updateEquipStatus = (id: string, status: string, rejectText?: string): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const token = tokenHeader()

    instance
      .post(`/equip/updatestatus?status=${status}&id=${id}&rejectText=${rejectText == undefined ? '-' : rejectText}`,
        {},
        token
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const createEpi = ({
  dias,
  estoque,
  imagem,
  marca,
  nome,
  tamanhos,
}: RequestCreateEpi): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const header = tokenHeader()
    instance.put('/epi/create', header, {
      params: {
        nome,
        dias,
        estoque,
        tamanhos,
        imagem,
        marca,
      },
    })
  })
}

export const createUser = ({
  base,
  cidade,
  cpf,
  funcao,
  nome,
  matricula,
  regiao,
}: CUser) => {
  return new Promise((resolve, reject) => {
    const header = tokenHeader()
    instance
      .post(`/user/create?nome=${nome}&base=${base}&cpf=${cpf}&funcao=${funcao}&cidade=${cidade}&matricula=${matricula}&regiao=${regiao}`, {}, header)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

const tokenHeader = () => {
  const token = getCookie('access_token')
  const Token: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  return Token
}
