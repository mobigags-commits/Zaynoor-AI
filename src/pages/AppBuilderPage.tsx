import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  Smartphone,
  Sparkles,
  Download,
  Copy,
  Check,
  Code,
  Layers,
  FileCode,
  FolderTree,
  Terminal,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const AppBuilderPage: React.FC = () => {
  const { language, useCredits } = useApp();
  const [appName, setAppName] = useState('ZaynoorFlow');
  const [packageName, setPackageName] = useState('ai.zaynoor.flow');
  const [description, setDescription] = useState('An intelligent productivity and task tracker with Material 3 and Jetpack Compose');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('app/src/main/java/MainActivity.kt');
  const [copied, setCopied] = useState(false);

  const [files, setFiles] = useState<Record<string, string>>({
    'app/src/main/java/MainActivity.kt': `package ai.zaynoor.flow

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color(0xFF0F172A)
                ) {
                    MainScreen()
                }
            }
        }
    }
}

@Composable
fun MainScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(
                        Brush.linearGradient(
                            listOf(Color(0xFFE11D48), Color(0xFF990011))
                        ),
                        shape = RoundedCornerShape(24.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text("Z", fontSize = 42.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = "ZaynoorFlow",
                fontSize = 28.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Jetpack Compose 1.7 • Material 3",
                fontSize = 14.sp,
                color = Color(0xFF94A3B8)
            )
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
            shape = RoundedCornerShape(20.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "App Architecture",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "• Modern Single-Activity Architecture\\n• StateFlow & Coroutines Ready\\n• Natively Styled with Crimson Theme\\n• Full RTL & Urdu Nastaliq Typography",
                    fontSize = 13.sp,
                    color = Color(0xFFCBD5E1),
                    lineHeight = 22.sp
                )
            }
        }

        Button(
            onClick = { /* Handle action */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE11D48)),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text("Launch Android App", fontSize = 16.sp, fontWeight = FontWeight.Bold)
        }
    }
}`,
    'app/build.gradle.kts': `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "ai.zaynoor.flow"
    compileSdk = 35

    defaultConfig {
        applicationId = "ai.zaynoor.flow"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.activity.compose)
}`,
    'app/src/main/AndroidManifest.xml': `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="ZaynoorFlow"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ZaynoorFlow">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    useCredits(40);
    try {
      const res = await fetch('/api/android-builder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, packageName, description }),
      });
      const data = await res.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCurrentFile = () => {
    navigator.clipboard.writeText(files[selectedFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    // Generate text bundle of all files
    const bundleText = Object.entries(files)
      .map(([fname, content]) => `// ===================== ${fname} =====================\n${content}\n\n`)
      .join('\n');
    const blob = new Blob([bundleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName}-android-compose-project.txt`;
    a.click();
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <SEOHead
        title={language === 'ur' ? 'اینڈرائیڈ ایپ بلڈر (جیٹ پیک کمپوز) — زینور اے آئی' : 'Android App Builder (Jetpack Compose) — Zaynoor AI'}
        description="Generate native Android Kotlin code with Jetpack Compose, Material 3, AndroidManifest, Gradle configuration, and clean architecture."
      />

      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>{language === 'ur' ? 'اینڈرائیڈ ایپ بلڈر' : 'Native Android Builder'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Kotlin & Compose
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'ur'
                ? 'اینڈرائیڈ اسٹوڈیو کے لیے مکمل پروجیکٹ اسٹرکچر، مٹیریل 3 اور کوٹلن کوڈ خودکار تیار کریں'
                : 'Production Jetpack Compose Kotlin project generation ready for Android Studio Ladybug & Iguana'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCurrentFile}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Active File'}</span>
          </button>
          <button
            onClick={handleDownloadZip}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Source Bundle</span>
          </button>
        </div>
      </div>

      {/* Inputs Configuration */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">App Name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Package Name</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Features & Requirements</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 shrink-0"
              >
                {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor & File Tree Workspace */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        {/* Project File Tree */}
        <div className="w-full md:w-64 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shrink-0">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
            <span>Android Project Files</span>
          </h3>

          <div className="space-y-1 text-xs">
            {Object.keys(files).map((fileName) => {
              const isSelected = selectedFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setSelectedFile(fileName)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{fileName.split('/').pop()}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2">
            <p className="font-semibold text-slate-300">Android Studio Setup:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open Android Studio</li>
              <li>New &gt; Import Project</li>
              <li>Paste files or extract bundle</li>
              <li>Click "Run on Device / Emulator"</li>
            </ol>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-inner">
          <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{selectedFile}</span>
            <span className="text-emerald-400 font-semibold">Kotlin 2.0 / Compose</span>
          </div>

          <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-slate-950 text-slate-200">
            <pre className="whitespace-pre">{files[selectedFile] || ''}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
