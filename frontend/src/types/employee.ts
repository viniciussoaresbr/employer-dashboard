export interface IEmployee {
  id?: string;
  avatar?: string;
  name: string;
  cpf: string;
  email: string;
  date: Date;
  formattedDate?: string;
  status: 'Ativo' | 'Inativo';
  cep: string;
  state: string;
  city: string;
  street: string;
  district: string;
}

export interface IEmployeeData extends IEmployee {
  avatarId?: string;
}
