// Couche LLM BRANCHABLE. Le cerveau fonctionne sans (bibliothèque d'angles déterministe) ;
// un LLM (kie.ai texte, Anthropic, …) l'enrichit/localise ensuite. Interface minimale.
export interface LLMClient {
  complete(system: string, user: string): Promise<string | null>;
}

/** Par défaut : pas de LLM → le pipeline utilise la voie déterministe (seed bank). */
export const NullLLM: LLMClient = {
  async complete() {
    return null;
  },
};
