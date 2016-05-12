/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::UserDetailsModel;
 * Description: rappresenta un utente. Contiene tutte le informazioni necessarie alla pre- sentazione del contenuto
 * di un utente sia nella visualizzazione che nella gestione di un profilo;
 *
 * Relations with other classes:
 * + LoginController
 * + SearchController
 * + UserDetailsController
 * + StatisticsController
 *
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserDetailsModel_20160427
 * Update data: 28-04-2016
 * Description: Creato il model;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('UserDetailsModel', UserDetailsModel);

function UserDetailsModel() {

    var UserDetailsModel = function (name, surname, email, userImg, username, statistics, levelUser, privilege, id) {
        var name_ = name;
        var surname_ = surname;
        var email_ = email;
        var userImg_ = userImg;
        var username_ = username;
        var statistics_ = statistics;
        var levelUser_ = levelUser;
        var privilege_ = privilege;
        var id_ = id;

        this.setName = function (name) {
            name_ = name;
        };
        this.setSurname = function (surname) {
            surname_ = surname;
        };

        this.setEmail = function (email) {
            email_ = email;
        };

        this.setUsername = function (username) {
            username_ = username;
        };

        this.setUserImg = function (userImg) {
            userImg_ = userImg;
        };

        this.setStatistics = function (statistics) {
            statistics_ = statistics;
        };

        this.setLevel = function (level) {
            levelUser_ = level;
        };

        this.setLevelByTopic = function (topic, level, answer) {
            statistics_ = statistics_.filter(function (obj) {

              if(obj.topicName == topic) {
                console.log(obj);
                obj.topicLevel = level;
                obj.totalAnswers= parseInt(obj.totalAnswers)+1;
                if(answer) {
                  obj.correctAnswer= obj.correctAnswers+1;
                }
              }
              return obj;
            });
            console.log(statistics);
        };

        this.setPrivilege = function (privilege) {
            privilege_ = privilege;
        };

        this.setId = function (id) {
            id_ = id;
        };

        this.getName = function () {
            return name_;
        };

        this.getSurname = function () {
            return surname_;
        };

        this.getEmail = function () {
            return email_;
        };

        this.getUsername = function () {
            return username_;
        };

        this.getUserImg = function () {
            return userImg_;
        };

        this.getStatistics = function () {
            return statistics_;
        };

        this.getLevel = function () {
            return levelUser_;
        };

        this.getLevelByTopic = function (topic) {
          console.log(topic);
          var obj = statistics_.filter(function ( obj ) {
            return obj.topicName == topic;
          })[0];
          console.log(obj);
          return obj.topicLevel;

        };

        this.getPrivilege = function () {
            return privilege_;
        };

        this.getId = function () {
            return id_;
        };
    }
        return UserDetailsModel;
}
