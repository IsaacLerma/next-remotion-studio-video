"use client";

import { Player, PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Tips } from "../components/Tips/Tips";
import { Spacing } from "../components/Spacing";
import { StudioState } from "../types/interfaces";
import { getDurationInFrames } from "../types/utils";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: "100%",
};

const TENANT_ID = "34";
const VIDEO_ID = "536";

const Home: NextPage = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDurationInFrames, setTotalDurationInFrames] =
    useState(DURATION_IN_FRAMES);

  const fetchData = async (tenantId: string, videoId: string) => {
    try {
      const response = await fetch(
        `https://api.dev.acolytehealth.com/webhooks/tenant/${tenantId}/videos/${videoId}/`,
      );
      const data = await response.json();
      console.log("API Data fetched:", data);

      const props = {
        ...defaultMyCompProps,
        ...data,
        studio: {
          ...defaultMyCompProps.studio,
          ...data.studio,
          result_path: data.result_path ?? "",
          brandSet: data.brandSet ?? [],
        },
        scenes: data.latest_version?.scenes ?? [],
        selectedSceneIndex: data.selectedSceneIndex ?? 0,
        selectedScenes: data.selectedScenes ?? [],
        id: data.id ?? "",
        chapters: data.chapters ?? [],
        selectedChapterId: data.selectedChapterId ?? null,
      };
      setTotalDurationInFrames(
        props.scenes.reduce(
          (total: number, scene: any, index: number) =>
            total + getDurationInFrames(scene, index, null),
          0,
        ) +
          props.scenes.length * 30,
      );
      setApiData(props);
      console.log("totalDurationInFrames", totalDurationInFrames);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Component mounted - fetching data...");
    fetchData(TENANT_ID, VIDEO_ID);
  }, []);

  useEffect(() => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playerRef]);

  const changePlayerStatus = (status: boolean, type?: string) => {
    console.log("🎬 changePlayerStatus called:", status);
    if (type === "faqs" && status && playerRef.current?.isPlaying()) {
      playerRef.current?.pause();
      return;
    } else if (type === "faqs" && !status && !playerRef.current?.isPlaying()) {
      playerRef.current?.play();
      return;
    } else if (type === "faqs" && status && !playerRef.current?.isPlaying()) {
      playerRef.current?.pause();
      return;
    }
    if (status) {
      if (!playerRef.current?.isPlaying()) {
        playerRef.current?.play();
      }
    } else {
      playerRef.current?.pause();
    }
  };

  if (isLoading) {
    return (
      <div style={container}>
        <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
          Loading video data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={() => (
              <Main
                changePlayerStatus={changePlayerStatus}
                isPlaying={isPlaying}
                playerRef={playerRef}
                inputProps={apiData}
              />
            )}
            inputProps={apiData}
            durationInFrames={totalDurationInFrames}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            showVolumeControls
            overflowVisible
            playbackRate={1}
            spaceKeyToPlayOrPause
            clickToPlay={false}
          />
        </div>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Tips></Tips>
      </div>
    </div>
  );
};

export default Home;
