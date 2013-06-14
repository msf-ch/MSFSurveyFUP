package org.msf.survey.monthly.fup;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CSVDataExport {
	
	public static List<String> getFormConceptIds(InputStream is) throws IOException, JSONException{
		String jsonString = FileUtilities.readStringFromInputStream(is);
		JSONObject formJSON = new JSONObject(jsonString);
		
		List<String> concepts = new ArrayList<String>();
		
		//pages in form
		JSONArray pages = formJSON.optJSONArray("pages");
		if (pages != null) {
			for(int i = 0; i < pages.length(); i++) {
				JSONObject page = pages.getJSONObject(i);
				JSONObject content = page.getJSONObject("content");
				JSONArray views = content.optJSONArray("views");
				if (views != null) {
					for(int j = 0; j < views.length(); j++) {
						readViewsWithRecursion(views.getJSONObject(j), concepts);
					}
				}
			}
		} else {
			throw new JSONException("Not a valid form!");
		}
		
		return concepts;
	}
	
	private static void readViewsWithRecursion(JSONObject object, List<String> concepts) throws JSONException {
		if(object == null) {
			return;
		}
		
		String conceptId = object.optString("conceptId");
		if (conceptId != null) {
			concepts.add(conceptId);
		}
		
		//add child views with recursion
		JSONArray children = object.optJSONArray("children");
		if (children != null) {
			for (int i = 0; i < children.length(); i++) {
				readViewsWithRecursion(children.optJSONObject(i), concepts);
			}
		}
	}
	
	private static List<String> getGetObservationValues(InputStream encounterInputStream, List<String> concepts) throws IOException, JSONException {
		String jsonString = FileUtilities.readStringFromInputStream(encounterInputStream);
		JSONObject encounter = new JSONObject(jsonString);
		
		//JSONArray obs = encounter.ge
		
		return null;
	}
}
