const rooms = {}

const addUserToRoom = (id, username, roomId) => {
    let shouldHost = false 

    // create a room if its new
    if (rooms[roomId] === undefined) {
        rooms[roomId] = []

        // first users are hosts
        shouldHost = true
    }

    const user = { id, username, host: shouldHost }
    rooms[roomId] = [...rooms[roomId], user]

    return user
}

const deleteUserRoom = (roomId) => {
    delete rooms[roomId]
}

const getHostIdFromRoom = (roomId) => {
    let hostId = -1

    for (const room in rooms) {
        if (room === roomId) {
            rooms[room].forEach(function (user) {
                if (user.host) {
                    hostId = user.id
                }
            })
        }
    }

    return hostId
}

const setRoomHostById = (id, roomId, isHost) => {  
    for (const room in rooms) {
        if (room === roomId) {
            rooms[room].forEach(function (user) { 
                if (user.id === id) {
                    user.host = isHost
                }
            })
        }
    }
}

const getUserByIdFromRoom = (id, roomId) => {
    let foundUser = {}

    for (const room in rooms) {
        if (room === roomId) {
            rooms[room].forEach(function (user) {
                if (user.id === id) {
                    foundUser = user
                }
            })
        }
    }

    return foundUser
}

const deleteUserFromRoom = (id, roomId) => {
    for (const room in rooms) {
        if (room === roomId) {
            rooms[room].forEach(function (user, index) {
                if (user.id === id) {
                    rooms[room].splice(index, 1)
                }
            })
        }
    }
}

const getUsersFromRoom = (roomId) => {
    for (const room in rooms) {
        if (room === roomId) {
            return rooms[room]
        }
    }
}

const getTotalUsersInRoom = (roomId) => { 
    if(rooms[roomId] === undefined) {
        return 0
    } else { 
        return getUsersFromRoom(roomId).length
    }
}


module.exports = {
    addUserToRoom,
    deleteUserFromRoom,
    getUserByIdFromRoom,
    getUsersFromRoom,
    setRoomHostById,
    getTotalUsersInRoom,
    getHostIdFromRoom,
    deleteUserRoom,
}