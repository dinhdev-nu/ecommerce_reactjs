'use strict'

const setToCookie = ({ key, values, expired }) => {
    let cookie = `${key}=${JSON.stringify(values)}; path=/; secure;`
    expired && (cookie += `max-age=${expired.toString()};`)
    
    // For BE only
    // cookie += 'secure; httpOnly;  samesite=strict;'
    document.cookie = cookie
}

const getFromCookie = (key) => {
    const data = document.cookie.split('; ')
    return data.find(cookie => cookie.startsWith(key))?.split('=')[1]
}

const removeCookie = (key) => {
    document.cookie = `${key}=; path=/; max-age=0`
}

export {
    setToCookie,
    getFromCookie,
    removeCookie

}