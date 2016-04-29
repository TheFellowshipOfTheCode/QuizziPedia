/**
 * Created by franco on 28/04/16.
 */
var Server = require('../Server.js');
var request = require("request");
var expect= require("expect")
describe("signin", function() {
        it("check authentication user", function(done) {
            var userJSON = {username: "fberton", password: "ciaociao"}
            request.post(
                "http://localhost:8080/:lang/signin",
                userJSON,
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var bJSON=JSON.parse(body);
                        if (!bJSON.success){
                             expect(bJSON.message).toBe("Login non effettuato");
                             done();
                        }
                        else{
                             expect(bJSON.user.username).toBe("fberton");
                             done();
                        }
                    }
                });
        });
});

describe("signup", function() {
    it("check registration user", function(done) {
        var userJSON = {name:"franco",surname:"berton",email:"francoberton@gmail.com",username: "fberton", password: "ciaociao"}
        request.post(
            "http://localhost:8080/:lang/signup",
            userJSON,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var bJSON=JSON.parse(body);
                    if (!bJSON.success){
                        expect(bJSON.message).toBe("Registrazione non effettuata");
                        done();
                    }
                    else{
                        expect(bJSON.user.username).toBe("fberton");
                        done();
                    }
                }
            });
    });
});

