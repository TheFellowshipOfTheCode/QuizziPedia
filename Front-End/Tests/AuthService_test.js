/*******************************************************************************
 * Name: AuthServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::AuthService;
 * Relations with other classes:
 * + .
 * Creation data: 26-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AuthServiceTest_20160526;
 * Update data: 01-05-2016;
 * Description: Scritto il test;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

describe('AuthService', function(){
    describe('when I call signIn', function(){
        it('set the cookie right', function(){
            var $injector = angular.injector([ 'myModule' ]);
            var myService = $injector.get( 'myService' );
            expect( myService.one ).toEqual(1);
        })

    })

});