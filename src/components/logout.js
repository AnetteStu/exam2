export default function logoutUser() {
  localStorage.removeItem("username")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("manager")
  localStorage.removeItem("avatar")
  window.location.reload()
}