import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';
import plugin from '../src/index.js';
import { TOOL_REGISTRY } from '../src/tools/tool-registry.js';

describe('plugin entry', () => {
  it('has correct id, name, and description', () => {
    expect(plugin.id).toBe('xpoz');
    expect(plugin.name).toBe('Xpoz');
    expect(typeof plugin.description).toBe('string');
    expect(plugin.description.length).toBeGreaterThan(0);
  });

  it('has a register function', () => {
    expect(typeof plugin.register).toBe('function');
  });

  it('registers exactly 48 tools in the registry', () => {
    expect(TOOL_REGISTRY).toHaveLength(48);
  });

  it('all tool names match the manifest', () => {
    const manifest = JSON.parse(
      readFileSync(new URL('../openclaw.plugin.json', import.meta.url), 'utf8'),
    );
    const manifestTools = new Set<string>(manifest.contracts.tools);
    const registryTools = new Set(TOOL_REGISTRY.map((t) => t.name));

    const inManifestNotRegistry = [...manifestTools].filter((t) => !registryTools.has(t));
    const inRegistryNotManifest = [...registryTools].filter((t) => !manifestTools.has(t));

    expect(inManifestNotRegistry).toEqual([]);
    expect(inRegistryNotManifest).toEqual([]);
    expect(manifestTools.size).toBe(registryTools.size);
  });
});
