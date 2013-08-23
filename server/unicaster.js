// Generated by CoffeeScript 1.6.3
(function() {
  var Request, Response, Unicaster;

  Request = (function() {
    function Request(type, params) {
      this.type = type;
      this.params = params;
    }

    return Request;

  })();

  Response = (function() {
    function Response(pubnub, type, uuid) {
      this.pubnub = pubnub;
      this.type = type;
      this.uuid = uuid;
    }

    Response.prototype.end = function(message) {
      if (!(this.uuid == null)) {
        return this.pubnub.publish({
          channel: this.uuid,
          message: message
        });
      }
    };

    return Response;

  })();

  Unicaster = (function() {
    function Unicaster(pubnub) {
      this.pubnub = pubnub;
      this.listeners = {};
    }

    Unicaster.prototype._dispatch = function(type, data) {
      var req, resp;
      if (!(this.listeners[type] == null)) {
        req = new Request(type, data);
        resp = new Response(this.pubnub, type, data.uuid);
        return this.listeners[type](req, resp);
      }
    };

    Unicaster.prototype.on = function(type, callback) {
      var _this = this;
      this.listeners[type] = callback;
      return this.pubnub.subscribe({
        channel: type,
        callback: function(data) {
          return _this._dispatch(type, data);
        }
      });
    };

    return Unicaster;

  })();

  module.exports = {
    listen: function(pubnub) {
      return new Unicaster(pubnub);
    }
  };

}).call(this);