export interface SceneFaqsProps {
  currentScenId?: number;
  sceneIndex: number;
  isInRemotion?: boolean;
  changePlayerStatus?: (status: boolean, type?: string) => void;
}
