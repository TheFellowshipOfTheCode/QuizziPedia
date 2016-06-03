/*******************************************************************************
 * Name: UserDetailsServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::UserDetailsService_test;
 * Creation data: 03-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserDetailsServiceTest_20160603;
 * Update data: 03-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes =
{
        _id: '573b0733ade95afa018870e4',
        privilege: 'pro',
        name: 'Alberto',
        surname: 'Ferrara',
        email: 'albertoferrara92@gmail.com',
        username: 'aferrara',
        password: '$2a$08$CPcAgHvjZk2IHzLgcroCH.KnjkNsRXQ3HDDHXu3c/heZxRXpsVrxm'
};

describe("UserDetailsService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function() {
        module('QuizziPedia');
        inject(function (_UserDetailsService_, _$httpBackend_) {
            UserDetailsService = _UserDetailsService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenGET("/api/it/userdetails/aferrara").respond(objRes);
        httpBackend.whenPUT("/api/it/user/password").respond(function(method, url, data) {
            return [200, {code: 222, title: "Ok", message: "Dati utente aggiornati correttamente"}, {}];
        });
        httpBackend.whenPUT("/api/it/user/info").respond(function(method, url, data) {
            return [200, {code: 222, title: "Ok", message: "Dati utente aggiornati correttamente"}, {}];
        });
        httpBackend.whenPUT("/api/it/user/type").respond(function(method, url, data) {
            return [200, {code: 646, title: "Ok", message: "Cambio tipo effettuato correttamente"}, {}];
        });
        httpBackend.whenDELETE("/api/it/user").respond(function(method, url, data) {
            return [200, {code: 222, title: "Ok", message: "Utente eliminato"}, {}];
        });

    });

    /*3-Test veri e propri*/
    it("should give back the details of a user", function () {
        httpBackend.expectGET("/api/it/userdetails/aferrara");
        httpBackend.whenGET(/Views/).respond(200, '');
        UserDetailsService.getUserDetails("aferrara", "it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should modify the password of a user", function () {
        httpBackend.expectPUT("/api/it/user/password");
        httpBackend.whenGET(/Views/).respond(200, '');
        UserDetailsService.modifyProfilePwd("Alberto", "Ferrara", "albertoferrara92@gmail.com", "albe.png", "$2a$08$CPcAgHvjZk2IHzLgcroCH", "it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 222, title: "Ok", message: "Dati utente aggiornati correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should modify the details of a user", function () {
        httpBackend.expectPUT("/api/it/user/info");
        httpBackend.whenGET(/Views/).respond(200, '');
        UserDetailsService.modifyProfile("Alberto", "Ferrara", "albertoferrara92@gmail.com", "albe.png", "it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 222, title: "Ok", message: "Dati utente aggiornati correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should modify the type of a user", function () {
        httpBackend.expectPUT("/api/it/user/type");
        httpBackend.whenGET(/Views/).respond(200, '');
        UserDetailsService.changeAccount("it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 646, title: "Ok", message: "Cambio tipo effettuato correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should delete a user", function () {
        httpBackend.expectDELETE("/api/it/user");
        httpBackend.whenGET(/Views/).respond(200, '');
        UserDetailsService.deleteAccount("it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 222, title: "Ok", message: "Utente eliminato"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

});