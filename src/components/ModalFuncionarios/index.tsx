import { createUser } from '@/api'
import React, { useState } from 'react'
import { XCircle } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading'
import Dropdown from '@/components/Dropdown'

interface IModal {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  refresh: React.Dispatch<React.SetStateAction<number>>
}

const ModalFuncionarios: React.FC<IModal> = ({ isOpen, setOpen, refresh }) => {
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [cpf, setCpf] = useState('')
  const [funcao, setFuncao] = useState('')
  const [contrato, setContrato] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [cidade, setCidade] = useState('')
  const dropdownOptions: string[] = [
    'COPASA INTERIOR LESTE',
    'COPASA INTERIOR OESTE',
    'COPASA INTERIOR NORTE',
    'COPASA INTERIOR SUL',
  ]

  const clearParametros = () => {
    setMatricula('')
    setNome('')
    setCpf('')
    setCidade('')
    setFuncao('')
    setContrato('')
  }

  const create = () => {
    setLoading(true)
    createUser({
      cpf,
      funcao,
      matricula,
      nome,
      contrato,
      cidade,
    })
      .then(() => {
        clearParametros()
        refresh(Math.random() * 100)
        setLoading(false)
        toast.success('Cadastrado com sucesso!')
      })
      .catch((e) => {
        toast.error('Erro ou cadastrar', e)
        setLoading(false)
      })
  }

  const isValidCPF = (cpf: string) => {
    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) {
      resto = 0
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    soma = 0
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) {
      resto = 0
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false
    }

    return true
  }

  const onSubmit = () => {
    // eslint-disable-next-line prefer-regex-literals
    const cpfRegex = new RegExp(/^\d{3}\d{3}\d{3}\d{2}$/)
    // eslint-disable-next-line prefer-regex-literals
    const matriculaRegex = new RegExp(/^[0-9]{6}$/)

    if (!cpfRegex.test(cpf)) {
      toast.error('Informe um cpf valido!')

      return
    }
    if (contrato === '') {
      toast.error('Selecione um contrato')
      return
    }
    if (!matriculaRegex.test(matricula)) {
      toast.error('Informe uma matricula valida!')
      return
    }
    if (/^(\d)\1+$/.test(cpf)) {
      toast.error('Informe um cpf valido!')
      return
    }
    if (isValidCPF(cpf) === false) {
      toast.error('Informe um cpf valido!')
      return
    }
    create()
  }

  if (isOpen) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-rgba-modal">
          <div
            className="fixed left-3/4 top-3  transform rounded-md bg-white p-3"
            style={{ width: '400px', left: '45%', top: '10%' }}
          >
            <button
              className="flex h-2 flex-row bg-black"
              onClick={() => {
                clearParametros()
                setOpen(!isOpen)
              }}
            >
              <XCircle className="fixed" style={{ left: '90%' }} />
            </button>
            <h2 className="p-2 font-bold">Cadastrar Funcionário</h2>
            <input
              className="mb-4 w-full rounded-md border p-3"
              type="text"
              placeholder="Matrícula"
              value={matricula}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d{0,6}$/.test(value)) {
                  setMatricula(value)
                }
              }}
              required
            />
            <input
              className="mb-4 w-full rounded-md border p-3"
              type="text"
              placeholder="Nome"
              pattern="[a-zA-ZÀ-ÿ\s]*"
              value={nome}
              maxLength={60}
              onChange={(e) => {
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/
                if (regex.test(e.target.value)) {
                  setNome(e.target.value)
                }
              }}
              required
            />
            <input
              className="mb-4 w-full rounded-md border p-3"
              type="text"
              placeholder="CPF"
              pattern="[0-9]*"
              maxLength={11}
              value={cpf}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d{0,11}$/.test(value)) {
                  setCpf(value)
                }
              }}
              required
            />
            <input
              className="mb-4 w-full rounded-md border p-3"
              type="text"
              placeholder="Função"
              maxLength={40}
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
              required
            />

            <input
              className="mb-4 w-full rounded-md border p-3"
              type="text"
              placeholder="Cidade"
              pattern="[a-zA-ZÀ-ÿ\s]*"
              maxLength={40}
              value={cidade}
              onChange={(e) => {
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/
                if (regex.test(e.target.value)) {
                  setCidade(e.target.value)
                }
              }}
              required
            />
            <div className="mb-4 w-full rounded-md border">
              <Dropdown
                options={dropdownOptions}
                setSelectedOption={setContrato}
                page={'addFuncionarios'}
              />
            </div>
            {/* <button
              className="w-full rounded-md bg-primary p-4 text-white"
              onClick={() => setOpen(!isOpen)}
            >
              Download Padrão
            </button>
            <div className="relative mb-2 mt-2">
              <input
                className="placeholder-text w-full cursor-pointer rounded-md border border-gray-300 p-3 text-center text-white file:border-none file:bg-white file:text-white"
                type="file"
                placeholder="Cadastro em massa"
                accept=".csv"
              />
              <span className="pointer-events-none absolute left-0 top-0 w-full cursor-pointer p-3 text-center text-primary">
                Cadastro em massa
              </span>
            </div> */}
            <button className="w-full rounded-md bg-primary p-4 text-white">
              {loading ? <Loading /> : 'Cadastrar funcionário'}
            </button>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    )
  }
}

export default ModalFuncionarios
