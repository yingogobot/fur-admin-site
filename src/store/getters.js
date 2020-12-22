const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  id: state => state.user.id,
  position: state => state.user.position,
  errorLogs: state => state.errorLog.logs
}
export default getters
