
function validName(name) {
    if (typeof name !== 'string') return false
    return /^[a-zA-Z. ]{3,20}$/.test(name)
}

function validMail(email) {
    if (typeof email !== 'string') return false
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}
function validImage(files) {
    if (!files) return false
    let type = files.mimetype
    type = type.substr(0, type.indexOf('/'))
    if (type == 'image') return true
    return false
}

module.exports = { validName, validMail, validImage }