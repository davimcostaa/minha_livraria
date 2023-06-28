const usuariosValidator = {
    nome: {
        required: "Campo obrigatório",
        minLength: {
          value: 10,
          message: 'O mínimo de caracteres é 10'
        },
    
        maxLength: {
          value: 80,
          message: 'O máximo de caracteres é 80'
        }
      },
  
    telefone: {
      required: "Campo obrigatório!!!",
    }, 

    usuario: {
      required: "Campo obrigatório!!!",
    }, 


    email: {
      required: "Campo obrigatório",
    }, 
 
}

export default usuariosValidator