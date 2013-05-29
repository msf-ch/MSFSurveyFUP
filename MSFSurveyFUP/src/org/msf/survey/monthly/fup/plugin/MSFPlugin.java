/**
 * 
 */
package org.msf.survey.monthly.fup.plugin;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Date;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.msf.survey.monthly.fup.Constants;
import org.msf.survey.monthly.fup.FinalActivity;
import org.msf.survey.monthly.fup.R;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;
import android.widget.EditText;
import android.widget.Toast;

/**
 * @author Nicholas Wilkie
 *
 */
public class MSFPlugin extends CordovaPlugin {
	public static final String SUBMIT_ACTION = "submit";
	public static final String PAGE_FORWARD_ACTION = "forward";
	public static final String PAGE_BACKWARD_ACTION = "backward";
	
	/* (non-Javadoc)
	 * @see org.apache.cordova.api.CordovaPlugin#execute(java.lang.String, org.json.JSONArray, org.apache.cordova.api.CallbackContext)
	 */
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equalsIgnoreCase(SUBMIT_ACTION)) {
			submit(args, callbackContext);
		} else if (action.equalsIgnoreCase(PAGE_FORWARD_ACTION)) {
			
		} else if (action.equalsIgnoreCase(PAGE_BACKWARD_ACTION)) {
			
		} else {
			
		}
		
		return super.execute(action, args, callbackContext);
	}
	
	/*
	 * cordova.exec(callback(success){}, callback(fail){}, "MSF", "submit", [_obs])
	 * 
	 * 
	 */
	public void submit(JSONArray args, CallbackContext callbackContext) throws JSONException {
		JSONArray obs = args.getJSONArray(0);
		for (int i = 0; i < obs.length(); i++) {
			
		}
		
		try {
			File outputDirectory = new File(Environment.getExternalStorageDirectory(), Constants.SAVE_DIR_NAME);
			outputDirectory.mkdirs();
			File outputFile = new File(outputDirectory, "file-" + new Date().getTime());
			Log.d("MSFPlugin", outputFile.toString());
			outputFile.createNewFile();
			FileOutputStream os = new FileOutputStream(outputFile);
			new OutputStreamWriter(os).write(obs.toString());
			os.close();
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
}
