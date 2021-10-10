function App({chaiApp, baseUrl = ''}) {
  this.chaiApp = chaiApp;
  this.baseUrl = baseUrl;
}

App.prototype.get = function(url) {
  return this.chaiApp.get(`${this.baseUrl}${url}`);
};

App.prototype.post = function(url) {
  return this.chaiApp.post(`${this.baseUrl}${url}`);
};

App.prototype.put = function(url) {
  return this.chaiApp.put(`${this.baseUrl}${url}`);
};

App.prototype.delete = function(url) {
  return this.chaiApp.delete(`${this.baseUrl}${url}`);
};

module.exports = App
