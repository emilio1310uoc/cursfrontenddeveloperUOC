export const storage = {
  get(key){
    return JSON.parse(localStorage.getItem(key))
  },
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  },
  delete(key){
    localStorage.removeItem(key)
  }
}