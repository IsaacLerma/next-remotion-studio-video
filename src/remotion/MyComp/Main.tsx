import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import React, { useEffect, useRef, useState } from "react";
import PreviewSurveys from "./components/PreviewSurveys/PreviewSurveys";
import PreviewButtons from "./components/PreviewButtons/PreviewButtons";
import PreviewHotspots from "./components/PreviewHotspots/PreviewHotspots";
import { getDurationInFrames } from "../../types/utils";
import dynamic from "next/dynamic";
import { StudioState } from "../../types/interfaces";
import { ElementTypes } from "../../types/enums";

const SceneFaqs = dynamic(() => import("./components/SceneFaqs/SceneFaqs"), {
  ssr: false,
});

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

export const Main = ({
  changePlayerStatus,
  isPlaying,
  inputProps,
}: {
  changePlayerStatus: (status: boolean, type?: string) => void;
  isPlaying: boolean;
  playerRef: React.RefObject<any>;
  inputProps: StudioState;
}) => {
  const [isShowingSurvey, setIsShowingSurvey] = React.useState(true);
  const frame = useCurrentFrame();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const mp3VoiceAudio = null;

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const fps = inputProps.scenes[currentSceneIndex]?.fps || 30;
      const newTime = frame / fps;
      if (Math.abs(newTime - audioRef.current.currentTime) > 0.5) {
        audioRef.current.currentTime = newTime;
      }
    }
  }, [frame]);

  useEffect(() => {
    let totalFrames = 0;
    for (let i = 0; i < inputProps.scenes.length; i++) {
      const scene = inputProps.scenes[i];
      const durationInFrames = getDurationInFrames(scene, i, mp3VoiceAudio);
      if (frame < totalFrames + durationInFrames) {
        if (currentSceneIndex !== i) {
          setCurrentSceneIndex(i);
        }
        break;
      }
      totalFrames += durationInFrames;
    }
  }, [frame, inputProps.scenes, currentSceneIndex, mp3VoiceAudio]);

  return (
    <>
      <AbsoluteFill>
        <OffthreadVideo
          src={inputProps.result_path || ""}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </AbsoluteFill>

      <TransitionSeries style={{ zIndex: 999999999 }}>
        {inputProps.scenes.map((scene, index) => {
          const durationInFrames = getDurationInFrames(
            scene,
            index,
            mp3VoiceAudio,
          );
          const surveyItem = scene?.elements?.find(
            (element) => element.element_type === ElementTypes.survey,
          );
          const buttonsPerScene =
            scene?.elements?.filter(
              (element) => element.element_type === ElementTypes.button,
            ) || [];

          return (
            <React.Fragment key={`scene-${index}`}>
              <TransitionSeries.Sequence
                className="sequence"
                key={index}
                durationInFrames={durationInFrames + 30}
              >
                {surveyItem && isShowingSurvey && (
                  <AbsoluteFill
                    style={{
                      zIndex: 100,
                      pointerEvents: "auto",
                    }}
                  >
                    {typeof surveyItem.metadata.animationStart === "number" ? (
                      <Sequence
                        from={surveyItem.metadata.animationStart}
                        durationInFrames={
                          durationInFrames - surveyItem.metadata.animationStart
                        }
                      >
                        <PreviewSurveys
                          setIsShowingSurvey={setIsShowingSurvey}
                          surveyItem={surveyItem}
                          changePlayerStatus={changePlayerStatus}
                        />
                      </Sequence>
                    ) : (
                      <PreviewSurveys
                        setIsShowingSurvey={setIsShowingSurvey}
                        surveyItem={surveyItem}
                        changePlayerStatus={changePlayerStatus}
                      />
                    )}
                  </AbsoluteFill>
                )}

                {(buttonsPerScene.length > 0 ||
                  scene.hotspots?.length > 0 ||
                  scene.has_faqs) && (
                  <AbsoluteFill
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 888888888888,
                    }}
                  >
                    {buttonsPerScene.map((button, index) => (
                      <PreviewButtons
                        key={index}
                        button={button}
                        changePlayerStatus={changePlayerStatus}
                      />
                    ))}
                    {scene.hotspots?.map((hotspot, index) => (
                      <PreviewHotspots
                        key={index}
                        hotspot={hotspot}
                        changePlayerStatus={changePlayerStatus}
                        isPlaying={isPlaying}
                      />
                    ))}
                    {scene.has_faqs && (
                      <SceneFaqs
                        currentScenId={scene.id}
                        sceneIndex={index}
                        isInRemotion={true}
                        changePlayerStatus={changePlayerStatus}
                        faqs={inputProps.faqs}
                      />
                    )}
                  </AbsoluteFill>
                )}
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </>
    // <AbsoluteFill style={container}>
    //   <Sequence durationInFrames={transitionStart + transitionDuration}>
    //     <Rings outProgress={logoOut}></Rings>
    //     <AbsoluteFill style={logo}>
    //       <NextLogo outProgress={logoOut}></NextLogo>
    //     </AbsoluteFill>
    //   </Sequence>
    //   <Sequence from={transitionStart + transitionDuration / 2}>
    //     <TextFade>
    //       <h1 style={titleStyle}>{studio.title}</h1>
    //     </TextFade>
    //   </Sequence>
    // </AbsoluteFill>
  );
};
