export interface IEmployee {
  avatar?: string;
  name: string;
  cpf: string;
  email: string;
  date: Date;
  status: 'Ativo' | 'Inativo';
  cep: string;
  state: string;
  city: string;
  street: string;
  district: string;
}

export interface IEmployeeData extends IEmployee {
  avatarId: string;
}
