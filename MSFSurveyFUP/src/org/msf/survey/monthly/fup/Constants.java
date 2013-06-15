package org.msf.survey.monthly.fup;

import java.io.File;

import android.os.Environment;

public class Constants {
	public static File REPORT_STORAGE_DIR = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
	public static File ENCOUNTER_DIR = new File(Environment.getExternalStorageDirectory(), "msfmalnutrition");
	public static String FORMS_ASSET_DIR_NAME = "www/js/forms";
}
