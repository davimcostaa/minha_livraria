const editoraValidator = {
    nome: {
        required: "Campo obrigatório",
        minLength: {
          value: 3,
          message: 'O mínimo de caracteres é 3'
        },
    
        maxLength: {
          value: 80,
          message: 'O máximo de caracteres é 80'
        }
      },
  
}

export default editoraValidator