childPage12Views = [
			{viewType : "date", conceptId : "datenq", label : "Date de l'enquête / du suivi"},
			{viewType : "text", conceptId : "nomenq", label : "Numéro de l'enquêteur"},
			{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"},
			{viewType : "number", conceptId : "zonenum", label : "Numéro de la zone"},
			{viewType : "number", conceptId : "nummen", label : "Numéro du ménage"},
			{viewType : "number", conceptId : "nuvill", label : "Numéro du village"},
			{viewType : "number", conceptId : "numenfet", label : "Nombre d'enfants dans l'étude"},
			{viewType : "text", conceptId : "mernom", label : "Nom de famille de la mère"},
			{viewType : "text", conceptId : "merpren", label : "Prénom de la mère"},
			{viewType : "text", conceptId : "pernom", label : "Nom de famille du père"},
			{viewType : "text", conceptId : "perpren", label : "Prénom du père"},
			{viewType : "text", conceptId : "tel", label : "Numéro de téléphone"},
			{viewType : "radio", conceptId : "eauorig", label : "D'où provient l'eau que boivent actuellement les membres du ménage", options : [
				{ value : "1", label : "puit avec forage avec pompe manuelle"},
				{ value : "2", label : "puit avec buse et protégé"},
				{ value : "3", label : "puits non protégé"},
				{ value : "4", label : "rivière/marigot/mare"},
				{ value : "5", label : "eau de pluie"},
				{ value : "6", label : "autre"}]},
			{viewType : "text", conceptId : "eauorig_specif", label : "Préciser:",
				showIf : {conceptIds : ["eauorig"], condition: "eauorig == '6'"}},
			{viewType : "radio", conceptId : "eaulava", label : "D'où provient l'eau utilisée actuellement pour le lavage / toilette ?", options : [
				{ value : "1", label : "puit/forage"},
				{ value : "2", label : "puit non protégé"},
				{ value : "3", label : "eau de surface"}]},
];
childPage13Views = [
			{viewType : "radio", conceptId : "chefmen", label : "Qui est la personne responsable du ménage?", options : [
				{ value : "1", label : "mère"},
				{ value : "2", label : "père"},
				{ value : "3", label : "grand mère"},
				{ value : "4", label : "autre"}]},
			{viewType : "text", conceptId : "chefmen_specif", label : "Préciser:",
				showIf : {conceptIds : ["chefmen"], condition: "chefmen == '4'"}},
			{viewType : "radio", conceptId : "utiradio", label : "Quelle radio écoutez-vous", options : [
				{ value : "1", label : "radio nationale"},
				{ value : "2", label : "aucune radio"},
				{ value : "3", label : "autre"},
				{ value : "9", label : "non spécifié"}]},
			{viewType : "radio", conceptId : "csisdist", label : "A combien de temps de marche est localisé le centre de santé le plus proche de chez vous?", options : [
				{ value : "1", label : "dans le village"},
				{ value : "2", label : "moins de 30 minutes"},
				{ value : "3", label : "entre 30 minutes et 1 heure"},
				{ value : "4", label : "de 1 à 2 heures"},
				{ value : "5", label : "plus de 2 heures"},
				{ value : "6", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "educniv", label : "Quel est le plus haut niveau d'étude que le responsable du ménage a atteint?", options : [
				{ value : "1", label : "primaire"},
				{ value : "2", label : "secondaire"},
				{ value : "3", label : "école coranique"},
				{ value : "4", label : "université"},
				{ value : "5", label : "aucun"},
				{ value : "6", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "educenf", label : "A quelle ecole vont vos enfants?", options : [
				{ value : "1", label : "privée"},
				{ value : "2", label : "publique"},
				{ value : "3", label : "école coranique"},
				{ value : "4", label : "université"},
				{ value : "5", label : "aucun"},
				{ value : "6", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "menlang", label : "Quel language est parlé au sein du ménage?", options : [
				{ value : "1", label : "arabe"},
				{ value : "2", label : "kanembu"},
				{ value : "3", label : "goran"},
				{ value : "4", label : "français"},
				{ value : "5", label : "fulbe/fulata"},
				{ value : "6", label : "autre"}]},
			{viewType : "text", conceptId : "menlang_specif", label : "Préciser:",
				showIf : {conceptIds : ["menlang"], condition: "menlang == '6'"}},
			{viewType : "radio", conceptId : "mencara", label : "Quel est le statut résidentiel de votre famille dans ce village?", options : [
				{ value : "1", label : "nomade à 100%"},
				{ value : "2", label : "nomade et sédentaire"},
				{ value : "3", label : "sédentaire à 100%"},
				{ value : "4", label : "autre"}]},
			{viewType : "text", conceptId : "mencara_specif", label : "Préciser:",
				showIf : {conceptIds : ["mencara"], condition: "mencara == '4'"}},
];
childPage14Views = [
			{viewType : "number", conceptId : "numenag", label : "Nombre de personne dans le ménage"},
			{viewType : "radio", conceptId : "sexecm", label : "Sexe du chef de ménage", options : [
				{ value : "1", label : "Homme"},
				{ value : "2", label : "Femme"}]},
			{viewType : "number", conceptId : "agecm", label : "Age du chef de ménage"},
			{viewType : "number", conceptId : "numenf", label : "Nombre d'enfants de moins de 5 ans dans le ménage"},
			{viewType : "number", conceptId : "numnour", label : "Nombre d'enfants de moins de 6 mois"},
			{viewType : "number", conceptId : "numenc", label : "Nombre de femmes enceintes dans le ménage"},
];
childPage15Views = [
			{viewType : "radio", conceptId : "champ", label : "Possédez-vous une surface de champ cultivable?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "number", conceptId : "surfcul", label : "Quelle surface cultivable avez-vous ?",
				showIf : {conceptIds : ["champ"], condition: "champ == '1'"}},
			{viewType : "radio", conceptId : "surfcul_unité", label : "unité:", options : [
				{ value : "1", label : "hectare"},
				{ value : "2", label : "coro"},
				{ value : "3", label : "m2"}]},
			{viewType : "radio", conceptId : "cultsm", label : "Cultivez-vous vous-même la terre que vous possédez?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["champ"], condition: "champ == '1'"}},
			{viewType : "text", conceptId : "quicult", label : "Qui cultive votre terre?",
				showIf : {conceptIds : ["champ", "cultsm"], condition: "champ == '1' && cultsm == '2'"}},
			{viewType : "radio", conceptId : "employ", label : "Employez-vous des personnes pour vous aider dans vos champs?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"}],
				showIf : {conceptIds : ["champ", "cultsm"], condition: "champ == '1' && cultsm == '2'"}},
			{viewType : "radio", conceptId : "emptime", label : "Si oui, à quelle regularité employez-vous des personnes pour vous aider?", options : [
				{ value : "1", label : "de temps en temps"},
				{ value : "2", label : "tout le temps"},
				{ value : "3", label : "jamais"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["champ", "cultsm", "employ"], condition: "champ == '1' && cultsm == '2' && employ == '1'"}},
			{viewType : "radio", conceptId : "outil", label : "Avez-vous ou votre famille des outils pour cultiver?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "machin", label : "Avez-vous ou votre famille des machines pour cultiver?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			cheptelCheckbox = { viewType : "checkboxgroup", label : "Pouvez-vous nous dire à peu près le nombre de cheptel que vous avez?", conceptId : "cheptelCheckbox", children : [
				{ label : "Chameaux", conceptId : "chepcham"},
				{ label : "Taureaux", conceptId : "cheptaur"},
				{ label : "Vaches", conceptId : "chepvach"},
				{ label : "Moutons", conceptId : "chepmout"},
				{ label : "Chèvres", conceptId : "chepchevr"},
				{ label : "Volailles", conceptId : "chepvola"},
				{ label : "Chevaux", conceptId : "chepcheva"},
				{ label : "Anes", conceptId : "chepane"},
				{ label : "Autres", conceptId : "chepautr"}]},
			{viewType : "text", conceptId : "chepautr_specif", label : "Préciser l'espèce:",
				showIf : {conceptIds : ["chepautr"], condition: "chepautr > 0"}},
			{viewType : "radio", conceptId : "transp", label : "Votre famille possède-t-elle un moyen de transport motorisé?", options : [
				{ value : "1", label : "moto"},
				{ value : "2", label : "véhicule"},
				{ value : "3", label : "camion"},
				{ value : "4", label : "autre"},
				{ value : "5", label : "aucun"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "maison", label : "Votre famille possède-t-elle sa maison ou êtes-vous en location?", options : [
				{ value : "1", label : "propriétaire"},
				{ value : "2", label : "locataire"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "stock", label : "Avez-vous ou votre famille possède-t-elle des bâtiments pour stocks?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
];
childPage16Views = [
			{viewType : "number", conceptId : "revprod", label : "Vente de production agricole"},
			{viewType : "number", conceptId : "revempr", label : "Emprunts"},
			{viewType : "number", conceptId : "revtrav", label : "Travail contre argent"},
			{viewType : "number", conceptId : "revtran", label : "Transfert d'argent"},
			{viewType : "number", conceptId : "revmain", label : "Travail non qualifié-main oeuvre"},
			{viewType : "number", conceptId : "revbeta", label : "Vente de bétail (boeuf-chameau)"},
			{viewType : "number", conceptId : "revanim", label : "Vente de petits animaux"},
			{viewType : "number", conceptId : "revautr", label : "Autre"},
			{viewType : "radio", conceptId : "comerc", label : "Votre famille fait-elle du commerce?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "emploi", label : "Votre famille a-t-elle des employés?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			depensesCheckbox = { viewType : "checkboxgroup", label : "Quelles sont les dépenses du ménage dans le mois par ordre de priorités?", conceptId : "depensesCheckbox", children : [
				{ label : "Nourriture", conceptId : "depnour"},
				{ label : "Eau", conceptId : "depeau"},
				{ label : "Santé", conceptId : "depsant"},
				{ label : "Frais scolaires", conceptId : "depscol"},
				{ label : "Remboursement de dettes", conceptId : "depdet"},
				{ label : "Coûts de production", conceptId : "deprod"},
				{ label : "Effets personnels", conceptId : "depeff"},
				{ label : "Obligations sociales", conceptId : "depsoc"},
				{ label : "Loyer", conceptId : "deploy"},
				{ label : "Transport", conceptId : "deptpt"},
				{ label : "Paiement des employés", conceptId : "depstaf"},
				{ label : "Autre", conceptId : "depautr"}]},
			{viewType : "text", conceptId : "depautr_specif", label : "Préciser:",
				showIf : {conceptIds : ["depautr"], condition: "depautr == 'true'"}},
			cultivation2Checkbox = { viewType : "checkboxgroup", label : "Pouvez vous nous dire ce que vous cultivez sur cette surface?", conceptId : "cultivation2Checkbox", children : [
				{ label : "Mil", conceptId : "culmil"},
				{ label : "Niebe", conceptId : "culnieb"},
				{ label : "Autres pois", conceptId : "culpois"},
				{ label : "Mais", conceptId : "culmais"},
				{ label : "Cultures maraichères", conceptId : "culmara"},
				{ label : "Riz", conceptId : "culriz"},
				{ label : "Arachide", conceptId : "cularac"},
				{ label : "Haricots", conceptId : "culhari"},
				{ label : "Bere Bere", conceptId : "culberb"},
				{ label : "Autre", conceptId : "culaut"}],
				showIf : {conceptIds : ["champ"], condition: "champ == '1'"}},
			{viewType : "text", conceptId : "culaut_specif", label : "Préciser:",
				showIf : {conceptIds : ["culaut"], condition: "culaut == 'true'"}},
			{viewType : "radio", conceptId : "recolt3m", label : "Avez vous eu des récoltes dans les 3 mois?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["champ"], condition: "champ == '1'"}},
			recolte2Checkbox = { viewType : "checkboxgroup", label : "Si oui, quels aliments avez vous recoltés?", conceptId : "recolte2Checkbox", children : [
				{ label : "Mil", conceptId : "recmil"},
				{ label : "Niebe", conceptId : "recnieb"},
				{ label : "Autres pois", conceptId : "recpois"},
				{ label : "Mais", conceptId : "recmais"},
				{ label : "Cultures maraichères", conceptId : "recmara"},
				{ label : "Riz", conceptId : "recriz"},
				{ label : "Arachide", conceptId : "recarac"},
				{ label : "Haricots", conceptId : "rechari"},
				{ label : "Bere Bere", conceptId : "recberb"},
				{ label : "Autre", conceptId : "recaut"}],
				showIf : {conceptIds : ["champ", "recolt3m"], condition: "champ == '1' && recolt3m == '1'"}},
			{viewType : "text", conceptId : "recaut_specif", label : "Préciser:",
				showIf : {conceptIds : ["recaut"], condition: "recaut == 'true'"}},
];
childPage17Views = [
			{viewType : "radio", conceptId : "cultmar", label : "Avez vous des cultures de jardin ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			menage2Checkbox = { viewType : "checkboxgroup", label : "Pouvez vous nous dire ce que fait le ménage de sa récolte ? (par ordre de priorité)", conceptId : "menage2Checkbox", children : [
				{ label : "Consommation", conceptId : "reconso"},
				{ label : "Conservation", conceptId : "reconser"},
				{ label : "Vente-échange sur le marché", conceptId : "revente"},
				{ label : "Remboursement de dettes", conceptId : "redette"},
				{ label : "Cotisation cérémoniale", conceptId : "recerem"},
				{ label : "Autre", conceptId : "reautre"},
				{ label : "Pouvez-vous nous dire combien de temps vous dure la récolte habituellement? (en mois)", conceptId : "timrec"}],
				showIf : {conceptIds : ["recolt3m"], condition: "recolt3m == '1'"}},
			consommation2Checkbox = { viewType : "checkboxgroup", label : "Pouvez-vous nous dire ce que la famille a consommé dans les dernières 24 heures?", conceptId : "consommation2Checkbox", children : [
				{ label : "Céréales", conceptId : "conscere"},
				{ label : "Racines-tubercules", conceptId : "consrac"},
				{ label : "Pois-lentilles", conceptId : "conspois"},
				{ label : "Lait-produit laitier", conceptId : "conslait"},
				{ label : "Oeufs", conceptId : "consoeuf"},
				{ label : "Viande-abats-intestins", conceptId : "consvian"},
				{ label : "Poisson-produit du lac", conceptId : "conspoiss"},
				{ label : "Huile, lipide", conceptId : "conshuil"},
				{ label : "Sucre-Miel", conceptId : "conssucr"},
				{ label : "Fruits-légumes", conceptId : "consfruit"},
				{ label : "Noix", conceptId : "consnoix"},
				{ label : "Sorgho", conceptId : "consorgh"},
				{ label : "Autre", conceptId : "consautre"},
				{ label : "Ne sait pas", conceptId : "consignor"}]},
			{viewType : "number", conceptId : "repasnu", label : "Pouvez-vous nous dire combien de repas la famille a pris durant les dernières 24 heures?"},
			nourriture2Checkbox = { viewType : "checkboxgroup", label : "Pouvez-vous nous dire d'où provient la nourriture que vous avez consommé? (par ordre de priorité)", conceptId : "nourriture2Checkbox", children : [
				{ label : "Production agricole", conceptId : "proprod"},
				{ label : "Emprunt", conceptId : "proempr"},
				{ label : "Donation de la famille", conceptId : "prodona"},
				{ label : "Aide alimentaire reçue", conceptId : "proaidf"},
				{ label : "Achat-échange au marché", conceptId : "proacha"},
				{ label : "Nourriture donnée contre un travail", conceptId : "pronotr"},
				{ label : "Pêche", conceptId : "propech"},
				{ label : "Autre", conceptId : "proautr"}]},
			{viewType : "radio", conceptId : "ratgfd", label : "Le ménage a-t-il bénéficié de rations générales de nourriture dans les 3 derniers mois?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			recuCheckbox = { viewType : "checkboxgroup", label : "Qu'avez-vous reçu?", conceptId : "recuCheckbox", children : [
				{ label : "Ne sait pas", conceptId : "ratnosp"},
				{ label : "Céréales", conceptId : "ratcere"},
				{ label : "Huile", conceptId : "rathuil"},
				{ label : "Pois-lentilles", conceptId : "ratpois"},
				{ label : "Sucre", conceptId : "ratsucr"},
				{ label : "CSB-farine", conceptId : "ratcsb"},
				{ label : "Sel", conceptId : "ratsel"},
				{ label : "Autre", conceptId : "rataut"}],
				showIf : {conceptIds : ["ratgfd", "ratnosp"], condition: "ratgfd == '1' && ratnosp =='false'"}},
			{viewType : "text", conceptId : "rataut_specif", label : "Préciser:"},
			{viewType : "radio", conceptId : "ratvent", label : "La famille a-t-elle dû vendre une partie des rations recues?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			venduCheckbox = { viewType : "checkboxgroup", label : "Quels aliments ont-ils été vendu?", conceptId : "venduCheckbox", children : [
				{ label : "Ne sait pas", conceptId : "rvenosp"},
				{ label : "Céréales", conceptId : "rvecere"},
				{ label : "Huile", conceptId : "rvehuil"},
				{ label : "Pois-lentilles", conceptId : "rvepois"},
				{ label : "Sucre", conceptId : "rvesucr"},
				{ label : "CSB-farine", conceptId : "rvecsb"},
				{ label : "Sel", conceptId : "rvesel"},
				{ label : "Autre", conceptId : "rveaut"}],
				showIf : {conceptIds : ["ratgfd", "rvenosp"], condition: "ratgfd == '1' && rvenosp =='false'"}},
			{viewType : "text", conceptId : "rveaut_specif", label : "Préciser:"},
];
childPage18Views = [
			{viewType : "radio", conceptId : "aprodif", label : "La famille a-t-elle eu des difficultés à s'approvisionner ces derniers 3 mois ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			approvision2Checkbox = { viewType : "checkboxgroup", label : "Si oui, qu'avez-vous dû faire pour vous approvisionner? (par ordre de priorité)", conceptId : "approvision2Checkbox", children : [
				{ label : "Compter sur nourriture moins chère ou moins appreciée", conceptId : "apmcher"},
				{ label : "Emprunter de la nourriture, aide de la famille", conceptId : "apempr"},
				{ label : "Collecter des aliments sauvages qui ne sont pas consommés habituellement", conceptId : "apsauv"},
				{ label : "Récolter des cultures immatures", conceptId : "apcult"},
				{ label : "Consommer les stocks de semences conservées pour la saison agricole future", conceptId : "apseme"},
				{ label : "Réduction des portions des repas", conceptId : "apredu"},
				{ label : "Reduction du nombre de repas", conceptId : "apredr"},
				{ label : "Réduction de la consommation pour les adultes afin que les enfants puissent manger", conceptId : "apredad"},
				{ label : "Réduction des dépenses pour la santé et l'éducation", conceptId : "aprepre"},
				{ label : "Utiliser les économies pour acheter de la nourriture", conceptId : "aputeco"},
				{ label : "Mendicité", conceptId : "apmedic"},
				{ label : "Autre", conceptId : "apautr"}],
				showIf : {conceptIds : ["aprodif"], condition: "aprodif == '1'"}},
			{viewType : "text", conceptId : "apautr_specif", label : "Préciser:",
				showIf : {conceptIds : ["apautr"], condition: "apautr == 'true'"}},
			adopter2Checkbox = { viewType : "checkboxgroup", label : "Y a-t-il d'autres moyens que votre famille a dû adopter dans ces derniers jours/semaines? (par ordre de priorité)", conceptId : "adopter2Checkbox", children : [
				{ label : "Vente d'articles de ménage (ustensiles, couvertures,...)", conceptId : "apveust"},
				{ label : "Vente de fourniture de ménage", conceptId : "apvefmen"},
				{ label : "Vente de volaille", conceptId : "apvevol"},
				{ label : "Vente de petits animaux - chèvres, moutons", conceptId : "apvepan"},
				{ label : "Vente de grands animaux, troupeau", conceptId : "apvegan"},
				{ label : "Vente du bétail de reproduction", conceptId : "apvebet"},
				{ label : "Emprunt d'argent à des parents ou voisins", conceptId : "apempru"},
				{ label : "Déplacement d'un membre de la famille pour aller chercher du travail", conceptId : "apdeplac"},
				{ label : "Autre", conceptId : "apautmo"}],
				showIf : {conceptIds : ["aprodif"], condition: "aprodif == '1'"}},
			{viewType : "text", conceptId : "apautmo_specif", label : "Préciser:",
				showIf : {conceptIds : ["apautmo"], condition: "apautmo == 'true'"}},
			{viewType : "radio", conceptId : "apdett", label : "Le ménage a-t-il des dettes aujourd'hui ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "number", conceptId : "numme2", label : "Numero d'identification du ménage, répétition"},
];
introPage = {
	header : {
		title : "Household_Inclusion", 
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		view : []
	}
};
childPage12 = {
	header : {
		title : "Page 12 : INFORMATION INCLUSION ENFANT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage12Views
	}
};
childPage13 = {
	header : {
		title : "Page 13 : ORGANISATION DU MENAGE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage13Views
	}
};
childPage14 = {
	header : {
		title : "Page 14 : DEMOGRAPHIE DU MENAGE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage14Views
	}
};
childPage15 = {
	header : {
		title : "Page 15 : BIENS, PROPRIETES, TERRES POSSEDEES",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage15Views
	}
};
childPage16 = {
	header : {
		title : "Page 16 : SOURCES DE REVENUS / REVENUS EN ARGENT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage16Views
	}
};
childPage17 = {
	header : {
		title : "Page 17 : ",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage17Views
	}
};
childPage18 = {
	header : {
		title : "Page 18 : DIFFICULTES D'APPROVISONNEMENT / DETTES",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage18Views
	}
};
SubmitPage = {
		header : {
		title : "Submit form data",
		theme : "b"
	},
	footer : {
		theme : "c",
		footerButton3Text : "Submit",
		footerButton3Theme : "e",
		footerButton3Icon : "plus",
		footerButton3Action : "submit",
		footerButton3Disabled : false
	},
	content : {
		theme : "c",
		views : [{viewType : "submitpage"}]
	}
};
formData = {
	global : {},
	pages : [
		childPage12,
		childPage13,
		childPage14,
		childPage15,
		childPage16,
		childPage17,
		childPage18,
		SubmitPage]
};
