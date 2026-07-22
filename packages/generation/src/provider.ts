// Interface d'adaptateur fournisseur — kie.ai est le premier, mais l'interface reste
// swap-safe (fal/replicate/direct plus tard) : le reste du studio ne connaît QUE ceci.

export type AspectRatio = "1:1" | "3:4" | "9:16" | "16:9";

export interface ImageGenRequest {
  /** Modèle kie.ai, ex "nano-banana-pro" (scène) ou "google/nano-banana-edit" (compositing fidèle). */
  model: string;
  prompt: string;
  /** Références (character sheet + scène) — indispensables au compositing fidèle. */
  imageUrls?: string[];
  aspectRatio?: AspectRatio;
  outputFormat?: "png" | "jpeg";
}

export interface VideoGenRequest {
  model: string; // ex "veo3_fast" | "veo3"
  prompt: string;
  imageUrls?: string[];
  aspectRatio?: "9:16" | "16:9";
}

export interface GenResult {
  ok: boolean;
  urls: string[]; // URLs des assets produits
  costCredits: number; // crédits débités (estimation via table de prix)
  model: string;
  taskId?: string;
  error?: string;
  raw?: unknown;
}

export interface GenProvider {
  readonly name: string;
  /** Solde de crédits restants (garde-fou budget). */
  credits(): Promise<number>;
  /** Upload d'un fichier local → URL exploitable comme référence. */
  uploadFile(path: string): Promise<string>;
  generateImage(req: ImageGenRequest): Promise<GenResult>;
  generateVideo(req: VideoGenRequest): Promise<GenResult>;
}
