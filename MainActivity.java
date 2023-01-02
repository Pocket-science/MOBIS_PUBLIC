package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(GoogleAuth.class);
  }
}
