
const errorMessages = {
    "107": { message: "Ocorreu um erro na requisição, contate o suporte", link: 'http://suporte.com' },
    "117": { message: "Ocorreu um erro na requisição, contate o suporte", link: 'http://suporte.com' },
    "155": { message: '$1 não é uma data válida', link: 'http://suporte.com' },
    "114": { message: 'Item não foi encontrado, tente recarregar o app e tentar novamente', link: 'suporte.com' },
    "106": { message: 'Erro ao inserir item', link: 'suporte.com' },
    "104": { message: 'Item não foi encontrado, tente recarregar o app e tentar novamente', link: 'suporte.com' },
    "304": { message: 'Item não foi encontrado, tente recarregar o app e tentar novamente', link: 'suporte.com' },
    "144": { message: 'Preencha todos os campos', link: 'suporte.com' },
    "145": { message: 'Campo $1 precisa ser do tipo $2', link: 'suporte.com' },
    "101": { message: 'Erro ao criar, tente novamente', link: 'suporte.com' },
    "108": { message: 'Item com esse(a) $1 já existe', link: 'suporte.com' },
    "103": { message: 'Não foi possível, tente novamente', link: 'suporte.com' },
    "102": { message: 'Não foi possível fazer a alteração, tente novamente', link: 'suporte.com' },
    "120": { message: 'Not authorized', link: 'suporte.com' },
    "161": { message: 'Imagem não foi carregada, tente novamente', link: 'suporte.com' },
    "146": { message: 'Email e/ou senha não condizem', link: 'suporte.com' },
    "171": { message: 'Email não foi enviado', link: 'suporte.com' },
    "131": { message: 'Não foi possível mandar a mensagem', link: 'suporte.com' },
    "126": {message: "Email e/ou nome estão em uso", link: ''}
};

const successMessages = {
    "202": {message: "Atualizado com sucesso"},
    "203": {message: "Deletado com sucesso"}
}
type ErrorCode = keyof typeof errorMessages
type SuccessCode = keyof typeof successMessages

const getErrorMessageFromResponse = (code: ErrorCode, replacements?: string[]) => {
    const errorCode = code
    const { message, link } = errorMessages[errorCode] || { message: 'Erro no sistema, contate o suporte', link: 'suporte.com' };

    replacements?.forEach((replacement, key)=>{
        message.replace(`$${key}`, replacement);
    })

    return message;
}
const getSuccessMessageFromResponse = (code: SuccessCode)=>{
    const {message} = successMessages[code] || {message: "Sucesso! Na vida e no amor"};
    return message
}

export const handleResponse = (response: any): {message: string, type: 'error' | 'success'}=>{
    const error = getErrorMessageFromResponse(response.code); 
    if(error) return {message: error, type: 'error'}

    const success = getSuccessMessageFromResponse(response.code) 
    return {message: success, type: 'success'}
}