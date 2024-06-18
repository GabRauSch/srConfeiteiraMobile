const validatePhoneNumber = (phone: string) => {
    const re = /^(\+?\d{1,4}?[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-\s]{7,}$/;
    return re.test(phone);
};
export const validateEditProfile = (name: string, phone: string)=>{
    if(name.length < 3 || name.length > 25) return 'Nome deve ter entre 3 e 25 caractéres';
    if(!validatePhoneNumber(phone) && !!phone) return 'Telefone inválido'
    return null
}