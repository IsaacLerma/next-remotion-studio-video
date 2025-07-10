import Image from "next/image";
import { useEffect, useState } from "react";
import { ElementInterface } from "../../../../types/interfaces";

interface PreviewHotspotsProps {
  hotspot: ElementInterface;
  changePlayerStatus: (status: boolean) => void;
  isPlaying: boolean;
}

const PreviewHotspots = ({
  hotspot,
  changePlayerStatus,
  isPlaying,
}: PreviewHotspotsProps) => {
  const [showHotspot, setShowHotspot] = useState(false);

  const onClickHotspot = () => {
    setShowHotspot(!showHotspot);
    changePlayerStatus(true);
  };

  useEffect(() => {
    if (isPlaying && showHotspot) {
      setShowHotspot(false);
    }
  }, [isPlaying]);

  return (
    <>
      <div
        aria-label="preview-hotspot"
        style={{
          position: "absolute",
          top: hotspot.metadata.position?.y || 50,
          left: hotspot.metadata.position?.x || 50,
          height: hotspot.metadata.position?.height || 33,
          width: hotspot.metadata.position?.width || 100,
          cursor: "pointer",
          zIndex: 7777777777,
        }}
        onClick={onClickHotspot}
      ></div>
      {showHotspot &&
        hotspot.action &&
        hotspot.action.action_type === "expand_image" && (
          <Image
            src={hotspot.asset?.result_path || ""}
            alt={hotspot.name}
            width={hotspot.metadata.position_expanded?.width || 100}
            height={hotspot.metadata.position_expanded?.height || 100}
            style={{
              position: "absolute",
              top: hotspot.metadata.position_expanded?.y || 50,
              left: hotspot.metadata.position_expanded?.x || 50,
              height: hotspot.metadata.position_expanded?.height || 100,
              width: hotspot.metadata.position_expanded?.width || 100,
            }}
          />
        )}
      {showHotspot &&
        hotspot.action &&
        hotspot.action.action_type === "expand_text" && (
          <div
            style={{
              position: "absolute",
              top: hotspot.metadata.position_expanded?.y || 50,
              left: hotspot.metadata.position_expanded?.x || 50,
              height: hotspot.metadata.position_expanded?.height || 123,
              width: hotspot.metadata.position_expanded?.width || 33,
              backgroundColor: "#ECF6F7",
              fontSize: 12,
              padding: 5,
            }}
          >
            {hotspot.metadata.expand_text}
          </div>
        )}
    </>
  );
};

export default PreviewHotspots;
