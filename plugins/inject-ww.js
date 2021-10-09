import Worker from '~/assets/js/worker.js'

export default (_, inject) => {
  inject('worker', {
    createWorker () {
      return new Worker()
    }
  })
}
