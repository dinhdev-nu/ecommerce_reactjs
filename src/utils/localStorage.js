'use struct'

const setToLocalStorage = ({ key, values }) => {
    localStorage.setItem(key, JSON.stringify(values))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key)
}

const setMulltiToLocalStorage = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
    })
}

export {
    setToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    setMulltiToLocalStorage
}