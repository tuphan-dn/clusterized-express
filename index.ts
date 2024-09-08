import express from 'express'
import cluster from 'cluster'
import process from 'node:process'

const app = express()
const cpus = 4

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(process.env.PORT, () => {
//   console.log(`👷 Worker listening on port ${process.env.PORT}`)
// })

if (cluster.isPrimary) {
  console.log(`⚡️ Primary listening on port ${process.env.PORT}`)
  for (let i = 0; i < cpus; i++) cluster.fork()
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  app.listen(process.env.PORT, () => {
    console.log(`👷 Worker listening on pid ${process.pid}`)
  })
}
