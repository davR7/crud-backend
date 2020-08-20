exports.errorHandler = (error, res) => {
    if (error.hasOwnProperty('_message')) {
        const { _message: msg } = error
        if (msg.indexOf('validation failed') !== -1) {
            error.status = 400
        }
    }
    const { status, message } = error
    res.status(status || 500)
    res.json({ error: error.message })
}
