import { ElementInterface } from "../../../../types/interfaces";
import { getFormattingStyles } from "../../../../types/utils";

const PreviewButtons = ({
  button,
  changePlayerStatus,
}: {
  button: ElementInterface;
  changePlayerStatus: (status: boolean) => void;
}) => {
  const getFileNameFromUrl = (url: string) => {
    const urlObj = new URL(url);
    const fileName = urlObj.pathname.split("/").pop(); // Gets the last part of the path
    return fileName;
  };
  const clickActionButton = async () => {
    if (button.action?.url) {
      window.open(button.action.url, "_blank", "noopener,noreferrer");
    } else if (button.action?.email) {
      window.open(
        `mailto:${button.action.email}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else if (button.action?.download_path) {
      const fileName = getFileNameFromUrl(button.action.download_path);
      const response = await fetch(button.action.download_path);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName ? fileName : "file.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    }

    changePlayerStatus(true);
  };

  return (
    <button
      onClick={clickActionButton}
      style={{
        position: "absolute",
        top: button.metadata.position?.y || 50,
        left: button.metadata.position?.x || 50,
        fontSize: button.metadata.fontSize || 16,
        backgroundColor: button.metadata.fill,
        border: button.metadata.strokeWidth
          ? `${button.metadata.strokeWidth}px solid`
          : "none",
        borderColor: button.metadata.stroke,
        color: button.metadata.textColor || "white",
        height: button.metadata.position?.height || 33,
        width: button.metadata.position?.width || 100,
        borderRadius: "5px",
        cursor: "pointer",
        fontFamily: button.metadata.fontFamily || "Montserrat",
        ...getFormattingStyles(button.metadata),
      }}
    >
      {button.metadata?.text}
    </button>
  );
};

export default PreviewButtons;
