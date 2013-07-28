package org.msf.survey.monthly.fup.plugin;

import java.io.IOException;

import org.apache.cordova.CordovaArgs;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONException;
import org.msf.survey.monthly.fup.MsfCamActivity;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class CameraPlugin extends CordovaPlugin {
	public static final String ACTION_TEST_CAM= "testCamera";
	
	@Override
	public boolean execute(String action, CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		try {
			if (action.equals(ACTION_TEST_CAM)) {
				this.testCamera(args, callbackContext);
				callbackContext.success();
			}
		} catch (IOException e) {
			e.printStackTrace();
			callbackContext.error(e.getMessage());
		}
		return super.execute(action, args, callbackContext);
	}

	public void testCamera(CordovaArgs args, CallbackContext callbackContext) throws IOException, JSONException {
		Log.d("MSFPlugin", "Camera started: " + args.toString());
		
		Context context=this.cordova.getActivity().getApplicationContext();
	    Intent intent=new Intent(context,MsfCamActivity.class);
	    cordova.startActivityForResult(this, intent,0);
	}
}
