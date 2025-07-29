function price_format(p) {
    if (typeof p == "string") {
        prix = parseFloat(p.replace(" ", ""));
    } else {
        prix = parseFloat(p);
    }

    prix = prix.toFixed(TARIFS_NB_DECIMALES);

    var sPrix = prix.toString();
    var tPrix = sPrix.split('.');
    var dec;
    var unit;
    unit = tPrix[0];
    if (tPrix.length > 1) {
        dec = tPrix[1];
    } else {
        dec = "";
    }
    var res = "";

    var step = 0;
    for (var i = unit.length - 1; i >= 0; i--) {
        if (step == 2) {
            res = PRICES_MILLIER_SEPARATOR + unit[i] + res;
            step = 0;
        } else {
            res = unit[i] + res;
            step++;
        }
    }
    return res + PRICES_DECIMAL_SEPARATOR + dec;
}


function caisse_heure(target) {
    var dt = new Date();
    $(target).innerHTML = "";
    if (dt.getHours() >= 0 && dt.getHours() < 10) {
        $(target).innerHTML += "0";
    }
    $(target).innerHTML += dt.getHours() + ":";
    if (dt.getMinutes() >= 0 && dt.getMinutes() < 10) {
        $(target).innerHTML += "0";
    }
    $(target).innerHTML += dt.getMinutes() + ":";
    if (dt.getSeconds() >= 0 && dt.getSeconds() < 10) {
        $(target).innerHTML += "0";
    }
    $(target).innerHTML += dt.getSeconds();

    window.setTimeout("caisse_heure('" + target + "')", 1000);
}

//appel les reponses pour le moteur de recherche articles pour un document
function document_recherche_article() {
    var AppelAjax = new Ajax.Updater(
        "resultat_article",
        "caisse_panneau_recherche_articles_result.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                recherche: '1',
                ref_art_categ: $F('ref_art_categ_s'),
                lib_article: escape($F('lib_article_s')),
                page_to_show: $F('article_page_to_show_s'),
                ref_constructeur: $F('ref_constructeur_s'),
                orderby: $F('article_orderby_s'),
                orderorder: $F('article_orderorder_s'),
                ref_doc: $F('ref_doc'),
                recherche_auto: $F('article_recherche_auto'),
                from_rapide_search: from_rapide_search
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}



function afficher_notification() {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_transfert_trm",
        "afficher_notification.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}



function afficher_creation_trm() {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_creation_trm",
        "creation_trm.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}



//appel les reponses pour le moteur simple recherche contact
function caisse_recherche_client_simple() {
    var AppelAjax = new Ajax.Updater(
        "resultat",
        "caisse_panneau_recherche_client_result.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                recherche: '1',
                nom: escape($F('nom_s')),
                page_to_show: $F('page_to_show_s'),
                orderby: $F('orderby_s'),
                orderorder: $F('orderorder_s')
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}

function charger_liste_cadeaux(ref_contact) {
    var AppelAjax = new Ajax.Updater(
        "content_cadeau",
        "charger_liste_cadeaux.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                ref_contact: ref_contact
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}


function view_article_parent_stock(ref_doc_line, id_stock) {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_stock_article_parent_corps",
        "get_fils_caracs.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                ref_doc_line: ref_doc_line,
                id_stock: id_stock
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}


function view_article_parent_stock2(ref_doc_line, id_stock) {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_stock_article_parent",
        "view_article_parent_stock.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                ref_doc_line: ref_doc_line,
                id_stock: id_stock
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}






function supp_tickets_vides() {
    var AppelAjax = new Ajax.Request(
        "supp_tickets_vides.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );
}




function donner_cadeaux(ref_contact, val_cadeau) {
    var AppelAjax = new Ajax.Updater(
        "client_total_fedelite",
        "donner_cadeaux.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                ref_contact: ref_contact,
                val_cadeau: val_cadeau
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}



function caisse_maj_client(ref_doc, ref_contact) {
    var AppelAjax = new Ajax.Request(
        "caisse_maj_client.php", {
            parameters: {
                ref_doc: ref_doc,
                ref_contact: ref_contact
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}


function remove_client_from_caisse(ref_doc) {
    var AppelAjax = new Ajax.Request(
        "remove_client_from_caisse.php", {
            parameters: {
                ref_doc: ref_doc
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                H_loading();
                requester.responseText.evalScripts();
            }
        }
    );
}




function caisse_stock_selected_line(suffixe) {
    var AppelAjax = new Ajax.Updater(
        "article_stk_info",
        "caisse_stock_selected_line.php", {
            parameters: {
                suffixe: suffixe
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}


function afficher_contenue_pop_up_fond_caisse() {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fond_caisse",
        "afficher_contenue_pop_up_fond_caisse.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}


function afficher_contenue_pop_up_fentere_ouverture() {

    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_ouverture",
        "afficher_contenue_pop_up_fentere_ouverture.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}

function afficher_contenue_pop_up_fentere_ouverture_1() {
    var AppelAjax = new Ajax.Updater(
        "pop_up_fentere_ouverture",
        "afficher_contenue_pop_up_fentere_ouverture_1.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}


function ouverture_caisse_1(check) {
    $("alert_pop_up").style.display = "none";
    $('pop_up_fentere_ouverture').style.display = 'none';
    var AppelAjax = new Ajax.Updater(
        "ouverture_caisse_1",
        "ouverture_caisse_1.php", {
            parameters: {
                check: check
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}


function ouverture_caisse_2() {
    $("alert_pop_up").style.display = "none";
    $('pop_up_fentere_ouverture').style.display = 'none';
    var AppelAjax = new Ajax.Request(

        "ouverture_caisse_2.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}


function transfere_caisse_nouveau(montant_transfere, check) {
    var AppelAjax = new Ajax.Request(
        "transfere_caisse_nouveau.php", {
            parameters: {
                montant_transfere: montant_transfere,
                check: check
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}




//fonction pour ajouter un article(et donc une ligne) e un document de type ticket dans la caisse
//si ref_ticket existe
//alors on charge le ticket
//sinon, on cree un nouveau ticket
function caisse_ajouter_article(ref_ticket, ref_contact, ref_article) {

    var AppelAjax = new Ajax.Request(
        "caisse_ajouter_article.php", {
            parameters: {
                ref_ticket: ref_ticket,
                ref_contact: ref_contact,
                ref_article: ref_article
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function caisse_ajouter_article_trm(ref_ticket, ref_article) {

    var AppelAjax = new Ajax.Request(
        "caisse_ajouter_article_trm.php", {
            parameters: {
                ref_ticket: ref_ticket,
                ref_article: ref_article
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

//fonction pour supprimer un article(et donc une ligne) a un document de type ticket dans la caisse
function caisse_suppr_article(ref_ticket, ref_ligne) {
    var AppelAjax = new Ajax.Request(
        "caisse_suppr_article.php", {
            parameters: {
                ref_ticket: ref_ticket,
                ref_ligne: ref_ligne
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}


function suppr_article_trm(ref_ligne) {
    var AppelAjax = new Ajax.Request(
        "suppr_article_trm.php", {
            parameters: {
                ref_ligne: ref_ligne
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}


//fonction pour mettre a jour une ligne d'un document d'un document de type ticket dans la caisse
function caisse_maj_ligne_ticket(ref_ticket, ref_ligne, remise, puttc, qte) {
    var AppelAjax = new Ajax.Request(
        "caisse_maj_ligne.php", {
            parameters: {
                ref_ticket: ref_ticket,
                ref_ligne: ref_ligne,
                remise: remise,
                puttc: puttc,
                qte: qte
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

//
function caisse_charger_ticket(ref_ticket) {
    var AppelAjax = new Ajax.Request(
        "caisse_charger_ticket.php", {
            parameters: {
                ref_ticket: ref_ticket
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function caisse_encaisser_ticket(ref_ticket, moyens_de_paiememnt, montants, type_print, moyens_de_paiement2, motants2) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_encaisser_ticket.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                type_print: type_print,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );
}


function caisse_encaisser_ticket2(ref_commercial, id_compte_caisse, ref_ticket, moyens_de_paiememnt, montants, type_print, moyens_de_paiement2, motants2) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_encaisser_ticket.php", {
            parameters: {
                ref_commercial: ref_commercial,
                id_compte_caisse: id_compte_caisse,
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                type_print: type_print,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );
}



function caisse_enregister_paiement(ref_ticket2, moyens_de_paiememnt2, montants2) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_enregistrer_paiement.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt2,
                montants: montants2
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}


function caisse_ajouter_moyen_de_paiement(ref_ticket, moyen_de_paiement) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_ajouter_moyen_de_paiement.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyen_de_paiement: moyen_de_paiement
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function caisse_ajouter_moyen_de_paiement_cheque(ref_ticket, moyen_de_paiement, montant, num_cheque, nom_banque, poteur, date_ech, tel) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_ajouter_moyen_de_paiement_cheque.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyen_de_paiement: moyen_de_paiement,
                montant: montant,
                num_cheque: num_cheque,
                nom_banque: nom_banque,
                poteur: poteur,
                date_ech: date_ech,
                tel: tel
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}


function caisse_ajouter_paiement_encais_client(moyen_de_paiement) {

    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_ajouter_paiement_encaiss_client.php", {
            parameters: {
                test: 'test',
                moyen_de_paiement: moyen_de_paiement
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}





function ajouterReglement_encaiss_client(suffixe, monaie, mdp_lib, mdp, motant) {
    var table = $("reglements_effectues");
    //var trl = table.rows.length + 0;

    var cell_LIB_MOYEN = mdp_lib + "<input type='hidden' id='MDP_" + suffixe + "' name='MDP_" + suffixe + "' value='" + mdp + "'/>";
    var cell_MONTANT = "<input type='texte' id='MONTANT_" + suffixe + "' name='MONTANT_" + suffixe + "' value='" + motant + "'  style='width:98px;' />";
    var cell_MONAIE = "&nbsp;" + monaie;
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TR_REG_" + suffixe);

    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);

    var TD_REG1 = document.createElement("td");
    TD_REG1.setAttribute("id", "TD_REG1_" + suffixe);
    TD_REG1.className = "panneau_encaissement_ligne_reglement_effectue_LIB";
    tr.appendChild(TD_REG1);

    var TD_REG2 = document.createElement("td");
    TD_REG2.setAttribute("id", "TD_REG2_" + suffixe);
    TD_REG2.className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
    tr.appendChild(TD_REG2);

    var TD_REG3 = document.createElement("td");
    TD_REG2.setAttribute("id", "TD_REG3_" + suffixe);
    TD_REG3.className = "panneau_encaissement_ligne_reglement_effectue_MONAIE";
    tr.appendChild(TD_REG3);

    $(TD_REG1).innerHTML = cell_LIB_MOYEN;
    $(TD_REG2).innerHTML = cell_MONTANT;
    $(TD_REG3).innerHTML = cell_MONAIE;
    document.getElementById('MONTANT_' + suffixe).focus();
    document.getElementById('MONTANT_' + suffixe).select();
    if (cible_id_MONTANT != "") {
        $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
    }

    caisse_afficher_somme_encaissement();

    Event.observe("MONTANT_" + suffixe, "click", function(evt) {
        Event.stop(evt);
        calculette_caisse.setCible_action("MOYENS_DE_PAIEMENT");
        calculette_caisse.setCible_id("MONTANT_" + suffixe);

        if (cible_id_MONTANT != "") {
            $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
            $(cible_id_MONTANT).value = price_format(parseFloat($(cible_id_MONTANT).value));
            cible_id_MONTANT = "";
            caisse_afficher_somme_encaissement();
        }
        cible_id_MONTANT = "MONTANT_" + suffixe;
        $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT_selected";
    }, false);

    Event.observe("MONTANT_" + suffixe, "keypress", function(evt) {
        var key = evt.which || evt.keyCode;
        if (key == Event.KEY_RETURN) {
            $("MONTANT_" + suffixe).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
            cible_id_MONTANT = "";
            $("MONTANT_" + suffixe).value = price_format(parseFloat($("MONTANT_" + suffixe).value));
            caisse_afficher_somme_encaissement();
            Event.stop(evt);
        }
    }, false);

}



function caisse_reset_3(id_panneau_called) {
    //debut raccourci Fleche
    i = 0;
    tab = new Array;
    j = 0;
    //fin raccourci Fleche
    calculette_caisse.setCible_type_action("TICKET");
    caisse_unselect_line();

    $("calculette_RESULTAT").value = "0.00";

    $("ref_ticket").value = "";
    $("ref_contact").value = "";

    $("art_page_to_show_s").value = "1";
    $("categ_racine_page_to_show_s").value = "1";
    $("categ_sous_page_to_show_s").value = "1";

    $("print_s").value = "no_print";

    $("client_ligne1").innerHTML = 'Client non identifi&eacute;';
    $("client_ligne2").innerHTML = "";
    $("client_ligne3").innerHTML = "";
    $("nom_contact").value = "";
    $("points_fidelite").value = "";
    $("total_fidelite").value = "";
    $("client_grille_tarifaire").innerHTML = lib_grille_tarifaire;
    $("credit").innerHTML = "";
    $("nbcommercial").innerHTML = "";
    $("ref_commercial0").value = "";
    $("client_total_credit").innerHTML = "";
    $("fedelite").innerHTML = "";
    $("client_total_fedelite").innerHTML = "";
    $("client_enregistrer_encaissement").innerHTML = "";
    $("img_fermer_client").innerHTML = "";
    $("encours_detail").innerHTML = "";
    $("encours_detail_valeur").innerHTML = "";
    caisse_maj_total1("0.000");

    var table = $("TICKET");
    while (table.rows.length > 1) {
        table.removeChild(table.rows[1]);
    }
    $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
    ticket_is_unlock = true;
    //window.location.reload() ;
    //if(id_panneau_called == undefined)
    //{	id_panneau_called = "recherche_article";}

    //change_panneau_bas(id_panneau_called);



}


function caisse_ajouter_tick_resto_paiement_encais_client(moyen_de_paiement, somme) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_ajouter_tick_resto_paiement_encais_client.php", {
            parameters: {
                moyen_de_paiement: moyen_de_paiement,
                somme: somme
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function caisse_afficher_somme_encaissement() {
    var table = $("reglements_effectues");
    var motants = 0;
    for (var i = 1; i < table.rows.length; i++) {
        motants += Math.round(parseFloat($("MONTANT_" + i).value.replace(" ", "")) * 1000) / 1000;
    }
    if (motants > 0) {
        $("print_valider").style.opacity = 1;
    }
    $("lib__reste_a_payer_OU_a_rendre").innerHTML = "SOMME";
    $("reglement_a_rendre").innerHTML = price_format(motants) + " DT";
}

function caisse_valider_encaissement_client(ref_conatct, moyens_de_paiememnt, montants, moyens_de_paiement2, motants2) {

    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_valider_encaissemnt_client.php", {
            parameters: {
                ref_conatct: ref_conatct,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
    //boncaisse=1;
    //change_panneau_bas("recherche_article");
}



function change_panneau_bas(panneau, bt_from) {
    switch (panneau) {

        case "enregistrer_encais_client":
            {
                if (panneau_courant != "enregistrer_encais_client") {
                    var params = "?ref_contact=" + $F("ref_contact");
                    page.traitecontent("panneau_bas", "caisse_panneau_enregistrer_encaissement_client.php" + params, true, "panneau_bas");
                    caisse_unselect_line();
                    if (ticket_is_unlock) {
                        calculette_caisse.setCible_type_action("ENCAISSEMENT");
                        $("bt_encaisser_lib").innerHTML = lib_out_encaisser;
                        ticket_is_unlock = false;
                    }
                    $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                    $("art_lib_s").focus();

                    panneau_courant = "enregistrer_encais_client";
                }
                break;
            }

        case "historique_tickets":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_afficher_tickets.php?lib_panneau=Historique%20des%20tickets", true, "panneau_bas");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "historique_tickets";
                break;
            }
        case "tickets_en_attente":
            {
                if (panneau_courant == "tickets_en_attente") {
                    change_panneau_bas("recherche_client");
                } else {
                    page.traitecontent("panneau_bas", "caisse_panneau_afficher_tickets.php?lib_panneau=Tickets%20en%20attente&etats_tickets=61;59", true, "panneau_bas");
                    if (!ticket_is_unlock) {
                        $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                        ticket_is_unlock = true;
                    }
                    $("tickets_en_attente").innerHTML = lib_out_afficher_tickets_en_attente;
                    $("art_lib_s").focus();

                    panneau_courant = "tickets_en_attente";
                }
                break;
            }

        case "tickets_accompte_par_client":
            {
                if (panneau_courant == "tickets_accompte_par_client") {
                    change_panneau_bas("recherche_client");
                } else {
                    page.traitecontent("panneau_bas", "caisse_panneau_afficher_tickets_accompte_client.php?lib_panneau=Tickets%20Accomptes&etats_tickets=61;59&ref_contact=" + $("ref_contact").value, true, "panneau_bas");
                    if (!ticket_is_unlock) {
                        $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                        ticket_is_unlock = true;
                    }
                    //$("tickets_en_attente").innerHTML = lib_out_afficher_tickets_en_attente;
                    $("art_lib_s").focus();

                    panneau_courant = "tickets_accompte_par_client";
                }
                break;
            }
        case "client_total_credit":
            {
                if (panneau_courant == "tickets_en_attente") {
                    change_panneau_bas("recherche_client");
                } else {
                    page.traitecontent("panneau_bas", "caisse_panneau_afficher_tickets_client.php?lib_panneau=Tickets%20en%20attente&etats_tickets=61;59", true, "panneau_bas");
                    if (!ticket_is_unlock) {
                        $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                        ticket_is_unlock = true;
                    }
                    $("tickets_en_attente").innerHTML = lib_out_afficher_tickets_en_attente;
                    $("art_lib_s").focus();

                    panneau_courant = "tickets_en_attente";
                }
                break;
            }

        case "recherche_client":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_recherche_client.php", true, "panneau_bas");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;

                panneau_courant = "recherche_client";
                break;
            }
        case "recherche_article":
            {
                var art_lib_s = $F("art_lib_s");
                var select_racine_art_categs = 0;

                var AppelAjax = new Ajax.Updater(
                    "panneau_bas",
                    "caisse_panneau_recherche_article.php", {
                        method: 'post',
                        asynchronous: false,
                        contentType: 'application/x-www-form-urlencoded',
                        encoding: 'UTF-8',
                        parameters: {
                            select_racine_art_categs: select_racine_art_categs
                        },
                        evalScripts: true,
                        onLoading: S_loading,
                        onException: function() {
                            S_failure();
                        },
                        onSuccess: function(requester) {},
                        onComplete: H_loading
                    }
                );

                if (art_lib_s != "") {
                    var params = "?art_lib_s=" + art_lib_s;
                    params += "&art_page_to_show_s=" + $F("art_page_to_show_s");
                    params += "&categ_racine_page_to_show_s=" + $F("categ_racine_page_to_show_s");
                    params += "&categ_sous_page_to_show_s=" + $F("categ_sous_page_to_show_s");
                    params += "&ref_contact=" + $F("ref_contact");
                    params += "&ref_ticket=" + $F("ref_ticket");
                    if (bt_from = !undefined && bt_from == "bt_ajouter")
                        params += "&ajout_si_article_unique=1";
                    // alert(params);
                    page.traitecontent("resultat_article", "caisse_panneau_recherche_articles_result.php" + params, true, "resultat_article");
                }

                if (!ticket_is_unlock) {
                    calculette_caisse.setCible_type_action("TICKET");
                    var table = $("TICKET");
                    if (table.rows.length > 1) {
                        calculette_caisse.setCible_id(table.rows[table.rows.length - 1].id);
                        caisse_select_line(table.rows[table.rows.length - 1].id);
                    } else {
                        caisse_unselect_line();
                    }
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "recherche_article";
                break;
            }
        case "encaissement":
            {
                var params = "?ref_contact=" + $F("ref_contact");
                params += "&ref_ticket=" + $F("ref_ticket");
                page.traitecontent("panneau_bas", "caisse_panneau_encaissement.php" + params, true, "panneau_bas");
                caisse_unselect_line();
                if (ticket_is_unlock) {
                    calculette_caisse.setCible_type_action("ENCAISSEMENT");
                    $("bt_encaisser_lib").innerHTML = lib_out_encaisser;
                    ticket_is_unlock = false;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "encaissement";
                break;
            }
        case "choix_point_vente":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_choix_point_de_vente.php", true, "panneau_bas");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "choix_point_vente";
                break;
            }
        case "choix_caisse":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_choix_caisse.php", true, "panneau_bas");

                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "choix_caisse";
                break;
            }
        case "ajout_caisse":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_mouvement_caisse.php?sens_mouvement=ajout", true, "panneau_bas");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "ajout_caisse";
                break;
            }
        case "retrait_caisse":
            {
                page.traitecontent("panneau_bas", "caisse_panneau_mouvement_caisse.php?sens_mouvement=retrait", true, "panneau_bas");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "retrait_caisse";
                break;
            }
        case "retour_client":
            {
                page.traitecontent("panneau_bas", "caisse_retour_client.php", true, "panneau_bas");

                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
                $("art_lib_s").focus();

                panneau_courant = "retour_client";
                break;
            }
        case "recherche_fidele_client":
            {
                var art_lib_s = $F("art_lib_s");
                var params = "?nom_client=" + art_lib_s;
                params += "&ref_ticket=" + $F("ref_ticket");
                page.traitecontent("resultat_article", "caisse_recherche_client_fidele.php" + params, true, "resultat_article");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("art_lib_s").value = "";
                $("art_lib_s").focus();
                panneau_courant = "recherche_client";
                break;
            }

        case "recherche_commercial":
            {
                var art_lib_s = $F("art_lib_s");
                var params = "?nom_commer=" + art_lib_s;
                params += "&ref_ticket=" + $F("ref_ticket");
                page.traitecontent("resultat_article", "caisse_recherche_commercial.php" + params, true, "resultat_article");
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("art_lib_s").value = "";
                $("art_lib_s").focus();
                panneau_courant = "recherche_client";
                break;
            }

        default:
            {
                if (!ticket_is_unlock) {
                    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
                    ticket_is_unlock = true;
                }
                $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;

                panneau_courant = "";
                break;
            }
    }
}

function caisse_select_line(ref_line) {
    caisse_unselect_line();
    calculette_caisse.setCible_id(ref_line);
    selected_line_name = ref_line;
    $(selected_line_name).className = "ticket_ligne_selected";
    if (typeof clavier != "undefined") {
        if (clavier == 0) {
            $("recherche_par_nom").focus();
        } else {
            $("art_lib_s").focus();
        }
    }

    caisse_stock_selected_line(ref_line);
    // code amir_image
    add_image(ref_line);
    //fin code amir_image
}



function caisse_select_line_2(ref_line, classNameval) {
    caisse_unselect_line();
    calculette_caisse.setCible_id(ref_line);
    selected_line_name = ref_line;
    $(selected_line_name).className = classNameval;
    if (typeof clavier != "undefined") {
        if (clavier == 0) {
            $("recherche_par_nom").focus();
        } else {
            $("art_lib_s").focus();
        }
    }



    caisse_stock_selected_line(ref_line);
    // code amir_image
    add_image(ref_line);
    //fin code amir_image
}



function caisse_unselect_line() {
    if (selected_line_name != "") {
        calculette_caisse.setCible_id("");
        caisse_unselect_col();
        $(selected_line_name).className = "ticket_ligne_unselected";
        $("art_lib_s").focus();
    }
    selected_line_name = "";
    $("art_lib_s").focus();
}

function caisse_select_col(col_name) {
    caisse_unselect_col();
    selected_col_name = col_name;
    $(selected_col_name + "_" + selected_line_name).className = "ticket_cell_selected";
}

function caisse_unselect_col() {
    if (selected_line_name != "" && selected_col_name != "") {
        $(selected_col_name + "_" + selected_line_name).className = "ticket_cell_unselected";
    }
    selected_col_name = "";
}




function maj_etat_ticket2(ref_doc, new_etat_doc, fonction_called_after_maj_etat_ticket, nom_client) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_maj_etat_ticket2.php", {
            parameters: {
                ref_doc: ref_doc,
                new_etat_doc: new_etat_doc,
                nom_client: nom_client
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                if (fonction_called_after_maj_etat_ticket != undefined && fonction_called_after_maj_etat_ticket != "")
                    eval(fonction_called_after_maj_etat_ticket);
            }
        }
    );
}


function caisse_mdp_acompte2(ref_ticket, moyens_de_paiememnt, montants, moyens_de_paiement2, motants2, type_print, nom, tel, date_liv) {

    var AppelAjax = new Ajax.Request(
        "caisse_mdp_acompte2.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2,
                type_print: type_print,
                nom: nom,
                tel: tel,
                date_liv: date_liv
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );

}


function annuler_doc(ref_doc) {
    var AppelAjax = new Ajax.Request(
        "annuler_doc.php", {
            parameters: {
                ref_doc: ref_doc
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: H_loading,
        }
    );
}


function maj_etat_doc(ref_doc, new_etat_doc) {
    var AppelAjax = new Ajax.Request(
        "maj_etat_doc.php", {
            parameters: {
                ref_doc: ref_doc,
                new_etat_doc: new_etat_doc
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: H_loading,
        }
    );
}



function maj_id_stock_cible_trm(ref_doc, id_stock_cible) {
    var AppelAjax = new Ajax.Request(
        "maj_id_stock_cible_trm.php", {
            parameters: {
                ref_doc: ref_doc,
                id_stock_cible: id_stock_cible
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: H_loading,
        }
    );
}


function count_notif() {
    var AppelAjax = new Ajax.Request(
        "count_notification.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: H_loading,
        }
    );
}



//maj de l'etat du doc ne demandant qu'un rechargement de l'entete
function count_notif() {
    var AppelAjax = new Ajax.Updater(
        "notif_count",
        "count_notification.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();

            }
        }
    );
}

//maj de l'etat du doc ne demandant qu'un rechargement de l'entete
function maj_etat_ticket(ref_doc, new_etat_doc, fonction_called_after_maj_etat_ticket) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_maj_etat_ticket.php", {
            parameters: {
                ref_doc: ref_doc,
                new_etat_doc: new_etat_doc
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                if (fonction_called_after_maj_etat_ticket != undefined && fonction_called_after_maj_etat_ticket != "")
                    eval(fonction_called_after_maj_etat_ticket);
            }
        }
    );
}

function vider_les_cheques() {
    var AppelAjax = new Ajax.Request(
        "vider_les_cheques.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: H_loading,
        }
    );
}


function caisse_maj_total(new_total) {
    total = new_total.replace(".", ",");
    $("caisse_total").innerHTML = total;
    $("caisse_total_s").value = new_total;
}

function caisse_maj_nbr_articles(nbr_article) {

    $("nbre_article").innerHTML = nbr_article;
}

function ouvrir_tiroir() {

    var AppelAjax = new Ajax.Request(
        "ouvrir_tiroir.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );

}


/*
function caisse_calculer_a_rendre(){
	var table = $("reglements_effectues");
	var motants = 0;
	for(var i = 1; i < table.rows.length; i++)
	{	motants += Math.round(parseFloat($("MONTANT_"+i).value)*100)/100;}
	
	return Math.round((motants - Math.round(parseFloat($("caisse_total_s").value)*100)/100)*100)/100;
}
*/
/*
function caisse_calculer_a_rendre(){
	var table = $("reglements_effectues");
	var motants = 0;
	for(var i = 1; i < table.rows.length; i++)
	{	motants += Math.round(parseFloat($("MONTANT_"+i).value)*100)/100;}
	
	return Math.round((motants - Math.round(parseFloat($("caisse_total_s").value)*100)/100)*100)/100;
}
*/
/*
function caisse_calculer_a_rendre(){
	var table = $("reglements_effectues");
	var motants = 0;
	for(var i = 1; i < table.rows.length; i++)
	{	motants += Math.round(parseFloat($("MONTANT_"+i).value)*1000)/1000;}
	
	return Math.round((motants - Math.round(parseFloat($("caisse_total_s").value)*1000)/1000)*1000)/1000;
}
*/

function caisse_calculer_a_rendre() {
    var table = $("reglements_effectues");
    var motants = 0;
    var caisse_total = $("caisse_total_s").value;
    var caisse_total_s = caisse_total.replace(" ", "");
    for (var i = 1; i < table.rows.length; i++) {
        motants += Math.round(parseFloat($("MONTANT_" + i).value.replace(" ", "")) * 1000) / 1000;
    }

    return Math.round((motants - Math.round(parseFloat(caisse_total_s) * 1000) / 1000) * 1000) / 1000;
}

function caisse_afficher_a_rendre() {
    var reglement_a_rendre = caisse_calculer_a_rendre();
    if (reglement_a_rendre < 0) {
        $("print_valider").style.opacity = (70 / 100);
        $("lib__reste_a_payer_OU_a_rendre").innerHTML = "RESTE A PAYER";
        $("reglement_a_rendre").innerHTML = price_format((-1) * reglement_a_rendre) + " DT";

    } else {
        $("print_valider").style.opacity = 1;
        $("lib__reste_a_payer_OU_a_rendre").innerHTML = "A RENDRE";
        $("reglement_a_rendre").innerHTML = price_format(reglement_a_rendre) + " DT";
    }
}

function caisse_reset(id_panneau_called) {

    //code amir_image
    $('calcule').style.opacity = "1";
    document.images["img_art"].src = "";
    $("article_stk_info").innerHTML = "";
    $("existe_img").value = "0";
    //fin code amir_image
    calculette_caisse.setCible_type_action("TICKET");
    caisse_unselect_line();

    $("calculette_RESULTAT").value = "0.000";

    $("ref_ticket").value = "";
    $("ref_contact").value = "";

    $("art_page_to_show_s").value = "1";
    $("categ_racine_page_to_show_s").value = "1";
    $("categ_sous_page_to_show_s").value = "1";

    $("print_s").value = "print_ticket";

    $("client_ligne1").innerHTML = 'Client non identifi&eacute;';
    $("client_ligne2").innerHTML = "";
    $("client_ligne3").innerHTML = "";
    $("client_grille_tarifaire").innerHTML = lib_grille_tarifaire;
    $("credit").innerHTML = "";
    $("client_total_credit").innerHTML = "";
    $("fedelite").innerHTML = "";
    $("client_total_fedelite").innerHTML = "";
    $("nbcommercial").innerHTML = "";
    $("ref_commercial0").value = "";
    $("nom_contact").value = "";
    $("points_fidelite").value = "";
    $("total_fidelite").value = "";
    $("client_enregistrer_encaissement").innerHTML = "";
    $("img_fermer_client").innerHTML = "";
    $("encours_detail").innerHTML = "";
    $("encours_detail_valeur").innerHTML = "";
    caisse_maj_total("0.000");
    caisse_maj_nbr_articles("0");
    var table = $("TICKET");
    while (table.rows.length > 1) {
        table.removeChild(table.rows[1]);
    }
    $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
    ticket_is_unlock = true;

    if (id_panneau_called == undefined) {
        id_panneau_called = "recherche_client";
    }

    change_panneau_bas(id_panneau_called);
    //caisse_update();
}

function caisse_reset_2(id_panneau_called) {

    //code amir_image
    $('calcule').style.opacity = "1";
    document.images["img_art"].src = "";
    $("article_stk_info").innerHTML = "";
    $("existe_img").value = "0";
    //fin code amir_image
    calculette_caisse.setCible_type_action("TICKET");
    caisse_unselect_line();

    $("calculette_RESULTAT").value = "0.000";

    $("ref_ticket").value = "";
    $("ref_contact").value = "";

    $("art_page_to_show_s").value = "1";
    $("categ_racine_page_to_show_s").value = "1";
    $("categ_sous_page_to_show_s").value = "1";

    $("print_s").value = "print_ticket";

    $("client_ligne1").innerHTML = 'Client non identifi&eacute;';
    $("client_ligne2").innerHTML = "";
    $("client_ligne3").innerHTML = "";
    $("client_grille_tarifaire").innerHTML = lib_grille_tarifaire;
    $("credit").innerHTML = "";
    $("client_total_credit").innerHTML = "";
    $("fedelite").innerHTML = "";
    $("client_total_fedelite").innerHTML = "";
    $("ref_commercial0").value = "";
    $("nbcommercial").innerHTML = "";
    $("nom_contact").value = "";
    $("points_fidelite").value = "";
    $("total_fidelite").value = "";
    $("client_enregistrer_encaissement").innerHTML = "";
    $("img_fermer_client").innerHTML = "";
    $("encours_detail").innerHTML = "";
    $("encours_detail_valeur").innerHTML = "";
    caisse_maj_total("0.000");
    caisse_maj_nbr_articles("0");
    var table = $("TICKET");
    while (table.rows.length > 1) {
        table.removeChild(table.rows[1]);
    }
    $("tickets_en_attente").innerHTML = lib_in_afficher_tickets_en_attente;
    $("bt_encaisser_lib").innerHTML = lib_in_encaisser;
    ticket_is_unlock = true;
    //window.location.reload() ;
    //if(id_panneau_called == undefined)
    //{	id_panneau_called = "recherche_article";}

    //change_panneau_bas(id_panneau_called);
    //caisse_update();
}

function caisse_suppr_ticket(ref_ticket, fonction_called_after_maj_etat_ticket) {
    $("titre_alert_custom").innerHTML = "Suppression";
    $("texte_alert_custom").innerHTML = "Confirmer-vous la suppression de ce ticket ?<br/>";
    $("bouton_alert_custom").innerHTML = '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
        '<tr>' +
        '<td width="40%" align="right">' +
        '<img id="bouton_pop_up_0" name="bouton_pop_up_0" alt="Valier"  title="Valier"  src="../interface_caisse/themes/caisse_fr/images/bt-valider.png" />' +
        '</td>' +
        '<td width="10%" >&nbsp;</td>' +
        '<td width="40%" align="left">' +
        '<img id="bouton_pop_up_1" name="bouton_pop_up_1" alt="Annuler" title="Annuler" src="../interface_caisse/themes/caisse_fr/images/bt-annuler.png" />' +
        '</td>' +
        '</tr>' +
        '</table>';

    $("framealert").style.display = "block";
    $("alert_pop_up").style.display = "block";
    $("alert_pop_up_tab_custom").style.display = "block";

    Event.observe("bouton_pop_up_0", "click", function() {
        maj_etat_ticket(ref_ticket, "60", fonction_called_after_maj_etat_ticket); // ID_ETAT_ANNULE = 60
        $("framealert").style.display = "none";
        $("alert_pop_up").style.display = "none";
        $("alert_pop_up_tab_custom").style.display = "none";
    }, false);

    Event.observe("bouton_pop_up_1", "click", function() {
        $("framealert").style.display = "none";
        $("alert_pop_up").style.display = "none";
        $("alert_pop_up_tab_custom").style.display = "none";
    }, false);
}


function script_called_after_maj_etat_ticket_from_acceuil() {
    caisse_reset("recherche_article");
    H_loading();
}

function script_called_after_maj_etat_60_from_afficher_ticket(rafraichir_accueil) {
    if (rafraichir_accueil) {
        caisse_reset("tickets_en_attente");
    } else {
        change_panneau_bas("tickets_en_attente");
    }
    H_loading();
}

function script_called_after_maj_etat_61_from_afficher_ticket(ref_doc) {
    caisse_reset("recherche_article");
    caisse_charger_ticket(ref_doc);
    H_loading();
}

function ajouterArticleTicket(suffixe, monaie, cell_LIB, cell_QTE, cell_PUTTC, cell_REMISE, cell_PRIXTTC, classNameval) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", suffixe);
    $("TICKET").appendChild(tr);

    tr.appendChild(document.createElement("td"));

    var td = document.createElement("td");
    td.setAttribute("id", "LIB_" + suffixe);
    td.style.textAlign = "left";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("id", "QTE_" + suffixe);
    td.style.textAlign = "right";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("id", "PUTTC_" + suffixe);
    td.style.textAlign = "right";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("id", "REMISE_" + suffixe);
    td.style.textAlign = "right";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("id", "PRIXTTC_" + suffixe);
    td.style.textAlign = "right";
    tr.appendChild(td);

    tr.appendChild(document.createElement("td"));

    $("LIB_" + suffixe).innerHTML = cell_LIB;
    $("QTE_" + suffixe).innerHTML = cell_QTE;
    $("PUTTC_" + suffixe).innerHTML = cell_PUTTC + "&nbsp;" + monaie;
    $("REMISE_" + suffixe).innerHTML = cell_REMISE;
    $("PRIXTTC_" + suffixe).innerHTML = cell_PRIXTTC + "&nbsp;" + monaie;

    caisse_select_line_2(suffixe, classNameval);

    //$("conteneur_TICKET").scrollTop = $("conteneur_TICKET").offsetHeight;
    $("conteneur_TICKET").scrollTop = $("conteneur_TICKET").scrollHeight;
    // $("conteneur_TICKET1").scrollTop = $("conteneur_TICKET").scrollHeight;


    Event.observe(suffixe, "click", function(evt) {
        Event.stop(evt);
        if (ticket_is_unlock) {
            caisse_select_line(suffixe);
        }
    }, false);
}



function ajouterArticleTrm(suffixe, monaie, cell_LIB, cell_QTE) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", suffixe);
    $("TICKETt").appendChild(tr);

    tr.appendChild(document.createElement("td"));

    var td = document.createElement("td");
    td.setAttribute("id", "LIB_" + suffixe);
    td.style.textAlign = "left";
    td.style.fontSize = "16px";
    td.style.fontWeight = "bold";
    td.style.height = "40px";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("id", "QTE_" + suffixe);
    td.style.textAlign = "right";
    td.style.fontWeight = "bold";
    td.style.fontSize = "16px";
    tr.appendChild(td);


    td = document.createElement("td");
    td.setAttribute("id", "SUPP_" + suffixe);
    td.style.textAlign = "center";
    tr.appendChild(td);

    $("LIB_" + suffixe).innerHTML = cell_LIB;
    $("QTE_" + suffixe).innerHTML = '<input id="QTES_' + suffixe + '" type=text size="1" value="' + cell_QTE + '"/>';
    $("SUPP_" + suffixe).innerHTML = '<img src="../interface_caisse/themes/caisse_fr/images/supp_line.png" width="30px;" style="cursor:pointer;margin-right:11px;margin-top:-4px;" />';

    // $("QTES_"+suffixe).select();
    $("art_s").focus();

    Event.observe("SUPP_" + suffixe, "click", function(evt) {
        Event.stop(evt);
        suppr_article_trm(suffixe);
        $("art_s").focus();
    }, false);

    Event.observe("QTES_" + suffixe, "blur", function(evt) {
        Event.stop(evt);
        update_qte(suffixe, $('QTES_' + suffixe).value);
    }, false);

    //$("conteneur_TICKET").scrollTop = $("conteneur_TICKET").offsetHeight;

    $("conteneur_TICKETt").scrollTop = $("conteneur_TICKETt").scrollHeight;
}

function update_qte(ref_doc_line, new_qte) {
    var AppelAjax = new Ajax.Request(
        "caisse_maj_qte.php", {
            parameters: {
                ref_doc: $("ref_trm").value,
                ref_doc_line: ref_doc_line,
                qte: new_qte
            },
            evalScripts: true,
            onLoading: S_loading,
            onComplete: H_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function ajouterReglement(suffixe, monaie, mdp_lib, mdp, motant) {
    var table = $("reglements_effectues");
    //var trl = table.rows.length + 0;

    var cell_LIB_MOYEN = mdp_lib + "<input type='hidden' id='MDP_" + suffixe + "' name='MDP_" + suffixe + "' value='" + mdp + "'/>";
    var cell_MONTANT = "<input type='texte' id='MONTANT_" + suffixe + "' name='MONTANT_" + suffixe + "' value='" + motant + "' style='width:98px;' />";
    var cell_MONAIE = "&nbsp;" + monaie;
    var tr = document.createElement("tr");
    tr.setAttribute("id", "TR_REG_" + suffixe);

    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);

    var TD_REG1 = document.createElement("td");
    TD_REG1.setAttribute("id", "TD_REG1_" + suffixe);
    TD_REG1.className = "panneau_encaissement_ligne_reglement_effectue_LIB";
    tr.appendChild(TD_REG1);

    var TD_REG2 = document.createElement("td");
    TD_REG2.setAttribute("id", "TD_REG2_" + suffixe);
    TD_REG2.className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
    tr.appendChild(TD_REG2);

    var TD_REG3 = document.createElement("td");
    TD_REG2.setAttribute("id", "TD_REG3_" + suffixe);
    TD_REG3.className = "panneau_encaissement_ligne_reglement_effectue_MONAIE";
    tr.appendChild(TD_REG3);

    $(TD_REG1).innerHTML = cell_LIB_MOYEN;
    $(TD_REG2).innerHTML = cell_MONTANT;
    $(TD_REG3).innerHTML = cell_MONAIE;
    document.getElementById('MONTANT_' + suffixe).focus();
    document.getElementById('MONTANT_' + suffixe).select();
    if (cible_id_MONTANT != "") {
        $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
    }

    caisse_afficher_a_rendre();

    Event.observe("MONTANT_" + suffixe, "click", function(evt) {
        Event.stop(evt);
        calculette_caisse.setCible_action("MOYENS_DE_PAIEMENT");
        calculette_caisse.setCible_id("MONTANT_" + suffixe);

        if (cible_id_MONTANT != "") {
            $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
            $(cible_id_MONTANT).value = price_format(parseFloat($(cible_id_MONTANT).value));
            cible_id_MONTANT = "";
            caisse_afficher_a_rendre();
        }
        cible_id_MONTANT = "MONTANT_" + suffixe;
        $(cible_id_MONTANT).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT_selected";
    }, false);

    Event.observe("MONTANT_" + suffixe, "keypress", function(evt) {
        var key = evt.which || evt.keyCode;
        if (key == Event.KEY_RETURN) {
            $("MONTANT_" + suffixe).className = "panneau_encaissement_ligne_reglement_effectue_MONTANT";
            cible_id_MONTANT = "";
            $("MONTANT_" + suffixe).value = price_format(parseFloat($("MONTANT_" + suffixe).value));
            caisse_afficher_a_rendre();
            Event.stop(evt);
        }
    }, false);
}


function setTicket_cell_LIB(suffixe, lib) {
    $("LIB_" + suffixe).innerHTML = lib;
}

function setTicket_cell_QTE(suffixe, qte) {
    $("QTE_" + suffixe).innerHTML = parseFloat(qte);
}

function setTicket_cell_PUTTC(suffixe, monaie, pu_ttc) {
    $("PUTTC_" + suffixe).innerHTML = price_format(pu_ttc) + "&nbsp;" + monaie;
}

function setTicket_cell_REMISE(suffixe, remise) {
    $("REMISE_" + suffixe).innerHTML = price_format(remise);
}

function setTicket_cell_PRIXTTC(suffixe, monaie, prix_ttc) {
    $("PRIXTTC_" + suffixe).innerHTML = price_format(prix_ttc) + "&nbsp;" + monaie;
}

function majClient(ref_contact, client_ligne1, client_ligne2) {

    $("ref_contact").value = "<?php echo $document->getRef_contact();?>";
    $("client_ligne1").innerHTML = "<?php echo addslashes(preg_replace('(\r\n|\n|\r)','',$ligne1));?>";
    $("client_ligne2").innerHTML = "<?php echo addslashes(preg_replace('(\r\n|\n|\r)','',$ligne2));?>";
    $("client_ligne3").innerHTML = "<?php echo addslashes(preg_replace('(\r\n|\n|\r)','',$ligne3));?>";
    $("client_grille_tarifaire").innerHTML = "<?php echo $lib_grille_tarrifaire;?>";
}




/////   encaissement Acompte
function caisse_mdp_acompte(ref_ticket, moyens_de_paiememnt, montants, moyens_de_paiement2, motants2, type_print) {

    var AppelAjax = new Ajax.Request(
        "caisse_mdp_acompte.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2,
                type_print: type_print
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        });

}


//code amir_image
function add_image(ref_doc_line) {

    var AppelAjax = new Ajax.Updater(
        "add_image_art",
        "add_image.php", {
            parameters: {
                ref_doc_line: ref_doc_line
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                H_loading();
            }
        }
    );

}
//code amir_image + add_image.php


/////   encaissement credit

function caisse_mdp_credit(ref_ticket, moyens_de_paiememnt, montants, moyens_de_paiement2, motants2, type_print) {

    var AppelAjax = new Ajax.Request(
        "caisse_mdp_credit.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyens_de_paiememnt: moyens_de_paiememnt,
                montants: montants,
                moyens_de_paiement2: moyens_de_paiement2,
                motants2: motants2,
                type_print: type_print
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}
//// Remise totale
function close_pop_up_remise_totale() {
    $('pop_up_remise_totale').hide();
}


// creer contact a partir de la caisse

function close_pop_up_creer_conatct() {
    $('pop_up_creer_conatct').hide();
}
// tick restaurant
function close_pop_up_mini_ticket() {
    $('pop_up_mini_ticket').hide();
    //$('pop_up_mini_moteur_iframe').hide();
    //$('form_recherche_mini').reset();
    // $('resultat_contact_mini').innerHTML="";
}
//// ajouter moyen de payement tick resto
function caisse_ajouter_tick_resto_paiement(ref_ticket, moyen_de_paiement, somme) {
    var AppelAjax = new Ajax.Updater(
        "block_head",
        "caisse_ajouter_tick_resto_paiement.php", {
            parameters: {
                ref_ticket: ref_ticket,
                moyen_de_paiement: moyen_de_paiement,
                somme: somme
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}



function caisse_ajouter_remise_total(ref_ticket, remise) {

    var AppelAjax = new Ajax.Request(
        "caisse_ajouter_remise_sur_ticket.php", {
            parameters: {
                ref_ticket: ref_ticket,
                remise: remise
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );

}

// calculer et afficher le marge de benefice de ticket
function calcul_marge_benefice(ref_doc) {
    var AppelAjax = new Ajax.Request(
        "ticket_marges.php", {
            parameters: {
                ref_doc: ref_doc
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            },
            onComplete: H_loading
        }
    );
}

/////Sortie article
function sortie_article_depuis_caisse(code_article, stock_choisie_s) {
    var AppelAjax = new Ajax.Request(
        "sortie_article_depuis_caisse.php", {
            parameters: {
                code_article: code_article,
                stock_choisie_s: stock_choisie_s
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            },
            onComplete: H_loading
        }
    );
}

/////Reception article
function reception_article_depuis_caisse(code_article, stock_choisie_r) {
    var AppelAjax = new Ajax.Request(
        "reception_article_depuis_caisse.php", {
            parameters: {
                code_article: code_article,
                stock_choisie_r: stock_choisie_r
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            },
            onComplete: H_loading
        }
    );
}




////// Imprimer etat de caisse par caissier de aujourd'huit
function imprimer_etat_caisse_caissier() {
    window.open('etat_caisse_editing.php', '_blank');
}




function imprimer_etat_caisse_magasin() {
    window.open('etat_caisse_calcul_format_ticket.php', '_blank');
}




function show_mot_de_passe(function_called) {
    $("pop_up_mot_passe").style.display = "block";
    centrage_element('pop_up_mot_passe');
    var AppelAjax = new Ajax.Updater(
        "pop_up_mot_passe",
        "show_mot_de_passe.php", {
            method: 'post',
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            encoding: 'UTF-8',
            parameters: {
                function_called: function_called
            },
            evalScripts: true,
            onLoading: S_loading,
            onException: function() {
                S_failure();
            },
            onComplete: H_loading
        }
    );
}



// decaissement (depense) depuis la caisse
function close_pop_up_depense() {
    $('pop_up_depense').hide();
}

function close_pop_up_cheque() {
    $('pop_up_cheque').hide();
}


function close_pop_up_reception() {
    $("code_article_reception").style.backgroundColor = "#ffffff";
    $('pop_up_reception').hide();
}

function close_pop_up_sortie() {
    $("code_article_sortie").style.backgroundColor = "#ffffff";
    $('pop_up_sortie').hide();
}

///// Transfert fond de caisse
function caisse_transfert_fond() {

    var AppelAjax = new Ajax.Request(
        "caisse_transfert_fond.php", {
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            },
            onComplete: H_loading
        }
    );
}

// fermer la fenetre des commerciaux
function close_pop_up_commercial() {
    $('pop_up_commercial').hide();
}

//fonction d'impression

function articles_ticket() {
    var articles = '';
    var regDT = new RegExp('[DT]', 'gi');
    var arrayLignes = document.getElementById("TICKET").rows; //on recupere les lignes du tableau
    var longueur = arrayLignes.length; //on peut donc appliquer la propriete length
    articles += '<table width="175px"><tr> <td width="5px"> <font size="2"> Qt&eacute; </font></td> <td width="90px"> <font size="2"> D&eacute;signation <font size="1"> </td> <td width="15px"> PU </td>  <td width="65px"> <font size="2"> TOTAL </font> </td></tr>';
    for (var i = 1; i < longueur; i++) //on peut directement definir la variable i dans la boucle
    {
        articles += '<tr>';
        var arrayColonnes = arrayLignes[i].cells; //on recupere les cellules de la ligne
        //var largeur = arrayColonnes.length;
        articles += '<td><font size="1">' + arrayColonnes[2].innerHTML + ' X</font></td>';
        var textremise = "";
        if (arrayColonnes[4].innerHTML != '0.000') {
            var total_remise = price_format((parseFloat(arrayColonnes[2].innerHTML) * parseFloat(arrayColonnes[3].innerHTML.replace(regDT, ''))) - parseFloat(arrayColonnes[5].innerHTML.replace(regDT, '')));
            var remise = parseFloat(arrayColonnes[4].innerHTML).toFixed(1);
            textremise = '<br/> *Remise:&nbsp;' + remise + '% <br/> *Total Remise:&nbsp;' + total_remise + '&nbsp;DT';
        }
        articles += '<td><font size="1">' + arrayColonnes[1].innerHTML + textremise + '</font></td>';
        articles += '<td><font size="1">' + arrayColonnes[3].innerHTML.replace(regDT, '') + '</font></td>';
        articles += '<td><font size="1">' + arrayColonnes[5].innerHTML.replace(regDT, '') + '</font></td>';
        /*
         for(var j=0; j<largeur; j++)
        {
        if(j != 0 && j != 3 && j != 4){
        contenu  += '<td><font size="1">'+ arrayColonnes[j].innerHTML +'</font></td>';
        }
        }
        */
        articles += '</tr>';
    }
    articles += '<tr> <td colspan="4"> <center> <font size="1"> ---------------------------------------------------------------- <br/> ' + $("nbre_article").innerHTML + '&nbsp;&nbsp; Articles <br/>----------------------------------------------------------------</font></center> </td> </tr>';
    articles += '</table>';

    return articles;
}

function reglements_ticket() {
    var table = $("reglements_effectues");
    var reglement_a_rendre = caisse_calculer_a_rendre();
    var reglements = '';
    reglements += '<table width="160px">';
    reglements += '<tr> <td colspan="2"> <center> <font size="2"> TOTAL &nbsp;&nbsp; ' + $("caisse_total_s").value + ' &nbsp; DT  </font>   </center> </td>  </tr>';
    for (var i = 1; i < table.rows.length; i++) {
        var myen = $("MDP_" + i).value;
        var mp;
        switch (myen) {
            case 'mdp_especes':
                mp = "Esp&eacute;se";
                break;
            case 'mdp_cheque':
                mp = "Ch&eacute;que";
                break;
            case 'mdp_cb':
                mp = "Carte bancair";
                break;
            case 'mdp_tic_resto':
                mp = "Tickets Restaurant";
                break;
            default:
                mp = "Carte bancaire";
                break;
        }
        var smme = price_format($("MONTANT_" + i).value);
        reglements += '<tr><td width="80px"> <font size="1">' + mp + '</font> </td> <td width="80px" align="right"> <font size="1"> ' + smme + ' </font> </td> </tr>';
    }
    reglements += '<tr><td width="80px" align="right"> <font size="1">**********</font> </td> <td width="80px" align="left"> <font size="1"> ********** </font> </td> </tr>';
    reglements += '<tr><td width="80px"> <font size="1"> Rendu </font> </td> <td width="80px" align="right"> <font size="1"> ' + price_format(reglement_a_rendre) + ' </font> </td> </tr>';
    reglements += '</table>';

    return reglements;
}

function reglements_ticket_remise_on() {
    var table = $("reglements_effectues");
    var reglement_a_rendre = caisse_calculer_a_rendre();
    //var total_reglement = 0;
    var reglements = '';

    reglements += '<table width="160px">';
    reglements += '<tr> <td colspan="2"> <center> <font size="2"> TOTAL &nbsp;&nbsp; ' + $("caisse_total_s").value + '&nbsp;DT  </font>   </center> </td>  </tr>';
    reglements += '<tr> <td colspan="2"> <center> <font size="2"> REMISE &nbsp;&nbsp; ' + Math.abs(reglement_a_rendre) + '&nbsp;DT  </font>   </center> </td>  </tr>';
    reglements += '<tr> <td colspan="2"> <center> <font size="2"> A PAYER &nbsp;&nbsp; ' + (parseFloat($("caisse_total_s").value) + reglement_a_rendre) + '&nbsp;DT  </font>   </center> </td>  </tr>';
    for (var i = 1; i < table.rows.length; i++) {
        var myen = $("MDP_" + i).value;
        var mp;
        switch (myen) {
            case 'mdp_especes':
                mp = "Esp&eacute;se";
                break;
            case 'mdp_cheque':
                mp = "Ch&eacute;que";
                break;
            case 'mdp_cb':
                mp = "Carte bancair";
                break;
            case 'mdp_tic_resto':
                mp = "Tickets Restaurant";
                break;
            default:
                mp = "Carte bancaire";
                break;
        }
        //total_reglement += $("MONTANT_"+i).value ;
        var smme = price_format($("MONTANT_" + i).value);
        reglements += '<tr><td width="80px"> <font size="1">' + mp + '</font> </td> <td width="80px" align="right"> <font size="1"> ' + smme + ' </font> </td> </tr>';
    }
    reglements += '<tr><td width="80px" align="right"> <font size="1">**********</font> </td> <td width="80px" align="left"> <font size="1"> ********** </font> </td> </tr>';
    //reglements +='<tr><td width="80px"> <font size="1"> Rendu </font> </td> <td width="80px" align="right"> <font size="1"> '+price_format(total_reglement)+' </font> </td> </tr>';
    reglements += '</table>';

    return reglements;
}

function reglements_ticket_accompte(total_ttc, ancien_acc) {
    var table = $("reglements_effectues");
    var reglement_a_rendre = caisse_calculer_a_rendre();
    var total_reglement = 0;
    var reglements = '';

    reglements += '<table width="160px">';

    for (var i = 1; i < table.rows.length; i++) {
        var myen = $("MDP_" + i).value;
        var mp;
        switch (myen) {
            case 'mdp_especes':
                mp = "Esp&eacute;se";
                break;
            case 'mdp_cheque':
                mp = "Ch&eacute;que";
                break;
            case 'mdp_cb':
                mp = "Carte bancair";
                break;
            case 'mdp_tic_resto':
                mp = "Tickets Restaurant";
                break;
            default:
                mp = "Carte bancaire";
                break;
        }
        total_reglement += $("MONTANT_" + i).value;
        var smme = price_format($("MONTANT_" + i).value);
        reglements += '<tr><td width="80px"> <font size="1">' + mp + '</font> </td> <td width="80px" align="right"> <font size="1"> ' + smme + ' </font> </td> </tr>';
    }
    total_reglement = parseFloat(total_reglement) + parseFloat(ancien_acc);
    reglements += '<tr> <td colspan="2">  <font size="2"> ACCOMPTE: &nbsp;&nbsp; ' + price_format(total_reglement) + '&nbsp;DT  </font>    </td>  </tr>';
    reglements += '<tr> <td colspan="2">  <font size="2"> RESTE: &nbsp;&nbsp; ' + price_format(parseFloat(total_ttc) - total_reglement) + '&nbsp;DT  </font>    </td>  </tr>';
    reglements += '<tr> <td colspan="2">  <font size="2"> TOTAL: &nbsp;&nbsp; ' + price_format(total_ttc) + '&nbsp;DT  </font>    </td>  </tr>';
    reglements += '<tr><td width="80px" align="right"> <font size="1">**********</font> </td> <td width="80px" align="left"> <font size="1"> ********** </font> </td> </tr>';
    reglements += '</table>';

    return reglements;
}

function footer_ticket() {
    var footer = '';
    footer += '<table width="160px">';
    footer += '<tr><td><font size="1"> <center> GARDER VOTRE TICKET EN CAS D\'&Eacute;CHANGE <br> VALIDIT&Eacute; 48 HEURES SAUF P&Eacute;RIODE SOLDE <br> MERCI DE VOTRE VISITE A BIENT&Ocirc;T <br/> ...................................... <br/>www.sidratsoft.com <center> </font></td></tr>';
    footer += '</table>';
    return footer;
}

function footer_ticket2(nom, tel, date) {
    var footer = '';
    footer += '<table width="160px">';
    footer += '<tr><td><font size="1"> <center> ' + nom + ' -- ' + tel + ' -- ' + date + '<br>GARDER VOTRE TICKET EN CAS D\'&Eacute;CHANGE <br> VALIDIT&Eacute; 48 HEURES SAUF P&Eacute;RIODE SOLDE <br> MERCI DE VOTRE VISITE A BIENT&Ocirc;T <br/> ...................................... <br/>www.sidratsoft.com <center> </font></td></tr>';
    footer += '</table>';
    return footer;
}
/*
function print_ticket(nom_magasin,caissier,pts_fidelite,contact,total_point) {
var contenu ='<html>';
    contenu += entete_ticket(nom_magasin,caissier,pts_fidelite,contact,total_point);
    contenu += articles_ticket();
    contenu += reglements_ticket();
    contenu += footer_ticket();   
	contenu += '</html>';
	useDefaultPrinter();
    //qz.findPrinter("EPSON TM-T20 Receipt");
    qz.setCopies(parseInt(1));
    qz.appendHTML(contenu);
    qz.printHTML();
}
*/
// 2 version: imprimer ticket avec remise ON
/*
function print_ticket_remise_on(nom_magasin,caissier,pts_fidelite,contact,total_point) {
var contenu ='<html>';
    contenu += entete_ticket(nom_magasin,caissier,pts_fidelite,contact,total_point);
    contenu += articles_ticket();
    contenu += reglements_ticket_remise_on();
    contenu += footer_ticket();   
	contenu += '</html>';
	useDefaultPrinter();
    //qz.findPrinter("EPSON TM-T20 Receipt");
    qz.setCopies(parseInt(1));
    qz.appendHTML(contenu);
    qz.printHTML();
}
*/
/* 
function print_ticket_accompte(nom_magasin,caissier,pts_fidelite,contact,total_point,total_ttc,ancien_acc,nom,tel,date) {
var contenu ='<html>';
    contenu += entete_ticket(nom_magasin,caissier,pts_fidelite,contact,total_point);
    contenu += articles_ticket();
    contenu += reglements_ticket_accompte(total_ttc,ancien_acc);
	if(contact==""){
    contenu += footer_ticket2(nom,tel,date);  
	}else{
	contenu += footer_ticket();
	}	
	contenu += '</html>';
	useDefaultPrinter();
    //qz.findPrinter("EPSON TM-T20 Receipt");
    qz.setCopies(parseInt(1));
    qz.appendHTML(contenu);
    qz.printHTML();
	
	qz.setCopies(parseInt(1));
    qz.appendHTML(contenu);
    qz.printHTML();
	
}
*/
function caisse_retour_article(ref_ticket, retour) {

    var AppelAjax = new Ajax.Request(
        "caisse_retour_article.php", {
            parameters: {
                ref_ticket: ref_ticket,
                retour: retour,
                ref_contact: $("ref_contact").value
            },
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
            }
        }
    );
}

function close_pop_up_retour_article() {
    $('pop_up_retour_article').hide();
}

function caisse_update() {
    var AppelAjax = new Ajax.Request(
        "update_autocomplite.php", {
            parameters: {},
            evalScripts: true,
            onLoading: S_loading,
            onSuccess: function(requester) {
                requester.responseText.evalScripts();
                H_loading();
            }
        }
    );
}



function datemask(evt) {
    var array_num = new Array;
    var id_field = Event.element(evt);
    var field_value = id_field.value;
    var u_field_num = Array.from(field_value);
    var jo = "";
    var mm = "";
    var aaaa = "";

    for (i = 0; i < u_field_num.length; i++) {
        if (!isNaN(u_field_num[i]) && u_field_num[i] != " ") {
            array_num.push(u_field_num[i]);
        }
    }


    for (i = 0; i < array_num.length; i++) {
        if (i == 0) {
            if (array_num[0] > 3) {
                array_num.splice(1, 0, array_num[0]);
                array_num[0] = 0;
            }
            jo = array_num[0] + "";
        }
        if (i == 1) {
            if (array_num[0] == 3 && array_num[1] > 1) {
                array_num[1] = 1;
            }
            jo += array_num[1];
        }
        if (i == 2) {
            if (array_num[2] > 1) {
                array_num.splice(3, 0, array_num[2]);
                array_num[2] = 0;
            }
            mm += "-" + array_num[i] + "";
        }
        if (i == 3) {
            if (array_num[3] > 2 && array_num[2] == 1) {
                array_num[3] = 2;
            }
            if (array_num[3] == 2 && array_num[2] == 0) {
                if (array_num[0] > 2) {
                    array_num[0] = 2;
                    array_num[1] = 8;
                    jo = array_num[0] + "" + array_num[1];
                }
            }
            mm += array_num[i];

        }
        if (i == 4 || i == 5 || i == 6 || i == 7) {
            if (i == 4) {
                aaaa += "-";
            }
            if (i == 4 && (array_num[i] > 2 || array_num[i] < 2)) {
                if (array_num[i] > 2) {
                    array_num[7] = array_num[i + 1];
                    array_num[6] = array_num[i];
                    array_num[5] = 9;
                    array_num[4] = 1;
                } else {
                    array_num[7] = array_num[i + 1];
                    array_num[6] = array_num[i];
                    array_num[5] = 0;
                    array_num[4] = 2;
                }
            }
            aaaa += array_num[i] + "";
        }




    }

    $(id_field.id).value = jo + mm + aaaa;
}