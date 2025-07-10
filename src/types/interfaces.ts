export interface StudioState {
  [x: string]: any;
  id?: number;
  version_id?: number;
  studio: StudioInterface;
  scenes: SceneInterface[];
  result_path: string | null;
  selectedSceneIndex: number;
  selectedScenes: number[];
  brandSet: BrandSet | null;
  chapters: Chapter[];
  selectedChapterId: number | null;
  hasDeletedChapter?: boolean;
}

export interface StudioInterface {
  title: string;
  name?: string;
  version?: string | null;
  voice_id?: string | null;
  voice_language?: string | null;
  voice_provider?: string | null;
}

export interface SceneInterface {
  [x: string]: any;
  index: number;
  background_color?: string;
  asset_background?: ResultAssets | null;
  avatars: AvatarInterface[];
  elements: ElementInterface[];
  hotspots: ElementInterface[];
  background_music: BackgroundMusicInterface | null;
  rich_script: string;
  script: string;
  audio_url?: string;
  has_faqs?: boolean;
  id?: number;
  metadata: MetadataInterface;
}

export interface AvatarInterface {
  id?: string;
  name: string;
  avatar_type?: "talk" | "clip";
  avatar_id?: string;
  presenter_id?: string;
  driver_id?: string;
  voice_id?: string;
  result_path: string;
  background_color?: string;
  thumbnail_url: string;
  metadata: MetadataInterface;
}

export interface ElementInterface {
  name: string;
  id: string;
  element_type: string;
  asset?: ResultAssets | null;
  asset_path?: string | null;
  metadata: MetadataInterface;
  action?: ActionInterface;
}

export interface BackgroundMusicInterface {
  id?: string;
  name: string;
  metadata: MetadataInterface;
  asset_path: string | null;
}

export interface MetadataInterface {
  id: string;
  fontSize?: number;
  position?: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
    innerRadius?: number;
    outerRadius?: number;
    radius?: number;
  };
  zIndex?: number;
  fontWeight?: string;
  text?: string;
  title?: string;
  asset?: ResultAssets;
  styles?: React.CSSProperties;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface ActionInterface {
  action?: string;
  action_type?: string;
  url?: string;
  email?: string;
  download_path?: string;
  asset_id?: string;
}

export interface ResultAssets {
  id: number | string;
  name: string;
  asset_type: string;
  mime_type: string;
  thumbnail_path: string;
  result_path: string;
  created_at: string;
  updated_at: string;
  miliseconds: null | number;
  time: null | string;
  created_by: number;
  signed_url: string;
}

export interface MetadataInterface {
  [x: string]: any;
  id: string;
  fontSize?: number;
  position?: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
    innerRadius?: number;
    outerRadius?: number;
    radius?: number;
  };
  zIndex?: number;
  fontWeight?: string;
  text?: string;
  title?: string;
  asset?: ResultAssets;
  styles?: React.CSSProperties;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface Mp3VoiceAudioInterface {
  scene_index: number;
  script: string;
  audio_url: string;
  audio_time: number;
}

export interface BrandSet {
  id: number;
  name: string;
  logo_path: string;
  title: string;
  header: string;
  subheader: string;
  body: string;
  colors: string[];
  default: boolean;
  created_at: string;
  created_by: number;
}

export type FontKey = keyof Pick<
  BrandSet,
  "body" | "header" | "subheader" | "title"
>;

export interface BrandSetState
  extends Pick<
    BrandSet,
    "body" | "colors" | "default" | "header" | "name" | "subheader" | "title"
  > {
  logo: File | null;
}

export interface GetBrandSetsByUserBody {
  page?: number;
  search?: string;
  page_size?: number;
}

export interface GetBrandSetsByUserResponse {
  count: number;
  results: BrandSet[];
}

export interface Chapter {
  id: number;
  title: string;
  videos_version: number;
  scene_ids: number[];
  order?: number;
  videos_scene_chapter_id?: number;
  isNew?: boolean;
}

export interface Faq {
  id?: number;
  question: string;
  answer: string;
  index: number;
  scene: string;
  is_active: boolean;
}
