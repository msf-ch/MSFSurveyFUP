/**
 * 
 */
package org.msf.survey.monthly.fup.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * @author Nicholas Wilkie
 *
 */
public class MSFPlugin extends CordovaPlugin {
	public static final String SUBMIT_ACTION = "submit";
	public static final String PAGE_FORWARD_ACTION = "forward";
	public static final String PAGE_BACKWARD_ACTION = "forward";
	
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
}
