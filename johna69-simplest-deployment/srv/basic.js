module.exports = class basic extends cds.ApplicationService {
    ping() {return "pong"}
    hello(to) {return `Hello ${to}!`}
    sum(a,b) {return a+b}
}