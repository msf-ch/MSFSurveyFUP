/**
 * 
 */
package org.msf.survey.monthly.fup.plugin;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileFilter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.msf.survey.monthly.fup.Constants;
import org.msf.survey.monthly.fup.FinalActivity;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;

/**
 * @author Nicholas Wilkie
 *
 */
public class MSFPlugin extends CordovaPlugin {
	public static final String SUBMIT_ACTION = "submit";
	public static final String GET_ENCOUNTER_ACTION = "getEncounter";
	public static final String PAGE_FORWARD_ACTION = "forward";
	public static final String PAGE_BACKWARD_ACTION = "backward";
	public static final String GET_ENCOUNTER_FILES = "getEncounterFiles";
	
	/* (non-Javadoc)
	 * @see org.apache.cordova.api.CordovaPlugin#execute(java.lang.String, org.json.JSONArray, org.apache.cordova.api.CallbackContext)
	 */
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equalsIgnoreCase(SUBMIT_ACTION)) {
			submit(args, callbackContext);
		} else if (action.equalsIgnoreCase(GET_ENCOUNTER_ACTION)) {
			getEncounter(args, callbackContext);
		} else if (action.equalsIgnoreCase(GET_ENCOUNTER_FILES)) {
			getEncounterFiles(args, callbackContext);
		}
		
		return super.execute(action, args, callbackContext);
	}
	
	
	public void getEncounterFiles(JSONArray args, CallbackContext callbackContext) {
		File saveDirectory = new File(Environment.getExternalStorageDirectory(), Constants.SAVE_DIR_NAME);
		File[] files = saveDirectory.listFiles();
		
		JSONArray result = new JSONArray();
		JSONObject o;
		try {
			for (File f : files) {
				o = readJSONObjectFromFile(f);
				o.remove("obs");
				result.put(
						new JSONObject().
						accumulate("encounter", o).
						accumulate("file", f.getName()));
			}
			
			callbackContext.success(result);
			return;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/*
	 * cordova.exec(callback(success){}, callback(fail){}, "MSF", "submit", [_obs])
	 * 
	 * 
	 */
	public void submit(JSONArray args, CallbackContext callbackContext) throws JSONException {
		JSONObject obs = args.getJSONObject(0);

		try {
			File saveDirectory = new File(Environment.getExternalStorageDirectory(), Constants.SAVE_DIR_NAME);
			saveDirectory.mkdirs();
			File outputFile = new File(saveDirectory, "file-" + new Date().getTime());
			Log.d("MSFPlugin", outputFile.toString());
			
			outputFile.delete();
			outputFile.createNewFile();

			writeJSONObjectToFile(outputFile, obs);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		callbackContext.success();
	    Intent intent = new Intent(cordova.getActivity(), FinalActivity.class);
	    intent.putExtra("ABCD", "TETA");
	    cordova.getActivity().startActivity(intent);		
		cordova.getActivity().finish();
	}
	
	public void getEncounter(JSONArray args, CallbackContext callbackContext) throws JSONException {
		final String fileName = args.getString(0);
		File saveDirectory = new File(Environment.getExternalStorageDirectory(), Constants.SAVE_DIR_NAME);
		
		File[] files = saveDirectory.listFiles(new FileFilter() {
			@Override
			public boolean accept(File pathname) {
				return pathname.getName().equals(fileName);
			}
		});
		
		if (files.length == 0) {
			callbackContext.error("No such file");
			return;
		}
		
	    try {
			JSONObject obsObject = readJSONObjectFromFile(files[0]);
			callbackContext.success(obsObject);
		} catch (Exception e) {
			e.printStackTrace();
			callbackContext.error("Error loading file");
			return;
		}
	}
	
	public static String readFileToString(File file) throws IOException {
		BufferedReader reader = new BufferedReader( new FileReader (file));
		String         line = null;
		StringBuilder  stringBuilder = new StringBuilder((int)file.length() / 3);
		String         ls = System.getProperty("line.separator");

		while( ( line = reader.readLine() ) != null ) {
		    stringBuilder.append( line );
		    stringBuilder.append( ls );
		}
		reader.close();

		String result = stringBuilder.toString();
		return result;
	}
	
	public static void writeStringToFile(File file, String stringToWrite) throws IOException {
		BufferedWriter writer = new BufferedWriter(new FileWriter(file));
		writer.write(stringToWrite);
		
		writer.close();
	}
	
	public static JSONObject readJSONObjectFromFile(File jsonFile) throws IOException, JSONException {
		String jsonString = readFileToString(jsonFile);
		JSONObject jsonObject = new JSONObject(jsonString);
		
		return jsonObject;
	}
	
	public static JSONArray readJSONArrayFromFile(File jsonFile) throws IOException, JSONException {
		String jsonString = readFileToString(jsonFile);
		JSONArray jsonArray = new JSONArray(jsonString);
		
		return jsonArray;
	}
	
	public static void writeJSONObjectToFile(File file, JSONObject jsonObject) throws IOException, JSONException {
		String jsonString = jsonObject.toString();
		writeStringToFile(file, jsonString);
	}
}
