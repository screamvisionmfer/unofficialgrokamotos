import type * as React from "react";

type ModelViewerElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  ar?: boolean | string;
  autoplay?: boolean | string;
  "camera-controls"?: boolean | string;
  cameraControls?: boolean | string;
  "auto-rotate"?: boolean | string;
  "rotation-per-second"?: string;
  "disable-zoom"?: boolean | string;
  disableZoom?: boolean | string;
  "disable-pan"?: boolean | string;
  "interaction-prompt"?: string;
  interactionPrompt?: string;
  exposure?: string | number;
  "environment-image"?: string;
  "shadow-intensity"?: string | number;
  shadowIntensity?: string | number;
  "camera-orbit"?: string;
  cameraOrbit?: string;
  "camera-target"?: string;
  cameraTarget?: string;
  "field-of-view"?: string;
  fieldOfView?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

export {};
