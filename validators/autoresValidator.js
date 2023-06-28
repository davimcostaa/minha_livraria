const autoresValidator = {
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
  
    data: {
      required: "Campo obrigatório",
    }, 

    genero: {
      required: "Campo obrigatório",
    }, 

    nacionalidade: {
      required: "Campo obrigatório",
      minLength: {
        value: 5,
        message: 'O mínimo de caracteres é 5'
      },
    }, 
}

export default autoresValidator