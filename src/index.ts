import mongoose from'mongoose'
import app from './app'

import appConfig from './config/app.config'
import dbConfig from './config/db.config'

app.listen(appConfig.port, () => {
	console.log(`Server running in port: ${appConfig.port}`)

	const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`

	mongoose.connect(uri, (err) => {
		if (err){
			console.log(err)
		} else {
			console.log('Connected to database')
		}
	})
})