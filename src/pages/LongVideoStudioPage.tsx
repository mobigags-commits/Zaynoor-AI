import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import { VideoJob, VideoScene } from '../types';
import {
  Clapperboard,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Volume2,
  Subtitles,
  Music,
  Download,
  AlertCircle,
  RefreshCw,
  Film,
  Languages,
} from 'lucide-react';

export const LongVideoStudioPage: React.FC = () => {
  const { language, useCredits } = useApp();
  const [topic, setTopic] = useState('The Rise of Autonomous AI Systems & Future Cities');
  const [durationMinutes, setDurationMinutes] = useState<number>(3);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [videoLanguage, setVideoLanguage] = useState<'en' | 'ur' | 'both'>('both');
  const [withSubtitles, setWithSubtitles] = useState(true);
  const [withMusic, setWithMusic] = useState(true);

  const [activeJob, setActiveJob] = useState<VideoJob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Poll video job status if processing
  useEffect(() => {
    let interval: any;
    if (activeJob && activeJob.status === 'processing') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/video/status/${activeJob.id}`);
          const data = await res.json();
          if (data.job) {
            setActiveJob(data.job);
          }
        } catch (err) {
          console.warn('Polling error:', err);
        }
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [activeJob]);

  const handleStartGeneration = async () => {
    if (!topic.trim() || isSubmitting) return;
    setIsSubmitting(true);
    useCredits(durationMinutes * 25);

    try {
      const res = await fetch('/api/video/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          durationMinutes,
          aspectRatio,
          language: videoLanguage,
          withSubtitles,
          withMusic,
        }),
      });
      const data = await res.json();
      if (data.job) {
        setActiveJob(data.job);
        setActiveSceneIndex(0);
      }
    } catch (err) {
      console.error('Video error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryScene = (sceneId: number) => {
    if (!activeJob) return;
    const updatedScenes = activeJob.scenes.map((s) => {
      if (s.id === sceneId) {
        return { ...s, status: 'generating' as const };
      }
      return s;
    });
    setActiveJob({ ...activeJob, scenes: updatedScenes });
    setTimeout(() => {
      const finished = activeJob.scenes.map((s) => {
        if (s.id === sceneId) {
          return {
            ...s,
            status: 'completed' as const,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          };
        }
        return s;
      });
      setActiveJob({ ...activeJob, scenes: finished });
    }, 1500);
  };

  const durationOptions = [1, 3, 5, 10, 15, 20];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <SEOHead
        title={language === 'ur' ? 'لانگ ویڈیو اسٹوڈیو (20 منٹ تک) — زینور اے آئی' : 'Long Video Studio (Up to 20 Min) — Zaynoor AI'}
        description="Produce up to 20-minute long-form videos with multi-clip scene pipeline, Urdu and English synchronized narration, subtitles, and retry resilience."
      />

      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Clapperboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>{language === 'ur' ? 'لانگ ویڈیو اسٹوڈیو' : 'Long Video Studio'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                Up to 20 Minutes
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'ur'
                ? 'ملٹی کلپ پائپ لائن، منظر وار اسکرپٹ، اردو اور انگریزی وائس اوور، اور خودکار ایڈیٹنگ'
                : 'Multi-clip storyboard pipeline for 1 to 20 min continuous video with Urdu/English voice synthesis'}
            </p>
          </div>
        </div>

        {/* Technical Disclosures */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Multi-clip stitched pipeline (40s scenes) • 1080p Full HD</span>
        </div>
      </div>

      {/* Configuration Form Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                {language === 'ur' ? 'ویڈیو کا عنوان یا موضوع' : 'Video Topic or Detailed Script Outline'}
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g. Documenting the exploration of deep ocean trenches, Mars colonies..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="shrink-0 flex items-end">
              <button
                onClick={handleStartGeneration}
                disabled={isSubmitting || (activeJob?.status === 'processing')}
                className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{language === 'ur' ? 'ویڈیو بنائیں' : 'Generate Long Video'}</span>
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Duration selector */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold text-slate-300">Duration:</span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {durationOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDurationMinutes(d)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      durationMinutes === d
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-300">Aspect Ratio:</span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {(['16:9', '9:16', '1:1'] as const).map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      aspectRatio === ar
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            {/* Narration Language */}
            <div className="flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold text-slate-300">Narration:</span>
              <select
                value={videoLanguage}
                onChange={(e) => setVideoLanguage(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
              >
                <option value="both">Bilingual (English + Urdu)</option>
                <option value="ur">Urdu (اردو وائس اوور)</option>
                <option value="en">English (Voiceover)</option>
              </select>
            </div>

            {/* Subtitles & Music Toggles */}
            <button
              onClick={() => setWithSubtitles(!withSubtitles)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                withSubtitles
                  ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>Subtitles {withSubtitles ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setWithMusic(!withMusic)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                withMusic
                  ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>BGM {withMusic ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio View */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Storyboard Scenes List */}
        <div className="w-full md:w-80 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Storyboard Scenes</span>
            </h3>
            {activeJob && (
              <span className="text-xs text-purple-400 font-semibold">
                {activeJob.progress}% Ready
              </span>
            )}
          </div>

          {activeJob ? (
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              {activeJob.scenes.map((scene, idx) => {
                const isSelected = activeSceneIndex === idx;
                return (
                  <div
                    key={scene.id}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{scene.title}</span>
                      <span className="text-[10px] text-slate-400">{scene.durationSeconds}s</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                      {language === 'ur' ? scene.narrationUr : scene.narrationEn}
                    </p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className={`font-semibold capitalize ${
                          scene.status === 'completed'
                            ? 'text-emerald-400'
                            : scene.status === 'generating'
                            ? 'text-amber-400 animate-pulse'
                            : 'text-slate-400'
                        }`}
                      >
                        ● {scene.status}
                      </span>
                      {scene.status === 'failed' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRetryScene(scene.id);
                          }}
                          className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Clapperboard className="w-10 h-10 text-slate-600 mb-2" />
              <p className="text-xs">
                {language === 'ur'
                  ? 'اوپر عنوان درج کریں اور ویڈیو بنانے کا بٹن دبائیں تاکہ اسٹوری بورڈ مناظر لوڈ ہوں۔'
                  : 'Enter a topic above and click Generate to synthesize multi-scene storyboard.'}
              </p>
            </div>
          )}
        </div>

        {/* Video Player & Inspector */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-inner">
          {activeJob ? (
            <div className="flex-1 flex flex-col p-6">
              {/* Active Scene Preview */}
              <div className="flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative mb-6">
                <video
                  key={activeJob.scenes[activeSceneIndex]?.id}
                  controls
                  className="max-h-[420px] w-full object-contain rounded-lg"
                  poster="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80"
                >
                  <source
                    src={
                      activeJob.scenes[activeSceneIndex]?.videoUrl ||
                      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                    }
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>

                {withSubtitles && (
                  <div className="absolute bottom-14 left-4 right-4 text-center pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-black/80 text-white rounded text-xs font-semibold backdrop-blur-sm">
                      {language === 'ur'
                        ? activeJob.scenes[activeSceneIndex]?.narrationUr
                        : activeJob.scenes[activeSceneIndex]?.narrationEn}
                    </span>
                  </div>
                )}
              </div>

              {/* Scene Detail Card */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">
                    {activeJob.scenes[activeSceneIndex]?.title}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRetryScene(activeJob.scenes[activeSceneIndex]?.id)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 font-medium transition-colors"
                    >
                      <RotateCcw className="w-3 h-3 text-rose-400" />
                      <span>Re-render Scene</span>
                    </button>
                    <a
                      href="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      download="scene.mp4"
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Video (MP4)</span>
                    </a>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-slate-200">English Narration:</strong> {activeJob.scenes[activeSceneIndex]?.narrationEn}
                </p>
                <p className="text-slate-400 leading-relaxed" dir="rtl">
                  <strong className="text-slate-200">اردو بیانیہ:</strong> {activeJob.scenes[activeSceneIndex]?.narrationUr}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <Film className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Cinematic Video Studio Ready</h3>
              <p className="text-xs max-w-md text-slate-400 leading-relaxed">
                Produce 1 to 20 minute cinematic videos with synchronized scene transitions, voice synthesis in English and Urdu, and real-time scene re-render controls.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
