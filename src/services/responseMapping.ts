const getMessageFromResponse = (code: string, object: string, error: string)=>{
    let message = ''
    switch(code){
        case '001': message = "Erro no servidor, contate o suporte!";
            break;
        case '002': message = `Erro ao criar ${object}, ${error}`;
            break;
    }

    return message
}