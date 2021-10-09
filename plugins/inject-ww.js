import Worker from '~/assets/js/data.worker.js'

export default (_, inject) => {
  inject('worker', {
    createWorker () {
      return new Worker()
    }
  })
}
