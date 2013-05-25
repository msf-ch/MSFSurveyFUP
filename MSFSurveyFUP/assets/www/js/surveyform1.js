/*
 * These define all the questions that you'll see on a particular page.
 * It's a JSON array. I've given it its own variable to highlight it. The
 * childPage1Views variable gets used later on for the final structure.
*/

childPage1Views = [
	{viewType : "date", conceptId : "datenq", label : "Date du suivi",
		hideIf : {conceptIds : ["nomenq"], condition : "nomenq == '4'"}}, 
	{viewType : "number", conceptId : "nomenq", label : "Num\xE9ro de l'enqu\xEAteur"}, 
	{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"}, 
	{viewType : "number", conceptId : "zonenum", label : "Num\xE9ro de la zone"}, 
	{viewType : "number", conceptId : "nummen", label : "Num\xE9ro du m\xE9nage"}, 
	{viewType : "number", conceptId : "nuvill", label : "Num\xE9ro du village"}, 
	{viewType : "number", conceptId : "enfid", label : "Identification de l'enfant"}, 
	{viewType : "number", conceptId : "numcoup", label : "Num\xE9ro du coupon"}, 
	{viewType : "text", conceptId : "enfnom", label : "Nom de famille de l'enfant"}, 
	{viewType : "text", conceptId : "prenenf", label : "Pr\xE9nom de l'enfant"}, 
	{viewType : "date", conceptId : "naisenf", label : "Date de naissance de l'enfant"}, 
	{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)"},
	{viewType : "radio", conceptId : "obtage", label : "Comment avez-vous obtenu l'âge?",
		options : [{label : "carnet de vaccination", value : "1"},
		           {label : "certificat naissance", value : "2"},
		           {label : "information maman", value : "3"},
		           {label : "utilisation calendrier local", value : "4"}]},
	{viewType : "radio", conceptId : "sexenf", label : "Sexe de l'enfant",
		options : [{label : "male", value : "1"},
		           {label : "female", value : "2"},
		           {label : "NA ou non sp\xE9cifi\xE9", value : "9"}]},
   	{viewType : "text", conceptId : "mernom", label : "Nom de famille de la m\xE8re"}, 
   	{viewType : "text", conceptId : "merpren", label : "Pr\xE9nom de la m\xE8re"}, 
   	{viewType : "text", conceptId : "pernom", label : "Nom de famille du p\xE8re"}, 
   	{viewType : "text", conceptId : "perpren", label : "Pr\xE9nom du p\xE8re"}, 
   	{viewType : "number", conceptId : "tel", label : "Num\xE9ro de t\xE9l\xE9phone"}, 
   	{viewType : "radio", conceptId : "accomp", label : "Accompagnant de l'enfant",
   		options : [{label : "m\xE8re", value : "1"},
   		           {label : "p\xE8re", value : "2"},
   		           {label : "grand m\xE8re", value : "3"},
   		           {label : "autre", value : "4"}]},
    {viewType : "text", conceptId : "accompprecise", label : "Pr\xE9ciser:",
	            		showIf : {conceptIds : ["accomp"], condition: "accomp == 4"}}
];

childPage2Views = [
            	{viewType : "radio", conceptId : "laitcont", label : "L'enfant continue-t-il d'être allaité?",
            		options : [{label : "oui", value : "1"},
            		           {label : "non", value : "2"},
            		           {label : "ne sait pas ou non spécifié", value : "9"}]},

            	{viewType : "radio", conceptId : "vaccinat", label : "L'enfant a-t-il été vacciné depuis notre dernière visite?",
            	    options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non spécifié", value : "9"}]},

 	            vaccinesCheckbox = {
    	            		viewType : "checkboxgroup",
    	            		label : "Quel vaccin a-t-il reçu?",
    	            		conceptId : "vaccinesCheckbox",
    	            		showIf : {conceptIds : ["vaccinat"], condition : "vaccinat == '1'"},
    	            		children : [{label : "vaccination polio", conceptId : "vacpolio"},
    	            		           {label : "vaccination rougeole", conceptId : "vacrouge"},
    	            		           {label : "vaccination pentavalent", conceptId : "vacpenta"},
    	            		           {label : "autre vaccination", conceptId : "vacautre"}]    	            		        		   
            	            },            	            
               	
            	{viewType : "radio", conceptId : "ppdreac", label : "Avez-vous remarqué des réactions particulières après la prise du supplément nutritionnel?",
            	    showIf : {conceptIds : ["vacautre"], condition : "vacautre == '4'"},
            	      options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non spécifié", value : "9"}]},
               	
            	            
	            reactionsCheckbox = {
	            		viewType : "checkboxgroup",
	            		label : "Quel vaccin a-t-il reçu?",
	            		conceptId : "reactionsCheckbox",
	            		showIf : {conceptIds : ["ppdreac"], condition : "ppdreac == 1"},
	            		children : [{label : "Diarrhée", conceptId : "ppddiarr"},
	            		           {label : "Vomissement", conceptId : "ppdvomis"},
	            		           {label : "Rash cutané", conceptId : "ppdrash"},
	            		           {label : "Autre", conceptId : "ppdautre"}]},            	            
               	{viewType : "text", conceptId : "ppdautreprecise", label : "Préciser:",
            		showIf : {conceptIds : ["ppdreac"], condition : "ppdreac == 1"}}, 
               	{viewType : "number", conceptId : "pmmes", label : "Mesure du perimètre brachial (MUAC) (mm)"},
            	{viewType : "radio", conceptId : "oedem", label : "Oedèmes bilateraux",
            	    options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non spécifié", value : "9"}]},
               	
               	{viewType : "number", conceptId : "poids", label : "Poids de l'enfant (kg)"},
               	{viewType : "number", conceptId : "taille", label : "Taille de l'enfant (cm)"},
               ];

childPage3Views = [
               	{viewType : "radio", conceptId : "malad", label : "L'enfant a-t-il été malade depuis la dernière visite?",
               		options : [{label : "oui", value : "1"},
               		           {label : "non", value : "2"},
               		           {label : "ne sait pas ou non spécifié", value : "9"}]},

   	            symptomesCheckbox = {
       	            		viewType : "checkboxgroup",
       	            		label : "Symptômes",
       	            		conceptId : "symptomesCheckbox",
       	            		showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
       	            		children : [{label : "Fièvre", conceptId : "fievre"},
        	            		           {label : "Toux", conceptId : "toux"},
           	            		           {label : "Diarrhée", conceptId : "diarhe"},
        	            		           {label : "Convulsion", conceptId : "convuls"},
        	            		           {label : "Perte de poids", conceptId : "poidpert"},
           	            		           {label : "Douleur adbominale", conceptId : "abdom"},
        	            		           {label : "Vomissement", conceptId : "vomis"},
        	            		           {label : "Difficulté à respirer", conceptId : "respir"},
           	            		           {label : "Problème pour uriner", conceptId : "urine"},
        	            		           {label : "Maux de tête", conceptId : "cephal"},
        	            		           {label : "Constipation", conceptId : "constip"},
        	            		           {label : "Problème aux oreilles", conceptId : "oreill"},
        	            		           {label : "Problème aux yeux", conceptId : "yeux"},
        	            		           {label : "Perte appetit", conceptId : "appet"},
        	            		           {label : "Brûlure", conceptId : "brulur"},
        	            		           {label : "Saignement", conceptId : "sang"},
        	            		           {label : "Traumatisme", conceptId : "trauma"},
        	            		           {label : "Maux de gorge", conceptId : "gorge"},
        	            		           {label : "Non Specifié", conceptId : "nonspec"},
        	            		           {label : "Autre No1", conceptId : "autre1"},
        	            		           {label : "Autre No2", conceptId : "autre2"},
           	            		    ]    	            		        		   
               	            },            	     
              	{viewType : "text", conceptId : "autre1precise", label : "Autre No 1 Préciser:", showIf : {conceptIds : ["autre1"], condition : "autre1 == 'true'"}},           	  
              	{viewType : "text", conceptId : "autre2precise", label : "Autre No 2 Préciser:", showIf : {conceptIds : ["autre2"], condition : "autre2 == 'true'"}},
               	            
               	{viewType : "radio", conceptId : "eptemps", label : "Combien de temps a duré l'épisode de maladie",
	            	showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "1-2jrs", value : "1"},
               	            {label : "3-5jrs", value : "2"},
               	            {label : "ne sait pas ou non spécifié", value : "3"}]},
                  	
               	{viewType : "radio", conceptId : "epsoin", label : "Quelque chose a-t-il été fait à l'apparition de la maladie par vous ou qu'elqu'un de la famille?",
           	        showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
                  	            {label : "non", value : "2"},
                  	            {label : "ne sait pas ou non spécifié", value : "9"}]},
               	            
                reasonCheckbox = {
   	            		viewType : "checkboxgroup",
   	            		label : "Quelles sont les raisons de n'avoir rien entrepris",
   	            		conceptId : "reasonCheckbox",
   	            		showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1' && epsoin == '2'"},
   	            		children : [{label : "Raison financière", conceptId : "nofin"},
    	            		           {label : "Manque de transport", conceptId : "notransp"},
    	            		           {label : "Maladie trop grave", conceptId : "notgve"},
       	            		           {label : "Manque de temps", conceptId : "notime"},
    	            		           {label : "CDS trop loin", conceptId : "nocdsl"},
    	            		           {label : "Problème de sécurité", conceptId : "nosecur"},
       	            		           {label : "Maladie pas trop grave", conceptId : "nomgve"},
       	            		           {label : "Autre raison", conceptId : "noautre"}
       	            		           ]    	            		        		   
           	            },            	            
              	{viewType : "text", conceptId : "noautreprecise", label : "Préciser",
                  	            	showIf : {conceptIds : ["malad", "epsoin", "noautre"],
                  	            				condition: "malad == '1' && epsoin == '2' && noautre == 'true'"}},

                whatdoneCheckbox = {
   	            		viewType : "checkboxgroup",
   	            		label : "Si oui, qu'est-ce qui a été fait?",
   	            		conceptId : "whatdoneCheckbox",
   	            		showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1' && epsoin == '2'"},
   	            		children : [{label : "Consultation au CDS", conceptId : "reccds"},
    	            		           {label : "Est allé à l'hôpital", conceptId : "rechop"},
    	            		           {label : "Consulter un médecin privé", conceptId : "recmed"},
       	            		           {label : "Consulter un agent communautaire", conceptId : "recagcom"},
       	            		           
    	            		           {label : "Consulté un parent médical ou paramédical", conceptId : "recparmd"},
    	            		           {label : "Utiliser médicament existant à la maison", conceptId : "recmedma"},
    	            		           {label : "A acheté des médicaments en pharmacie /au marché", conceptId : "recachmt"},
    	            		           {label : "A consulté un guérisseur", conceptId : "recgueri"},
    	            		           {label : "A consulté un marabout", conceptId : "recmarab"},
    	            		           {label : "Achat de médicaments traditionnels", conceptId : "recatrad"},
    	            		           {label : "Consulté Dr Choco", conceptId : "rechoco"},
       	            		           {label : "Autre", conceptId : "recautre"},
       	            		           ]    	            		        		   
           	            },            	            
              	{viewType : "text", conceptId : "recautreprecise", label : "Préciser",
          	            	showIf : {conceptIds : ["malad", "epsoin", "recautre"],
  	            				condition: "malad == '1' && epsoin == '2' && recautre == 'true'"}},
               ];

childPage4Views = [
               	{viewType : "radio", conceptId : "epevol", label : "Comment a évolué l'enfant après cette demarche?",
	            	showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1'"},
               		options : [{label : "il a guéri", value : "1"},
               		           {label : "traitement en cours", value : "2"},
               		           {label : "il s'est amélioré", value : "3"},
               		           {label : "son état s'est aggravé", value : "4"},
               		           {label : "aucun changement", value : "5"}]},

               	{viewType : "radio", conceptId : "dmiss", label : "L'enfant a-t-il dû être admis à l'hôpital de Massakory?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non spécifié", value : "9"}]},

               	{viewType : "radio", conceptId : "eprest", label : "L'enfant est-il toujours malade aujourd'hui?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non spécifié", value : "9"}]},

               	{viewType : "radio", conceptId : "enqrefer", label : "L'enquêteur a-t-il référé l'enfant?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non spécifié", value : "9"}]},

               	{viewType : "radio", conceptId : "decision", label : "Si oui, à quel centre l'enfant a-t-il été référé?",
                    showIf : {conceptIds : ["malad", "enqrefer"], condition : "malad == '1' && enqrefer == '1'"},
               	    options : [{label : "Centre de santé", value : "1"},
               	            {label : "Agent communautaire", value : "2"},
               	            {label : "Hôpital", value : "3"}]},
              	{viewType : "number", conceptId : "enfidrep", label : "Numero d'identification de l'enfant, répétition"},
              ];


introPage = {
	header : {
		title : "MSF Malnutrition",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : []
	}
};

/*
 * This represents a page. It uses the array we defined above to describe which views
 * should be on the page. This also contains some display data like the title, themes, etc.
 */

childPage1 = {
	header : {
		title : "Page 1: INFORMATION SUIVI ENFANT",
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
			title : "Page 2: INFORMATION ALAITEMENT, VACCINATION, REACTION ASPE",
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
			title : "Page 3: MORBIDITE",
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
			title : "Page 4: Survey",
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

/*
 * formData is the global variable that the initializer uses to actually fill the form.
 * It can define global variables and defaults for the whole app. Right now it just has two pages.
 * 
 */

formData = {
	global : {
	},
	
	pages : [childPage1,
	         childPage2,
	         childPage3,
	         childPage4,
	         SubmitPage]
};

exampleTextField = {
	viewType : "text",
	conceptId : "fullName",
	label : "What is your full name?"
};

exampleNumberField = {
		viewType : "number",
		conceptId : "numberOfBoats",
		label : "How many boats do you own?"
};

exampleRadio = {
		viewType : "radio",
		conceptId : "favoriteColor",
		label : "Which is your favorite color?",
		options : [{label : "Green", value : "greenvalue"},
		           {label : "Blue", value : "bluevalue"},
		           {label : "Purple", value : "purplevalue"}]
};

exampleCheckbox1 = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", conceptId : "soccervalue"},
		           {label : "Football", conceptId : "footballvalue"},
		           {label : "Calvinball", conceptId : "calvinballvalue"}]
};

exampleCheckbox2 = {
		viewType : "checkboxgroup",
		label : "What are you allergic to?",
		children : [{label : "Sulfa", conceptId : "sulfaallergy"},
		           {label : "Wheat", conceptId : "wheatallergy"},
		           {label : "Nickel", conceptId : "nickelallergy"}]
};
