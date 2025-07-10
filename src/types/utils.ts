import {
  MetadataInterface,
  Mp3VoiceAudioInterface,
  SceneInterface,
} from "./interfaces";

const FPS = 30;
const AVERAGE_SPEAKING_RATE = 150;

export const getFormattingStyles = (metadata: MetadataInterface) => {
  return {
    fontWeight: metadata.textFormatting?.includes("bold")
      ? "bold"
      : metadata.fontWeight || "normal",
    fontStyle: metadata.textFormatting?.includes("italic")
      ? "italic"
      : "normal",
    textDecoration: metadata.textFormatting?.includes("underline")
      ? "underline"
      : "none",
  };
};

export const getDurationInFrames = (
  scene: SceneInterface,
  index: number,
  mp3VoiceAudio?: Mp3VoiceAudioInterface[] | null,
) => {
  let scriptDuration = 0;

  if (
    mp3VoiceAudio &&
    mp3VoiceAudio.length &&
    mp3VoiceAudio[index]?.audio_time
  ) {
    scriptDuration = Math.round(mp3VoiceAudio[index]?.audio_time * FPS);
  } else {
    scriptDuration = scene.script
      ? calculateAudioDurationInFrames(scene.script)
      : 60;
  }

  if (
    scene?.asset_background?.asset_type === "videos" &&
    scene.asset_background.miliseconds
  ) {
    const videoDuration = Math.round(
      (scene.asset_background.miliseconds / 1000) * FPS,
    );
    return Math.max(scriptDuration, videoDuration);
  }

  return scriptDuration;
};

export const calculateAudioDurationInFrames = (script: string): number => {
  if (!script) return 0;
  const words = script.split(/\s+/).length;
  const durationInSeconds = (words / AVERAGE_SPEAKING_RATE) * 60;
  return Math.round(durationInSeconds * FPS) + 2 * FPS;
};
