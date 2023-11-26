const isstring = (value) => {
    return typeof (value)== 'string' && value.trim().length > 0 ? value.trim() : ""
    
}

module.exports = {
    isstring
}