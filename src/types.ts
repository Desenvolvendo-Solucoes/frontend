import React from 'react'
import { MultiValue } from 'react-select'

export type DataType = {
  solicitante: string
  avatar: string
  matricula: string
  epi: string
  dataSolicitada: string
  quantidade: string
  imagem: string
  tamanho: string
  status: string
  nome: string
  cpf: string
  funcao: string
  base: string
  contrato: string
  email: string
  [key: string]: string
}

export type Data = {
  id: string
  [key: string]: string | (string | number)[] | React.JSX.Element
}

export type ColumnData = {
  Header: string
  accessor: string
  Cell?: React.FC<{
    id: string
    row: Data
    column: string
  }>
  width?: number
}

export type ResizableColumnProps = {
  name: string
}

export type TamanhosEpi =
  | { label: string; value: string }[]
  | MultiValue<{
      label: string
      value: string
    }>

export type RequestCreateEpi = {
  nome: string
  imagem: string
  marca: string
  estoque: string
  dias: string
  tamanhos: string
}

export type CUser = {
  nome: string
  matricula: string
  cpf: string
  contrato: string
  funcao: string
  cidade: string
}

export type ScreeOptions =
  | 'solicitacoes'
  | 'funcionarios'
  | 'epi'
  | 'equipamento'
  | 'solicitacoesEquip'

export type DataGridColumn =
  | React.FC<{
      id: string
      row: Data
    }>
  | React.FC<Data>
  | string

export type GetAllHoleriteResponse = {
  status: 'loading' | 'finised'
  data: string
  holerites: {
    data: string
    holerite: string
    matricula: string
    nome: string
  }[]
  contrato: string
}[]

export type Holerite = {
  id: string
  holerite: string
  matricula: string
  nome: string
  atualizado: string
}

export type UserContextType = {
  nome: string | null
  funcao: string | null
  regiao: string | null
  matricula: string | null
  base: string | null
  cidade: string | null
  cpf: string | null
  rh: boolean | null
  email: string | null
  contrato: string | null
}
