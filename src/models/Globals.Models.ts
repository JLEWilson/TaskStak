const formatForServer = (string: String) => {
  return string + " : "
}
const taskText: String = "TASK"
const userText: String = "USER"
export const taskIdModifier = formatForServer(taskText)
export const userIdModifier = formatForServer(userText)
