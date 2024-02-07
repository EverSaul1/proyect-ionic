

export class UsuarioModels {
  constructor(
      public email: string,
      public fullName: string,
      public isActive: boolean,
      public avatar?: string,
      public roles?: [],
      public favorites?: [],
      public id?: string,
      public token?: string,
  ) {}
}
