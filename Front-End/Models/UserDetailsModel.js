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

function UserDetailsModel(name, surname, email, userImg, username, statistics, levelUser, privilege, id) {
    var name_ = name;
    var surname_ = surname;
    var email_ = email;
    var userImg_ = userImg;
    var username_ = username;
    var statistics_ = statistics;
    var levelUser_ = levelUser;
    var privilege_ = privilege;
    var id_ = id;

    var methods = {
        setName: setName,
        setSurname: setSurname,
        setEmail: setEmail,
        setUsername: setUsername,
        setUserImg: setUserImg,
        setStatistics: setStatistics,
        setLevel: setlevel,
        setPrivilege: setPrivilege,
        setId: setId,
        getName: getName,
        getSurname: getSurname,
        getEmail: getEmail,
        getUsername: getUsername,
        getUserImg: getUserImg,
        getStatistics: getStatistics,
        getLevel: getlevel,
        getPrivilege: getPrivilege,
        getId: getId
    };

    function setName(name){
        this.name_ = name;
    }

    function setSurname(surname){
        this.surname_ = surname;
    }

    function setEmail(email){
        this.email_ = email;
    }

    function setUsername(username){
        this.username_ = username;
    }

    function setUserImg(userImg){
        this.userImg_ = userImg;
    }

    function setStatistics(statistics){
        this.statistics_ = statistics;
    }

    function setlevel(level){
        this.level_ = level;
    }

    function setPrivilege(privilege){
        this.privilege_ = privilege;
    }

    function setId(id){
        this.id_ = id;
    }

    function getName(){
        return this.name_;
    }

    function getSurname(){
        return this.surname_;
    }

    function getEmail(){
        return this.email_;
    }

    function getUsername(){
        return this.username_;
    }

    function getUserImg(){
        return this.userImg_;
    }

    function getStatistics(){
        return this.statistics_;
    }

    function getlevel(){
        return this.level_;
    }

    function getPrivilege(){
        return this.privilege_;
    }

    function getId(){
        return this.id_;
    }

    return UserDetailsModel;

}