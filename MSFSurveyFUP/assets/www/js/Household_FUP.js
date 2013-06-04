childPage8Views = [
			{viewType : "date", conceptId : "datenq", label : "Date du suivi"},
			{viewType : "number", conceptId : "nomenq", label : "Numéro de l'enquêteur"},
			{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"},
			{viewType : "number", conceptId : "zonenum", label : "Numéro de la zone"},
			{viewType : "number", conceptId : "nummen", label : "Numéro du ménage"},
			{viewType : "number", conceptId : "nuvill", label : "Numéro du village"},
			{viewType : "text", conceptId : "mernom", label : "Nom de famille de la mère"},
			{viewType : "text", conceptId : "merpren", label : "Prénom de la mère"},
			{viewType : "text", conceptId : "pernom", label : "Nom de famille du père"},
			{viewType : "text", conceptId : "perpren", label : "Prénom du père"},
			{viewType : "text", conceptId : "tel", label : "Numéro de téléphone"},
			{viewType : "number", conceptId : "numenfet", label : "Nombre d'enfants dans l'étude"},
			{viewType : "radio", conceptId : "eauorig", label : "D'où provient l'eau que boivent actuellement les membres du ménage", options : [
				{ value : "1", label : "puits avec forage avec pompe manuelle"},
				{ value : "2", label : "puit avec buse et protégé"},
				{ value : "3", label : "puits non protégé"},
				{ value : "4", label : "rivière/marigot/mare"},
				{ value : "5", label : "eau de pluie"},
				{ value : "6", label : "autre"},
				{ value : "9", label : "inconnu"}]},
			{viewType : "radio", conceptId : "eaulava", label : "Le ménage utilise-t-il une source d'eau différente pour lavage /toilette ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
];
childPage9Views = [
			{viewType : "number", conceptId : "numenag", label : "Nombre de personne dans le ménage"},
			{viewType : "radio", conceptId : "sexecm", label : "Sexe du chef de ménage", options : [
				{ value : "1", label : "Homme"},
				{ value : "2", label : "Femme"}]},
			{viewType : "number", conceptId : "agecm", label : "Age du chef de ménage"},
			{viewType : "number", conceptId : "numenf", label : "Nombre d'enfant moins de 5 ans dans le ménage"},
			{viewType : "number", conceptId : "numnour", label : "Nombre d'enfant moins de 6 mois"},
			{viewType : "number", conceptId : "numenc", label : "Nombre de femme enceinte dans le ménage"},
			{viewType : "number", conceptId : "numarr", label : "Nombre personne arrivée dans le ménage"},
			{viewType : "number", conceptId : "numdep", label : "Nombre de personne qui ont quitté le ménage"},
			{viewType : "number", conceptId : "dcnomtot", label : "Nombre total de personnes décédées"},
			{viewType : "number", conceptId : "dcm5tot", label : "Nombre d'enfants de moins 5 ans décédés",
				showIf : {conceptIds : ["dcnomtot"], condition: "dcnomtot > 0"}},
			{viewType : "number", conceptId : "dcenf1", label : "Age enfant décédé No1 en mois",
				showIf : {conceptIds : ["dcm5tot"], condition: "dcm5tot >= 1"}},
			{viewType : "number", conceptId : "dcenf2", label : "Age enfant décédé No2 en mois",
				showIf : {conceptIds : ["dcm5tot"], condition: "dcm5tot >= 2"}},
			{viewType : "number", conceptId : "dcenf3", label : "Age enfant décédé No3 en mois",
				showIf : {conceptIds : ["dcm5tot"], condition: "dcm5tot >= 3"}},
			{viewType : "number", conceptId : "dcenf4", label : "Age enfant décédé No4 en mois",
				showIf : {conceptIds : ["dcm5tot"], condition: "dcm5tot >= 4"}},
			{viewType : "number", conceptId : "dcenf5", label : "Age enfant décédé No5 en mois",
				showIf : {conceptIds : ["dcm5tot"], condition: "dcm5tot == 5"}},
];
childPage10Views = [
			{viewType : "number", conceptId : "surfcul", label : "Quelle surface cultivez-vous ou avez-vous cultivé?"},
			{viewType : "radio", conceptId : "surfculunit", label : "Unité", options : [
				{ value : "1", label : "hectare"},
				{ value : "2", label : "coro"},
				{ value : "3", label : "m2"}]},
			cultivationCheckbox = { viewType : "checkboxgroup", label : "Pouvez vous nous dire ce que vous cultivez sur cette surface?", conceptId : "cultivationCheckbox", children : [
				{ label : "Mil", conceptId : "culmil"},
				{ label : "Niebe", conceptId : "culnieb"},
				{ label : "Autres pois", conceptId : "culpois"},
				{ label : "Mais", conceptId : "culmais"},
				{ label : "Cultures maraichères", conceptId : "culmara"},
				{ label : "Riz", conceptId : "culriz"},
				{ label : "Arachide", conceptId : "cularac"},
				{ label : "Haricot", conceptId : "culhari"},
				{ label : "Bere Bere", conceptId : "culberb"},
				{ label : "Autre", conceptId : "culaut"}],
				showIf : {conceptIds : ["surfcul"], condition: "surfcul > 0"}},
			{viewType : "radio", conceptId : "cultmar", label : "Avez vous des cultures de jardin ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "recolt3m", label : "Avez vous eu des récoltes dans les 3 mois?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			recolteCheckbox = { viewType : "checkboxgroup", label : "Si oui quels aliments avez vous recolté?", conceptId : "recolteCheckbox", children : [
				{ label : "Mil", conceptId : "recmil"},
				{ label : "Niebe", conceptId : "recnieb"},
				{ label : "Autres pois", conceptId : "recpois"},
				{ label : "Mais", conceptId : "recmais"},
				{ label : "Cultures maraichères", conceptId : "recmara"},
				{ label : "Riz", conceptId : "recriz"},
				{ label : "Arachide", conceptId : "recarac"},
				{ label : "Haricot", conceptId : "rechari"},
				{ label : "Bere Bere", conceptId : "recberb"},
				{ label : "Autre", conceptId : "recaut"}],
				showIf : {conceptIds : ["recolt3m"], condition: "recolt3m == '1'"}},
			menageCheckbox = { viewType : "checkboxgroup", label : "Pouvez vous nous dire ce que fait le ménage de sa récolte ? (par ordre de priorité)", conceptId : "menageCheckbox", children : [
				{ label : "Consommation", conceptId : "reconso"},
				{ label : "Conservation", conceptId : "reconser"},
				{ label : "Vente-échange sur le marché", conceptId : "revente"},
				{ label : "Remboursement de dettes", conceptId : "redette"},
				{ label : "Cotisation cérémoniale", conceptId : "recerem"},
				{ label : "Autre", conceptId : "reautre"}],
				showIf : {conceptIds : ["recolt3m"], condition: "recolt3m == '1'"}},
			consommeCheckbox = { viewType : "checkboxgroup", label : "Pouvez-vous nous dire ce que la famille a consommé dans les dernières 24 heures?", conceptId : "consommeCheckbox", children : [
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
			nourritureCheckbox = { viewType : "checkboxgroup", label : "Pouvez-vous nous dire d'où provient la nourriture que vous avez consommé? (par ordre de priorité)", conceptId : "nourritureCheckbox", children : [
				{ label : "Production agricole", conceptId : "proprod"},
				{ label : "Emprunt", conceptId : "proempr"},
				{ label : "Donation de la famille", conceptId : "prodona"},
				{ label : "Aide alimentaire reçue", conceptId : "proaidf"},
				{ label : "Achat-échange au marché", conceptId : "proacha"},
				{ label : "Nourriture donnée contre un travail", conceptId : "pronotr"},
				{ label : "Pêche", conceptId : "propech"},
				{ label : "Autre", conceptId : "proautr"}]},
];
childPage11Views = [
			{viewType : "radio", conceptId : "aprodif", label : "Avez-vous eu des difficultés à vous approvisionner ces derniers 3 mois ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			approvisionCheckbox = { viewType : "checkboxgroup", label : "Si oui, qu'avez-vous dû faire pour vous approvisionner? (par ordre de priorité)", conceptId : "approvisionCheckbox", children : [
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
				{ label : "Autre", conceptId : "apautr"}]},
			adoptCheckbox = { viewType : "checkboxgroup", label : "Y a-t-il d'autres moyens que votre famille a dû adopter dans ces derniers jours/semaines? (par ordre de priorité)", conceptId : "adoptCheckbox", children : [
				{ label : "Vente d'articles de ménage (ustensiles, couvertures,...)", conceptId : "apveust"},
				{ label : "Vente de fourniture de ménage", conceptId : "apvefmen"},
				{ label : "Vente de volaille", conceptId : "apvevol"},
				{ label : "Vente de petits animaux - chèvres, moutons", conceptId : "apvepan"},
				{ label : "Vente de grands animaux, troupeau", conceptId : "apvegan"},
				{ label : "Vente du bétail de reproduction", conceptId : "apvebet"},
				{ label : "Emprunt d'argent à des parents ou voisins", conceptId : "apempru"},
				{ label : "Déplacement d'un membre de la famille pour aller chercher du travail", conceptId : "apdeplac"},
				{ label : "Autre", conceptId : "apautmo"}]},
			{viewType : "radio", conceptId : "bienvent", label : "Avez-vous dû vendre une partie de vos biens ces derniers 3 mois (cheptel, terre, maison, moto, stocks, outils...)", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			vendreCheckbox = { viewType : "checkboxgroup", label : "Si oui, qu'avez-vous dû vendre?", conceptId : "vendreCheckbox", children : [
				{ label : "Du bétail", conceptId : "betvent"},
				{ label : "Terre", conceptId : "tervent"},
				{ label : "Maison", conceptId : "maisvent"},
				{ label : "Moto", conceptId : "motovent"},
				{ label : "Outil", conceptId : "outvent"},
				{ label : "Stock", conceptId : "stocvent"},
				{ label : "Autre", conceptId : "autvent"}]},
			{viewType : "radio", conceptId : "apdett", label : "Le ménage a-t-il des dettes aujourd'hui ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "number", conceptId : "numme2", label : "Numero d'identification du ménage, répétition"},
];
introPage = {
	header : {
		title : "Household_FUP", 
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
childPage8 = {
	header : {
		title : "Page 8 : INFORMATION SUIVI ENFANT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage8Views
	}
};
childPage9 = {
	header : {
		title : "Page 9 : DEMOGRAPHIE DU MENAGE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage9Views
	}
};
childPage10 = {
	header : {
		title : "Page 10 : PRODUCTION AGRICOLE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage10Views
	}
};
childPage11 = {
	header : {
		title : "Page 11 : DIFFICULTES D'APPROVISONNEMENT / DETTES",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage11Views
	}
};
SubmitPage = {
		header : {
		title : "Sauvegarder les données du formulaire",
		theme : "b"
	},
	footer : {
		theme : "c",
		footerButton3Text : "Sauvegarder",
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
	name : "household_fup",
	global : {},
	pages : [
		childPage8,
		childPage9,
		childPage10,
		childPage11,
		SubmitPage]
};
return formData;
