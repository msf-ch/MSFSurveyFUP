childPage1Views = [
			{viewType : "date", conceptId : "datenq", label : "Date du suivi"},
			{viewType : "number", conceptId : "nomenq", label : "Numéro de l'enquêteur", bounds : {maxLength : 3}},
			{viewType : "text", conceptId : "zonenom", label : "Nom de la zone", bounds : {maxLength : 25}},
			{viewType : "number", conceptId : "zonenum", label : "Numéro de la zone", bounds : {minValue : 1, maxValue : 3}},
			{viewType : "number", conceptId : "nummen", label : "Numéro du ménage", bounds : {minValue : 1, maxValue : 9999}},
			{viewType : "number", conceptId : "nuvill", label : "Numéro du village", bounds : {minValue : 1, maxValue : 99}},
			{viewType : "number", conceptId : "enfid", label : "Identification de l'enfant", bounds : {minValue : 1, maxValue : 99999}},
			{viewType : "number", conceptId : "numcoup", label : "Numéro du coupon", bounds : {minValue : 1, maxValue : 99999}},
			{viewType : "text", conceptId : "enfnom", label : "Nom de famille de l'enfant", bounds : {maxLength : 25}},
			{viewType : "text", conceptId : "prenenf", label : "Prénom de l'enfant", bounds : {maxLength : 25}},
			{viewType : "date", conceptId : "naisenf", label : "Date de naissance de l'enfant"},
			{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)", bounds : {minValue : 0, maxValue : 30}},
			{viewType : "radio", conceptId : "obtage", label : "Comment avez-vous obtenu l'âge?", options : [
				{ value : "1", label : "carnet de vaccination"},
				{ value : "2", label : "certificat naissance"},
				{ value : "3", label : "information maman"},
				{ value : "4", label : "utilisation calendrier local"}]},
			{viewType : "radio", conceptId : "sexenf", label : "Sexe de l'enfant", options : [
				{ value : "1", label : "male"},
				{ value : "2", label : "female"},
				{ value : "9", label : "NA ou non spécifié"}]},
			{viewType : "text", conceptId : "mernom", label : "Nom de famille de la mère", bounds : {maxLength : 25}},
			{viewType : "text", conceptId : "merpren", label : "Prénom de la mère", bounds : {maxLength : 25}},
			{viewType : "text", conceptId : "pernom", label : "Nom de famille du père", bounds : {maxLength : 25}},
			{viewType : "text", conceptId : "perpren", label : "Prénom du père", bounds : {maxLength : 25}},
			{viewType : "text", conceptId : "tel", label : "Numéro de téléphone", bounds : {maxLength : 25}},
			{viewType : "radio", conceptId : "accomp", label : "Accompagnant de l'enfant", options : [
				{ value : "1", label : "mère"},
				{ value : "2", label : "père"},
				{ value : "3", label : "grand mère"},
				{ value : "4", label : "autre"}]},
			{viewType : "text", conceptId : "accompprecise", label : "Préciser:",
				showIf : {conceptIds : ["accomp"], condition: "accomp == '4'"},
				bounds : {maxLength : 25}},
];
childPage2Views = [
			{viewType : "radio", conceptId : "laitcont", label : "L'enfant continue-t-il d'être allaité?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}]},
			{viewType : "radio", conceptId : "vaccinat", label : "L'enfant a-t-il été vacciné depuis notre dernière visite?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}]},
			vaccinesCheckbox = { viewType : "checkboxgroup", label : "Si oui quel vaccin a-t-il reçu?", conceptId : "vaccinesCheckbox", children : [
				{ label : "vaccination polio", conceptId : "vacpolio"},
				{ label : "vaccination rougeole", conceptId : "vacrouge"},
				{ label : "vaccination pentavalent", conceptId : "vacpenta"},
				{ label : "autre vaccination", conceptId : "vacautre"}],
				showIf : {conceptIds : ["vaccinat"], condition: "vaccinat == '1'"}},
			{viewType : "radio", conceptId : "ppdreac", label : "Avez-vous remarqué des réactions particulières après la prise du supplément nutritionnel?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}],
				showIf : {conceptIds : ["vacautre"], condition: "vacautre == 'true'"}},
			reactionsCheckbox = { viewType : "checkboxgroup", label : "Si oui qu'avez-vous remarqué?", conceptId : "reactionsCheckbox", children : [
				{ label : "Diarrhée", conceptId : "ppddiarr"},
				{ label : "Vomissement", conceptId : "ppdvomis"},
				{ label : "Rash cutané", conceptId : "ppdrash"},
				{ label : "Autre", conceptId : "ppdautre"}],
				showIf : {conceptIds : ["ppdreac"], condition: "ppdreac == '1'"}},
			{viewType : "text", conceptId : "ppdautreprecise", label : "Préciser:",
				showIf : {conceptIds : ["ppdautre"], condition: "ppdautre == 'true'"}},
			{viewType : "number", conceptId : "pmmes", label : "Mesure du perimètre brachial (MUAC) (mm)"},
			{viewType : "radio", conceptId : "oedem", label : "Oedèmes bilateraux", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}]},
			{viewType : "number", conceptId : "poids", label : "Poids de l'enfant (kg)"},
			{viewType : "number", conceptId : "taille", label : "Taille de l'enfant (cm)"},
];
childPage3Views = [
			{viewType : "radio", conceptId : "malad", label : "L'enfant a-t-il été malade depuis la dernière visite?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}]},
			symptomesCheckbox = { viewType : "checkboxgroup", label : "Symptômes", conceptId : "symptomesCheckbox", children : [
				{ label : "Fièvre", conceptId : "fievre"},
				{ label : "Toux", conceptId : "toux"},
				{ label : "Diarrhée", conceptId : "diarhe"},
				{ label : "Convulsion", conceptId : "convuls"},
				{ label : "Perte de poids", conceptId : "poidpert"},
				{ label : "Douleur adbominale", conceptId : "abdom"},
				{ label : "Vomissement", conceptId : "vomis"},
				{ label : "Difficulté à respirer", conceptId : "respir"},
				{ label : "Problème pour uriner", conceptId : "urine"},
				{ label : "Maux de tête", conceptId : "cephal"},
				{ label : "Constipation", conceptId : "constip"},
				{ label : "Problème aux oreilles", conceptId : "oreill"},
				{ label : "Problème aux yeux", conceptId : "yeux"},
				{ label : "Perte appetit", conceptId : "appet"},
				{ label : "Brûlure", conceptId : "brulur"},
				{ label : "Saignement", conceptId : "sang"},
				{ label : "Traumatisme", conceptId : "trauma"},
				{ label : "Maux de gorge", conceptId : "gorge"},
				{ label : "Non Specifié", conceptId : "nonspec"},
				{ label : "Autre No1", conceptId : "autre1"},
				{ label : "Autre No2", conceptId : "autre2"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "eptemps", label : "Combien de temps a duré l'épisode de maladie", options : [
				{ value : "1", label : "1-2jrs"},
				{ value : "2", label : "3-5 jrs"},
				{ value : "3", label : ">5jrs"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "epsoin", label : "Quelque chose a-t-il été fait à l'apparition de la maladie par vous ou qu'elqu'un de la famille?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			reasonCheckbox = { viewType : "checkboxgroup", label : "Quelles sont les raisons de n'avoir rien entrepris", conceptId : "reasonCheckbox", children : [
				{ label : "Raison financière", conceptId : "nofin"},
				{ label : "Manque de transport", conceptId : "notransp"},
				{ label : "Maladie trop grave", conceptId : "notgve"},
				{ label : "Manque de temps", conceptId : "notime"},
				{ label : "CDS trop loin", conceptId : "nocdsl"},
				{ label : "Problème de sécurité", conceptId : "nosecur"},
				{ label : "Maladie pas trop grave", conceptId : "nomgve"},
				{ label : "Autre raison", conceptId : "noautre"}],
				showIf : {conceptIds : ["malad", "epsoin"], condition: "malad == '1' && epsoin == '2'"}},
			{viewType : "text", conceptId : "noautreprecise", label : "Préciser:",
				showIf : {conceptIds : ["noautre"], condition: "noautre == 'true'"}},
			whatdoneCheckbox = { viewType : "checkboxgroup", label : "Si oui, qu'est-ce qui a été fait?", conceptId : "whatdoneCheckbox", children : [
				{ label : "Consultation au CDS", conceptId : "reccds"},
				{ label : "Est allé à l'hôpital", conceptId : "rechop"},
				{ label : "Consulter un médecin privé", conceptId : "recmed"},
				{ label : "Consulter un agent communautaire", conceptId : "recagcom"},
				{ label : "Consulté un parent médical ou paramédical", conceptId : "recparmd"},
				{ label : "Utiliser médicament existant à la maison", conceptId : "recmedma"},
				{ label : "A acheté des médicaments en pharmacie /au marché", conceptId : "recachmt"},
				{ label : "A consulté un guérisseur", conceptId : "recgueri"},
				{ label : "A consulté un marabout", conceptId : "recmarab"},
				{ label : "Achat de médicaments traditionnels", conceptId : "recatrad"},
				{ label : "Consulté Dr Choco", conceptId : "rechoco"},
				{ label : "Autre", conceptId : "recautre"}],
				showIf : {conceptIds : ["malad", "epsoin"], condition: "malad == '1' && epsoin == '1'"}},
			{viewType : "text", conceptId : "recautreprecise", label : "Préciser:",
				showIf : {conceptIds : ["recautre"], condition: "recautre == 'true'"}},
];
childPage4Views = [
			{viewType : "radio", conceptId : "epevol", label : "Comment a évolué l'enfant après cette demarche?", options : [
				{ value : "1", label : "il a guéri"},
				{ value : "2", label : "traitement en cours"},
				{ value : "3", label : "il s'est amélioré"},
				{ value : "4", label : "son état s'est aggravé"},
				{ value : "5", label : "aucun changement"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "dmiss", label : "L'enfant a-t-il dû être admis à l'hôpital de Massakory?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "eprest", label : "L'enfant est-il toujours malade aujourd'hui?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "enqrefer", label : "L'enquêteur a-t-il référé l'enfant?", options : [
				{ value : "1", label : "oui"},
				{ value : "2", label : "non"},
				{ value : "9", label : "ne sait pas ou non spécifié"}],
				showIf : {conceptIds : ["malad"], condition: "malad == '1'"}},
			{viewType : "radio", conceptId : "decision", label : "Si oui, à quel centre l'enfant a-t-il été référé?", options : [
				{ value : "1", label : "Centre de santé"},
				{ value : "2", label : "Agent communautaire"},
				{ value : "3", label : "Hôpital"}],
				showIf : {conceptIds : ["malad", "enqrefer"], condition: "malad == '1' && enqrefer == '1'"}},
			{viewType : "number", conceptId : "enfidrep", label : "Numero d'identification de l'enfant, répétition"},
];
introPage = {
	header : {
		title : "Child_FUP", 
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
childPage1 = {
	header : {
		title : "Page 1 : INFORMATION SUIVI ENFANT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage1Views
	}
};
childPage2 = {
	header : {
		title : "Page 2 : INFORMATION ALAITEMENT, VACCINATION, REACTION ASPE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage2Views
	}
};
childPage3 = {
	header : {
		title : "Page 3 : MORBIDITE",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage3Views
	}
};
childPage4 = {
	header : {
		title : "Page 4 : ",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage4Views
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
	global : {},
	pages : [
		childPage1,
		childPage2,
		childPage3,
		childPage4,
		SubmitPage]
};
