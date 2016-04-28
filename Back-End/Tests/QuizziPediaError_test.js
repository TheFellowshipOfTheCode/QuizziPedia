/**
 * Created by mattia on 28/04/16.
 */
var QuizziPediaError = require('../App/Controller/Errors/QuizziPediaError.js');
var q = new QuizziPediaError(123,"asd","qwe");

var expect = require('expect');

describe("QuizziPediaError", function() {
    it("check if it returns the error code", function() {
        expect(q.getCode()).toEqual(123);
    });

    it("check if it returns the error title", function() {
        expect(q.getTitle()).toEqual('asd');
    });

    it("check if it returns the error title", function() {
        expect(q.getMessage()).toEqual('qwe');
    });

    it("check if it returns the error as a string", function() {
        expect(q.toString()).toEqual('123 asd: qwe.');
    });

    /**it("check if it returns the error as a JSON", function() {
        expect(q.toJSON()).toEqual({ "code": 123, "title": "asd", "message": "qwe" });
    });**/
});

