import { describe, expect, it } from "vitest";
import { FALLBACK_MODELS, modelsAfterEmptyOpenCodeDiscovery } from "./provider-models";

describe("provider model fallbacks", () => {
  it("keeps the current free OpenCode catalog available when discovery fails", () => {
    expect(FALLBACK_MODELS.filter((model) => model.provider === "opencode").map((model) => model.id)).toEqual([
      "opencode/big-pickle",
      "opencode/ling-3.0-flash-fin-free",
      "opencode/longcat-2.5-preview-free",
      "opencode/mimo-v2.6-flash-free",
      "opencode/muse-spark-1.3-contributor-free",
      "opencode/nemotron-3-ultra-free",
      "opencode/nemotron-3.5-lightning-free",
      "opencode/space-bunny-free",
    ]);
  });

  it("does not erase OpenCode models when discovery returns an empty catalog", () => {
    expect(modelsAfterEmptyOpenCodeDiscovery([])).toEqual(
      FALLBACK_MODELS.filter((model) => model.provider === "opencode"),
    );
    const previous = [
      {
        provider: "opencode" as const,
        id: "opencode/previous-free-model",
        name: "Previously discovered free model",
        description: "Previously discovered free model.",
        defaultReasoningEffort: "medium" as const,
        supportedReasoningEfforts: ["medium" as const],
      },
    ];
    expect(modelsAfterEmptyOpenCodeDiscovery(previous)).toEqual(previous);
  });
});
