import app from './app'
import './database'

export const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})