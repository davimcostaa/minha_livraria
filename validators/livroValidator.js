const livroValidator = {
    nome: {
        required: "Campo obrigatório!!!",
        minLength: {
          value: 3,
          message: 'O mínimo de caracteres é 3'
        },
    
        maxLength: {
          value: 80,
          message: 'O máximo de caracteres é 80'
        }
      },

    data: {
        required: "Campo obrigatório!!!",
      },   

    autor: {
        required: "Campo obrigatório!!!",
      },      

    editora: {
        required: "Campo obrigatório!!!",
      }, 

    genero: {
        required: "Campo obrigatório!!!",
      }, 
      
    paginas: {
        required: "Campo obrigatório!!!",
        minLength: {
          value: 2,
          message: 'Número inválido'
        },
      }, 

    capa: {
        required: "Campo obrigatório!!!",
      }, 
  
}

export default livroValidator

