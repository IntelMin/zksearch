interface Delta {
  content: string;
}

interface Choice {
  delta: Delta;
  finish_reason: string;
}

interface DataEntry {
  hotkey: string;
  coldkey: string;
  incentive: number;
  uid: string;
  choices: Choice[];
}

interface AxonDataEntry {
  axon_hotkey: string;
  axon_coldkey: string;
  axon_uid: string;
  prompt: string;
  revised_prompt: string;
  model: string;
  style: string;
  size: string;
  quality: string;
  image_url: string;
}

export type { DataEntry, AxonDataEntry };
