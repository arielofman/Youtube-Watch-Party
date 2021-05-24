const getCurrentTime = () => {
    const today = new Date()

    const hours = today.getHours()
    const minutes = today.getMinutes() 

    return hours + ':' + minutes  
}
 
module.exports = { getCurrentTime }