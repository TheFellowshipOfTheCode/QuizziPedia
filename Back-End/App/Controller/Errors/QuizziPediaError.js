/*******************************************************************************
 * Name: Nome della classe da DDP; (QuizziPedia::ciao::prova::...)
 * Description: scrivere una piccola descrizione della classe (riassunto da DDP).
 * Relations with other classes:
 * + NomeAltraClasse1
 * + NomeAltraClasse2
 * Creation data: 27-04-2016
 * Author: Nome Cognome
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: NomeClasse_aaaammgg
 * Update data: gg-mm-aaaa
 * Description: descrizione della modifica fatta.
 * Autore: Nome Cognome
 *-------------------------------------------------------------------------------
 *******************************************************************************/
class QuizziPediaError {
    private code: Number;
    private title: String;
    private message: String;

    QuizziPediaError(err: Number) {
        this.code = err;

    }


}