import * as amplitude from "@amplitude/unified";

/**
 * Amplitude Browser Unified SDK (@amplitude/unified)
 * Bundles Browser SDK 2 + Session Replay + Experiment + Guides/Surveys.
 * Initialize once, as early as possible, with initAll().
 */

// Muchachito Bombo Infierno — Amplitude project API key.
const AMPLITUDE_API_KEY = "65abc33edd3901f7d9d9815cc693bb06";

// Set to "EU" if the Amplitude project lives in the EU data center.
// Must be set at the TOP LEVEL of initAll options (not inside analytics).
const SERVER_ZONE: "US" | "EU" = "US";

let initialized = false;

export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  amplitude.initAll(AMPLITUDE_API_KEY, {
    serverZone: SERVER_ZONE,
    analytics: {
      // Pull autocapture + sampling config from Amplitude remote config.
      fetchRemoteConfig: true,
      autocapture: {
        attribution: true,
        pageViews: true,
        sessions: false,
        formInteractions: false,
        fileDownloads: false,
        elementInteractions: false,
        webVitals: true,
        // Rage clicks + dead clicks => Frustration Analytics
        frustrationInteractions: true,
      },
    },
    // Record every session for the demo. Lower sampleRate before production.
    sessionReplay: {
      sampleRate: 1,
    },
  });
}

/** Thin wrapper so pages never import the SDK directly. */
export function track(
  eventName: string,
  eventProperties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  amplitude.track(eventName, eventProperties);
}
