﻿﻿childPage5Views = [
			{viewType : "date", conceptId : "datenq", label : "Date de l'enquête / du suivi"},
			{viewType : "text", conceptId : "nomenq", label : "Numéro de l'enquêteur"},
			{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"},
			{viewType : "number", conceptId : "zonenum", label : "Numéro de la zone"},
			{viewType : "number", conceptId : "nummen", label : "Numéro du ménage"},
			{viewType : "number", conceptId : "nuvill", label : "Numéro du village"},
			{viewType : "number", conceptId : "enfid", label : "Identification de l'enfant"},
			{viewType : "number", conceptId : "numcoup", label : "Numéro du coupon"},
			{viewType : "text", conceptId : "enfnom", label : "Nom de famille de l'enfant"},
			{viewType : "text", conceptId : "prenenf", label : "Prénom de l'enfant"},
			{viewType : "date", conceptId : "naisenf", label : "Date de naissance de l'enfant"},
			{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)"},
			{viewType : "radio", conceptId : "obtage", label : "Comment avez-vous obtenu l'âge?", options : [
				{ value : "1", label : "carnet de vaccination"},
				{ value : "2", label : "certificat naissance"},
				{ value : "3", label : "information maman"},
				{ value : "4", label : "utilisation calendrier local"}]},
			{viewType : "radio", conceptId : "sexenf", label : "Sexe de l'enfant", options : [
				{ value : "1", label : "male"},
				{ value : "2", label : "female"},
				{ value : "9", label : "NA ou non spécifié"}]},
			{viewType : "text", conceptId : "mernom", label : "Nom de famille de la mère"},
			{viewType : "text", conceptId : "merpren", label : "Prénom de la mère"},
			{viewType : "text", conceptId : "pernom", label : "Nom de famille du père"},
			{viewType : "text", conceptId : "perpren", label : "Prénom du père"},
			{viewType : "text", conceptId : "tel", label : "Numéro de téléphone"},
			{viewType : "radio", conceptId : "accomp", label : "Accompagnant de l'enfant", options : [
				{ value : "1", label : "mère"},
				{ value : "2", label : "père"},
				{ value : "3", label : "grand mère"},
				{ value : "4", label : "autre"}]},
			{viewType : "text", conceptId : "accompprecise", label : "Préciser:",
				showIf : {conceptIds : ["accomp"], condition: "accomp == '4'"}},
			{viewType : "radio", conceptId : "consent", label : "Consentement éclairé signé", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"}]},
];
childPage6Views = [
			{viewType : "text", conceptId : "localis", label : "Localisation de la maison dans le village"},
			{viewType : "radio", conceptId : "vitavec", label : "Avec qui l'enfant vit habituellement", options : [
				{ value : "1", label : "sa mère"},
				{ value : "2", label : "son père"},
				{ value : "3", label : "sa grand-mère"},
				{ value : "4", label : "autre personne"}]},
			{viewType : "radio", conceptId : "orphan", label : "Est-ce que l'enfant est orphelin?", options : [
				{ value : "2", label : "non"},
				{ value : "3", label : "de père"},
				{ value : "4", label : "de mère"},
				{ value : "5", label : "les deux"}]},
			{viewType : "number", conceptId : "coepous", label : "Nombre de co-épouses de la mère"},
			{viewType : "radio", conceptId : "maritstat", label : "Statut marital de la mère", options : [
				{ value : "1", label : "mariée"},
				{ value : "2", label : "divorcée"},
				{ value : "3", label : "veuve"},
				{ value : "4", label : "séparée"}]},
			{viewType : "radio", conceptId : "allaitna", label : "L'enfant a-t-il été allaité depuis la naissance?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "number", conceptId : "alaitage", label : "Jusqu'à quel âge l'enfant a-t-il été exclusivement allaité? (en mois)"},
			{viewType : "radio", conceptId : "laitcont", label : "L'enfant continue-t-il d'être allaité?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "vacinat", label : "L'enfant a-t-il été vacciné?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			vaccin2Checkbox = { viewType : "checkboxgroup", label : "Si oui, quel(s) vaccin(s) a-t-il reçu?", conceptId : "vaccin2Checkbox", children : [
				{ label : "Polio", conceptId : "polio"},
				{ label : "Rougeole", conceptId : "rougeole"},
				{ label : "Pentavalent (2-3 injections)", conceptId : "pentaval"},
				{ label : "Autre", conceptId : "autre"}],
				showIf : {conceptIds : ["accomp"], condition: "accomp == '1'"}},
			{viewType : "radio", conceptId : "adminut", label : "L'enfant a-t-il déjà été admis dans un centre nutritionnel?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "radio", conceptId : "nutprogm", label : "Si oui, de quelle prise en charge a-t-il bénéficié?", options : [
				{ value : "1", label : "centre nutritionnel CDS"},
				{ value : "2", label : "CNTH"},
				{ value : "3", label : "Suivi AC"},
				{ value : "4", label : "ne sait pas"}],
				showIf : {conceptIds : ["accomp"], condition: "accomp == '1'"}},
];
childPage7Views = [
			{viewType : "number", conceptId : "pmmes", label : "Mesure du périmètre brachial en mm"},
			{viewType : "radio", conceptId : "oedem", label : "Oedèmes bilatéraux", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			{viewType : "number", conceptId : "poids", label : "Poids de l'enfant en kg"},
			{viewType : "number", conceptId : "taille", label : "Taille de l'enfant en cm"},
			{viewType : "radio", conceptId : "malad", label : "L'enfant a -t-il été malade ?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}]},
			symptomesCheckbox = { viewType : "checkboxgroup", label : "", conceptId : "symptomesCheckbox", children : [
				{ label : "Fièvre", conceptId : "fievre"},
				{ label : "Toux", conceptId : "toux"},
				{ label : "Diarrhée", conceptId : "diarhe"},
				{ label : "Convulsions", conceptId : "convuls"},
				{ label : "Perte de poids", conceptId : "poidpert"},
				{ label : "Douleurs abdominales", conceptId : "abdom"},
				{ label : "Vomissements", conceptId : "vomis"},
				{ label : "Difficulté à respirer", conceptId : "repir"},
				{ label : "Problème pour uriner", conceptId : "urine"},
				{ label : "Maux de tête", conceptId : "cephal"},
				{ label : "Constipation", conceptId : "constip"},
				{ label : "Problème aux oreilles", conceptId : "oreill"},
				{ label : "Problème aux yeux", conceptId : "yeux"},
				{ label : "Perte d'appétit", conceptId : "appet"},
				{ label : "Brulûre", conceptId : "brulur"},
				{ label : "Saignement", conceptId : "sang"},
				{ label : "Traumatisme", conceptId : "trauma"},
				{ label : "Maux de gorge", conceptId : "gorge"},
				{ label : "Non specifié", conceptId : "nonspec"},
				{ label : "Autre n°1", conceptId : "autre1"},
				{ label : "Autre n°2", conceptId : "autre2"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "eptemps", label : "Combien de temps a duré l'épisode de maladie?", options : [
				{ value : "1", label : "1-2 jours"},
				{ value : "2", label : "3-5 jours"},
				{ value : "3", label : ">5 jours"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "epsoin", label : "Quelque chose a-t-il été fait à l'apparition de la maladie par vous ou quelqu'un de la famille?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			raisonsCheckbox = { viewType : "checkboxgroup", label : "Quelles sont les raisons de n'avoir rien entrepris?", conceptId : "raisonsCheckbox", children : [
				{ label : "Raison financière", conceptId : "nofin"},
				{ label : "Manque de transport", conceptId : "notransp"},
				{ label : "Maladie trop grave", conceptId : "notgve"},
				{ label : "Manque de temps", conceptId : "notime"},
				{ label : "CDS trop loin", conceptId : "nocdsl"},
				{ label : "Problème de sécurité", conceptId : "nosecur"},
				{ label : "Maladie pas trop grave", conceptId : "nomgve"},
				{ label : "Autre raison", conceptId : "noautre"}],
				showIf : {conceptIds : ["malad", "epsoin"], condition: "malad == '1' && epsoin =='2'"}},
			demarcheCheckbox = { viewType : "checkboxgroup", label : "Si  oui, quelle a été la démarche entreprise?", conceptId : "demarcheCheckbox", children : [
				{ label : "Consultation au CDS", conceptId : "reccds"},
				{ label : "Est allé à l'hôpital", conceptId : "rechop"},
				{ label : "Consulté médecin privé", conceptId : "recmed"},
				{ label : "Consulté un agent communautaire", conceptId : "recagcom"},
				{ label : "Consulté un parent médical ou paramédical", conceptId : "recparmd"},
				{ label : "Utilisé un médicament existant à la maison", conceptId : "recmedma"},
				{ label : "Achats de médicaments au marché / pharmacie privée", conceptId : "recachmt"},
				{ label : "Consulté un guérisseur", conceptId : "recgueri"},
				{ label : "Consulté un marabout", conceptId : "recmarab"},
				{ label : "Acheté des médicaments traditionnels sur le marché", conceptId : "recatrad"},
				{ label : "Consulté Dr Choco", conceptId : "rechoco"},
				{ label : "Autre", conceptId : "recautre"}],
				showIf : {conceptIds : ["malad", "epsoin"], condition: "malad == '1' && epsoin =='1'"}},
			{viewType : "radio", conceptId : "admiss", label : "L'enfant a-t-il du être admis à l'hôpital ou dans un programme nutritionnel pour sa maladie?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "progadm", label : "Si oui dans quel programme?", options : [
				{ value : "1", label : "Centre nutritionnel hospitalier"},
				{ value : "2", label : "Centre nutritionnel CDS"},
				{ value : "3", label : "suivi par AC"},
				{ value : "4", label : "autre"}],
				showIf : {conceptIds : ["malad", "admiss"], condition: "malad == '1' && admiss =='1'"}},
			{viewType : "radio", conceptId : "epevol", label : "Comment l'enfant a évolué après la demarche?", options : [
				{ value : "1", label : "il a guéri"},
				{ value : "2", label : "traitement en cours"},
				{ value : "3", label : "ils'est amélioré"},
				{ value : "4", label : "son état s'est agravé"},
				{ value : "5", label : "aucun changement"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "eprest", label : "L'enfant est-il toujours malade aujourd'hui?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "decision", label : "Si oui quelle décision a été prise?", options : [
				{ value : "1", label : "rien"},
				{ value : "2", label : "referé à l'AC"},
				{ value : "3", label : "referé au CDS"},
				{ value : "4", label : "autre"}],
				showIf : {conceptIds : ["malad", "eprest"], condition: "malad == '1' && eprest =='1'"}},
			{viewType : "number", conceptId : "enfidre", label : "Identification de l'enfant"},
];
introPage = {
	header : {
		title : "Child_Inclusion", 
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
childPage5 = {
	header : {
		title : "Page 5 : NFORMATION INCLUSION ENFANT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage5Views
	}
};
childPage6 = {
	header : {
		title : "Page 6 : INFORMATIONS SUR L'ENFANT ET SA FAMILLE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage6Views
	}
};
childPage7 = {
	header : {
		title : "Page 7 : MESURES ANTHROPOMETRIQUES",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage7Views
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
		childPage5,
		childPage6,
		childPage7,
		SubmitPage]
};
