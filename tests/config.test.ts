import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

interface Manifest {
  configSchema: {
    type: string;
    properties: Record<string, { type: string; default?: unknown }>;
    required?: string[];
  };
  uiHints?: Record<string, {
    label?: string;
    help?: string;
    sensitive?: boolean;
    advanced?: boolean;
    placeholder?: string;
  }>;
}

function readManifest(): Manifest {
  return JSON.parse(
    readFileSync(new URL('../openclaw.plugin.json', import.meta.url), 'utf8'),
  );
}

describe('config schema', () => {
  it('requires accessKey', () => {
    const manifest = readManifest();
    expect(manifest.configSchema.required).toContain('accessKey');
  });

  it('has accessKey as string type', () => {
    const manifest = readManifest();
    expect(manifest.configSchema.properties.accessKey.type).toBe('string');
  });

  it('has optional serverUrl with string type', () => {
    const manifest = readManifest();
    expect(manifest.configSchema.properties.serverUrl.type).toBe('string');
    expect(manifest.configSchema.required).not.toContain('serverUrl');
  });

  it('has optional timeoutMs with number type', () => {
    const manifest = readManifest();
    expect(manifest.configSchema.properties.timeoutMs.type).toBe('number');
    expect(manifest.configSchema.required).not.toContain('timeoutMs');
  });
});

describe('uiHints', () => {
  it('exists for all config fields', () => {
    const manifest = readManifest();
    const configKeys = Object.keys(manifest.configSchema.properties);
    const hintKeys = Object.keys(manifest.uiHints || {});

    for (const key of configKeys) {
      expect(hintKeys).toContain(key);
    }
  });

  it('marks accessKey as sensitive', () => {
    const manifest = readManifest();
    expect(manifest.uiHints?.accessKey?.sensitive).toBe(true);
  });

  it('marks serverUrl as advanced', () => {
    const manifest = readManifest();
    expect(manifest.uiHints?.serverUrl?.advanced).toBe(true);
  });

  it('marks timeoutMs as advanced', () => {
    const manifest = readManifest();
    expect(manifest.uiHints?.timeoutMs?.advanced).toBe(true);
  });

  it('all hints have a label', () => {
    const manifest = readManifest();
    for (const [key, hint] of Object.entries(manifest.uiHints || {})) {
      expect(hint.label, `uiHint "${key}" missing label`).toBeTruthy();
    }
  });
});
