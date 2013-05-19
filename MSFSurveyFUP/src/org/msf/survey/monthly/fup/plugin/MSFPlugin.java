/**
 * 
 */
package org.msf.survey.monthly.fup.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
	}
}
